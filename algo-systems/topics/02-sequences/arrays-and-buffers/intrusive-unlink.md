---
id: seq-intrusive-unlink
kind: basic
version: 1
level: 4
requires:
  - seq-intrusive-list
tags: [containers, low-latency, intrusive]
refs:
  - https://www.boost.org/doc/libs/release/doc/html/intrusive/intrusive_vs_nontrusive.html
---

## A cancel message arrives; a hash map gives you the `Order*`. How much work removes it from its price level, intrusive list vs `std::list<Order>`?

---

**Intrusive: O(1), two pointer stores. `std::list`: an O(n) search.**
Given the element you already hold its hook, so you patch the
neighbours directly. `std::list` can unlink only through an iterator,
which you must store alongside or find by walking the level.
