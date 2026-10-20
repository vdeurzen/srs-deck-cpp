---
id: containers-mixed-orders-held-by-pointer
kind: basic
version: 1
level: 3
tags: [containers, mixed-recognition]
requires:
  - containers-stable-references
  - smart-pointers-unique-ptr-ownership
elaborate: Say what you would measure before choosing between the two answers here for a real order book.
refs:
  - https://en.cppreference.com/w/cpp/container/deque
  - https://en.cppreference.com/w/cpp/container#Iterator_invalidation
---

## An engine appends `Order`s all day; risk checks keep `Order*` pointers to them, and orders are read by sequence number 0, 1, 2, … Which standard container holds the `Order`s?

---

**`std::deque<Order>`: appending never moves existing elements, and indexing stays O(1).**

Cue: pointers kept while the sequence grows rule out `std::vector`.
A `std::vector<std::unique_ptr<Order>>` also keeps each `Order` in place,
at the cost of one heap allocation per order.
