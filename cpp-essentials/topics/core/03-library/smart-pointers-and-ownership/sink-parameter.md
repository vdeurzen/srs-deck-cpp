---
id: smart-pointers-sink-parameter
kind: basic
version: 1
level: 2
tags: [smart-pointers, ownership, api-design]
requires:
  - smart-pointers-unique-ptr-ownership
elaborate: Find a function of yours that takes a raw pointer; does it delete it, keep it, or only read through it, and which parameter type would say so?
refs:
  - https://en.cppreference.com/w/cpp/memory/unique_ptr#Notes
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rr-uniqueptrparam
---

## `void adopt(std::unique_ptr<Node> n);` versus `void inspect(const Node& n);` — what does the first signature require of its caller that the second does not?

---

**To give the object up: `adopt(std::move(p))`, or a fresh
`std::make_unique`.** A by-value `unique_ptr` parameter is a *sink*: the
callee becomes the owner and `p` is null after the call. `inspect`
borrows: pass `*p` and keep ownership. A `std::unique_ptr<Node>&`
parameter means "I may reseat it"; a `Node*` says "may be null, not owned".
