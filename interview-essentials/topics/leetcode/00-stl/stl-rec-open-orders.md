---
id: stl-rec-open-orders
kind: basic
version: 1
level: 3
tags: [stl, recognition, mixed]
requires:
  - stl-multiset-erase-one
  - std-priority-queue-api
refs:
  - https://en.cppreference.com/w/cpp/container/multiset
  - https://en.cppreference.com/w/cpp/container/priority_queue
elaborate: Say aloud what changes in your choice if prices never leave, and you only ever need the largest.
---

A trading screen keeps the prices of the open orders. Prices repeat; an
order can be cancelled at any time, removing its price; the screen
always shows the lowest and highest open price.

## Which container fits: `std::priority_queue<int>`, `std::set<int>` or `std::multiset<int>`?

---

**`std::multiset<int>`: it keeps repeats, erases one copy by value, and is sorted.**

Its first element is the lowest price and its last the highest. A `std::set`
would collapse two orders at one price into one. A `priority_queue`
shows only one end and can't remove a value from the middle.
