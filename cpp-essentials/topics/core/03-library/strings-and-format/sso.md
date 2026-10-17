---
id: strings-sso
kind: basic
version: 1
level: 2
tags: [strings, performance]
elaborate: Moving a long string steals its heap pointer. What must a move of a short, in-object string do instead, and what does that cost?
refs:
  - https://en.cppreference.com/w/cpp/string/basic_string/capacity
---

## In libstdc++, why does `std::string code = "EUR";` not allocate on the heap?

---

**The small-string optimisation: short contents live in a buffer inside the
`string` object itself.**

libstdc++ fits up to 15 characters there; longer contents are allocated.
The standard doesn't require it, but all three major standard libraries do
it.
