---
id: sort-total-comparator
kind: basic
version: 1
level: 3
tags: [sorting, determinism, low-latency]
requires:
  - sort-stability
elaborate: Your test fixture compares sorted query output across two library versions — which key would you add as the tiebreaker?
refs:
  - https://en.cppreference.com/w/cpp/algorithm/sort
  - https://en.cppreference.com/w/cpp/algorithm/stable_sort
---

## You need identical sorted output on every run and every library, but no multi-pass key composition. What is cheaper than `std::stable_sort`?

---

**Add a unique tiebreaker (id, sequence number) to the comparator and use `std::sort`.**

With no two elements equal, every correct sort yields the same order,
so stability stops mattering and the faster unstable sort is safe. A
matching engine already has one: price, then time, then sequence number.
