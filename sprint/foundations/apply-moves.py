#!/usr/bin/env python3
"""One-off (2026-10-19): apply plan/move-out.tsv and plan/move-in.tsv.

Move-out Cards return to their original Deck and id (their pre-sprint review
history comes back), at their original path, with their original cross-Deck
prerequisites restored where the relations allow. Move-in Cards join an
essentials Deck. Every `requires` in all Decks is re-pointed, and an edge the
Deck relations no longer allow (or listed in plan/drop-edges.tsv) is dropped.

usage: sprint/foundations/apply-moves.py [--dry-run]   (run from the repo root)
"""
import collections
import os
import re
import subprocess
import sys

import yaml

sys.path.insert(0, 'scripts')
from cards import Deck  # noqa: E402

DRY = '--dry-run' in sys.argv
P = 'sprint/foundations/plan'
DECKS = "cpp-essentials interview-essentials cpp-basics cpp-core algo-basics algo-systems hft-interview leetcode".split()
PREFIX = {'cpp-basics': 'basics', 'cpp-core': 'core', 'algo-basics': 'algo',
          'algo-systems': 'systems', 'leetcode': 'leetcode', 'hft-interview': 'hft'}
BASE = '70faed4'  # last commit before the sprint move

tsv = lambda f: [l.rstrip('\n').split('\t') for l in open(f) if l.strip()]
out = dict(tsv(f'{P}/move-out.tsv'))
inn = dict(tsv(f'{P}/move-in.tsv'))
M = {**out, **inn}
drop = {tuple(x) for x in tsv(f'{P}/drop-edges.tsv')}
sprint = dict(tsv('sprint/moved.tsv'))          # pre-sprint id -> essentials id
unsprint = {v: k for k, v in sprint.items()}

decks = {d: Deck(d) for d in DECKS}
cards = {c.qid: c for d in decks.values() for c in d.cards.values()}
allowed = {d: {d} | {r['deck'] for r in (yaml.safe_load(open(f'{d}/deck.yaml')).get('relations') or [])} for d in DECKS}
for q in M:
    assert q in cards, f'missing {q}'
assert not set(M.values()) & (set(cards) - set(M)), 'destination id taken'

base_path = {}
for line in subprocess.run(['git', 'grep', '-E', '^id: [a-z0-9-]+$', BASE], capture_output=True, text=True).stdout.splitlines():
    _, f, i = line.split(':', 2)
    base_path[f"{f.split('/')[0]}/{i[4:]}"] = f


def dest_path(q, nq):
    c, (nd, _) = cards[q], nq.split('/')
    if q in out:
        if nq in base_path:
            return base_path[nq]
        topic = c.topic.split('/', 1)[1]  # strip the essentials prefix
        return os.path.join(nd, 'topics', topic, os.path.basename(c.path))
    return os.path.join(nd, 'topics', PREFIX[c.deck.id], c.topic, os.path.basename(c.path))


REQ = re.compile(r'^requires:[ \t]*\n((?:[ \t]+-[^\n]*\n)+)', re.M)
ITEM = re.compile(r'^\s*-\s*(\S+)(.*)$')


def entries(text):
    m = REQ.search(text)
    return m, ([ITEM.match(l).group(1, 2) for l in m.group(1).splitlines()] if m else [])


def base_requires(nq):
    """Original prerequisites (qualified, current location) of a Card moved back out."""
    if nq not in base_path:
        return []
    m, es = entries(subprocess.run(['git', 'show', f'{BASE}:{base_path[nq]}'], capture_output=True, text=True).stdout)
    res = []
    for r, _ in es:
        q = r if '/' in r else f"{nq.split('/')[0]}/{r}"
        q = sprint.get(q, q)
        res.append(M.get(q, q))
    return res


stats = collections.Counter()
log = []
writes, removes = {}, []
for q, c in cards.items():
    nq = M.get(q, q)
    nd = nq.split('/')[0]
    text = open(c.path).read()
    m, es = entries(text)
    keep, seen = [], set()
    cand = [(r if '/' in r else f'{c.deck.id}/{r}', t) for r, t in es]
    if q in out:
        cand += [(r, '') for r in base_requires(nq)]
    for pre, tail in cand:
        if (q, pre) in drop:
            stats['dropped (plan)'] += 1
            continue
        npre = M.get(pre, pre)
        if npre in seen or npre not in cards.keys() | set(M.values()):
            continue
        if npre.split('/')[0] not in allowed[nd]:
            stats['dropped (relations)'] += 1
            log.append(f'drop {nq} -> {npre}')
            continue
        seen.add(npre)
        d, cid = npre.split('/')
        keep.append((cid if d == nd else npre, tail))
    block = ''.join(f'  - {i}{t}\n' for i, t in keep)
    if m:
        new = text[:m.start()] + (f'requires:\n{block}' if keep else '') + text[m.end():]
    elif keep:
        new = text.replace('\n---\n', f'\nrequires:\n{block}---\n', 1)
    else:
        new = text
    if q in M:
        writes[dest_path(q, nq)] = new
        removes.append(c.path)
        stats['moved'] += 1
    elif new != text:
        writes[c.path] = new
        stats['re-pointed'] += 1

print(dict(stats))
print('\n'.join(log))
if DRY:
    sys.exit()
for p in removes:
    os.remove(p)
for p, t in writes.items():
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w').write(t)
for d in DECKS:
    for root, _, _ in os.walk(os.path.join(d, 'topics'), topdown=False):
        if not os.listdir(root):
            os.rmdir(root)
with open('sprint/moved.tsv', 'a') as f:
    f.writelines(f'{a}\t{b}\n' for a, b in inn.items())
with open('sprint/foundations/moved-out.tsv', 'w') as f:
    f.writelines(f'{a}\t{b}\n' for a, b in out.items())
