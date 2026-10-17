#!/usr/bin/env python3
"""Simulate new-item introduction for the essentials Decks (worst case: a Card
unlocks the day after all its prerequisites were first rated).

usage: sprint/simulate.py <new-items-per-day> [days]
"""
import re
import sys

sys.path.insert(0, 'scripts')
from cards import Deck  # noqa: E402

per_day, days = int(sys.argv[1]), int(sys.argv[2]) if len(sys.argv) > 2 else 14
decks = [Deck('cpp-essentials'), Deck('interview-essentials')]
cards = {c.qid: c for d in decks for c in d.cards.values()}
items = {q: max(1, len(set(re.findall(r'\{\{c(\d+)::', c.body)))) if c.kind == 'cloze' else 1
         for q, c in cards.items()}
depth = {}


def dep(q):
    if q not in depth:
        depth[q] = 1 + max((dep(r) for r in cards[q].requires if r in cards), default=-1)
    return depth[q]


known_day = {}
total = sum(items.values())
done = 0
for day in range(1, days + 1):
    queues = []
    for d in decks:
        avail = [q for q, c in cards.items() if c.deck is d and q not in known_day
                 and all(known_day.get(r, day) < day for r in c.requires if r in cards)]
        queues.append(sorted(avail, key=lambda q: (dep(q), cards[q].fm.get('level', 3))))
    budget, intro = per_day, 0
    while budget > 0 and any(queues):
        for qu in queues:  # round-robin
            if qu and budget > 0:
                q = qu.pop(0)
                known_day[q] = day
                budget -= items[q]
                intro += items[q]
    done += intro
    print(f'day {day:2}: +{intro:3} items  cumulative {done:4}/{total}')
