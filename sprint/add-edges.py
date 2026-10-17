#!/usr/bin/env python3
"""Add `requires` edges listed in a TSV (<card qid>\t<prereq qid>), writing a bare id
for a same-Deck prerequisite. Skips edges already present.

usage: sprint/add-edges.py <edges.tsv> <deck-dir>...
"""
import re
import sys

sys.path.insert(0, 'scripts')
from cards import Deck  # noqa: E402

edges_path, *roots = sys.argv[1:]
cards = {c.qid: c for r in roots for c in Deck(r).cards.values()}
for line in open(edges_path):
    if not line.strip():
        continue
    q, pre = line.split()
    c = cards[q]
    assert pre in cards, f'unknown prerequisite {pre}'
    if pre in c.requires:
        continue
    d, cid = pre.split('/')
    entry = cid if d == c.deck.id else pre
    text = open(c.path).read()
    m = re.search(r'^requires:[ \t]*\n((?:[ \t]+-[^\n]*\n)+)', text, re.M)
    if m:
        text = text[:m.end()] + f'  - {entry}\n' + text[m.end():]
    else:
        text = text.replace('\n---\n', f'\nrequires:\n  - {entry}\n---\n', 1)
    open(c.path, 'w').write(text)
    print(f'{q} += {entry}')
