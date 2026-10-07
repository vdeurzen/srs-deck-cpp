---
id: heap-fibonacci-decrease-key
kind: basic
version: 1
level: 4
requires:
  - heap-decrease-key-handle
tags: [heaps, graphs, complexity]
refs:
  - https://doi.org/10.1145/28869.28874
---

## A Fibonacci heap improves Dijkstra from O((V+E) log V) to O(E + V log V). Which operation's cost makes the difference?

---

**`decrease_key`: O(1) amortised instead of O(log V).**

Dijkstra does up to E decrease-keys, one per successful relaxation, but
only V extract-mins. A Fibonacci heap makes the frequent operation
constant and leaves extract-min at O(log V), so the E term loses its log
(Fredman & Tarjan, 1987).
