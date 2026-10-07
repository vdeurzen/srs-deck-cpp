---
id: transfer-nil-vs-nullptr-optional
kind: cloze
version: 2
level: 2
tags: [transfer, misconception, pointers]
requires:
  - ub-definition
elaborate: In your Go code, which `recover()` or crash log relies on a nil dereference panicking? What would the C++ port have to check instead, and where?
refs:
  - https://en.cppreference.com/w/cpp/language/nullptr
  - https://en.cppreference.com/w/cpp/language/ub
---

In Go, dereferencing a nil pointer is a well-defined runtime panic you
can recover from. In C++, `int* p = nullptr;` followed by `*p` is
{{c1::undefined behaviour::not a panic}}: nothing guarantees a crash,
and the optimiser may assume the dereference never sees a null pointer.
