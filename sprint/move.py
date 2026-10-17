#!/usr/bin/env python3
"""One-off (2026-10-17): move the interview-sprint selection into the
cpp-essentials and interview-essentials Decks. Kept as the record of how the
move was made; sprint/moved.tsv lists every old -> new id.

usage: sprint/move.py [--dry-run]   (run from the repo root)
"""
import collections
import os
import re
import sys

sys.path.insert(0, 'scripts')
from cards import Deck  # noqa: E402

SEL = 'sprint/selection'
DRY = '--dry-run' in sys.argv
OLD = "cpp-basics cpp-core algo-basics algo-systems hft-interview leetcode".split()
NEW = ('cpp-essentials', 'interview-essentials')
decks = {d: Deck(d) for d in OLD}
allc = {c.qid: c for d in decks.values() for c in d.cards.values()}

# destination Deck and topic prefix per source Deck
DEST = {
    'cpp-basics': ('cpp-essentials', 'basics'),
    'cpp-core': ('cpp-essentials', 'core'),
    'algo-basics': ('interview-essentials', 'algo'),
    'algo-systems': ('interview-essentials', 'systems'),
    'leetcode': ('interview-essentials', 'leetcode'),
    'hft-interview': ('interview-essentials', 'hft'),
}
# prerequisites outside tier A that carry a chain worth keeping
EXTRA = """cpp-core/storage-construct-at cpp-core/storage-destroy-at-pop
cpp-core/storage-destroy-then-deallocate algo-basics/linear-array-insert-shift
algo-basics/linear-array-index-contiguity algo-basics/tree-bst-rule
cpp-basics/conc-start-with-arguments cpp-basics/ub-static-assert-finds-ub
cpp-basics/types-reinterpret-cast-intro cpp-basics/tmpl-constrained-auto
cpp-core/storage-live-range-invariant cpp-core/storage-allocate-vs-construct
algo-basics/tree-terms cpp-core/smart-pointers-unique-ptr-deleter-size
cpp-core/ranges-sort-projection algo-basics/hashing-direct-address-limit""".split()
# second pass (learning-designer review of dropped edges) added the last ten
# a dropped edge -> the sprint Card that teaches the same idea
SUBST = {
    'cpp-basics/ub-signed-overflow-no-wrap': 'cpp-basics/types-overflow-rules',
    'cpp-basics/ptr-const-ref-read-only': 'cpp-basics/const-ref-parameter',
}
# cpp-core Card -> the cpp-basics Card that now stands in for its dropped prerequisite
ADD = {
    'value-categories-categories-cloze': 'vc-classify-cloze',
    'aggregate-braces': 'class-struct-vs-class',
    'class-const-member-function': 'const-member-on-const-ref',
    'types-integral-promotion': 'types-promotion-rule',
    'types-signed-overflow-ub': 'ub-optimiser-assumes-no-overflow',
    'raii-scope-exit-order': 'life-reverse-order-trace',
    'exceptions-noexcept-escape-terminates': 'err-noexcept-broken-promise',
    'class-invariant-constructor': 'class-invariant-who-checks',
    'trace-copy-vs-reference': 'ptr-trace-reference-assign',
    'containers-const-map-lookup': 'iter-map-find-or-default',
}
ADD = {f'cpp-core/{k}': f'cpp-basics/{v}' for k, v in ADD.items()}

sel = []
for d in OLD:
    for line in open(f'{SEL}/sel-{d}.tsv'):
        p = line.rstrip('\n').split('\t')
        if len(p) > 1 and p[1] == 'A':
            sel.append(f'{d}/{p[0]}')
sel += [q for q in EXTRA if q not in sel]
# a rerun moves only what is not in sprint/moved.tsv yet
prev = dict(l.rstrip('\n').split('\t') for l in open('sprint/moved.tsv')) if os.path.exists('sprint/moved.tsv') else {}
todo = [q for q in sel if q not in prev]
moved = {**prev, **{q: f'{DEST[q.split("/")[0]][0]}/{q.split("/")[1]}' for q in todo}}
assert len(set(moved.values())) == len(moved), 'id collision'
assert all(q in allc for q in todo), [q for q in todo if q not in allc]

REQ = re.compile(r'^requires:[ \t]*\n((?:[ \t]+-[^\n]*\n)+)', re.M)
ITEM = re.compile(r'^(\s*-\s*)(\S+)(.*)$')


def rewrite(text, card, own_deck, added=()):
    """Rewrite `card`'s requires block for its home `own_deck`."""
    m = REQ.search(text)
    entries = [ITEM.match(l).group(2, 3) for l in m.group(1).splitlines()] if m else []

    def resolve(r):
        q = r if '/' in r else f'{card.deck.id}/{r}'
        if own_deck in NEW and q not in moved:
            q = SUBST.get(q)
            return moved.get(q) if q else None
        return moved.get(q, q)

    out, seen, dropped = [], set(), []
    for r, tail in list(entries) + [(a, '') for a in added]:
        q = resolve(r)
        if q is None:
            dropped.append(r)
        elif q not in seen:
            seen.add(q)
            d, cid = q.split('/')
            out.append((cid if d == own_deck else q, tail))
    block = ''.join(f'  - {i}{t}\n' for i, t in out)
    if m:
        new = text[:m.start()] + (f'requires:\n{block}' if out else '') + text[m.end():]
    elif out:
        new = text.replace('\n---\n', f'\nrequires:\n{block}---\n', 1)  # end of front matter
    else:
        new = text
    return new, dropped, {q.split('/')[0] for q in seen} - {own_deck}


relations = collections.defaultdict(set)
stats = collections.Counter()
writes, removes = {}, []
for q in todo:
    nq, c = moved[q], allc[q]
    dst = nq.split('/')[0]
    new, dropped, rel = rewrite(open(c.path).read(), c, dst, [ADD[q]] if q in ADD else [])
    relations[dst] |= rel
    stats['dropped'] += len(dropped)
    writes[os.path.join(dst, 'topics', DEST[c.deck.id][1], c.topic, os.path.basename(c.path))] = new
    removes.append(c.path)
for q, c in allc.items():
    if q in moved:
        continue
    text = open(c.path).read()
    new, dropped, rel = rewrite(text, c, c.deck.id)
    assert not dropped
    relations[c.deck.id] |= rel
    if new != text:
        stats['repointed'] += 1
        writes[c.path] = new

print(f'moved {len(todo)}, repointed {stats["repointed"]}, dropped edges {stats["dropped"]}')
for d, r in sorted(relations.items()):
    print(d, sorted(r))
if DRY:
    sys.exit()
for p in removes:
    os.remove(p)
for p, t in writes.items():
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w').write(t)
for d in OLD:
    for root, _, _ in os.walk(os.path.join(d, 'topics'), topdown=False):
        if not os.listdir(root):
            os.rmdir(root)
with open('sprint/moved.tsv', 'w') as f:
    f.writelines(f'{a}\t{b}\n' for a, b in moved.items())
