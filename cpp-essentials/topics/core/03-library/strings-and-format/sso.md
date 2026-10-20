---
id: strings-sso
kind: basic
version: 1
level: 2
tags: [strings, performance]
requires:
  - string-basics
  - life-stack-vs-heap
elaborate: Say what a type gives up in its own size to keep short contents inline, and where else you have seen that trade.
refs:
  - https://en.cppreference.com/w/cpp/string/basic_string/capacity
---

## In libstdc++ (GCC's standard library), why does `std::string code = "EUR";` not allocate on the heap?

---

**The small-string optimisation: short contents live in a buffer inside the
`string` object itself.**

libstdc++ fits up to 15 characters there; longer contents are allocated.
The standard doesn't require it, but all three major standard libraries do
it.
