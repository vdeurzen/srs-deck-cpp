---
id: transfer-nil-vs-nullptr-optional
kind: cloze
version: 2
level: 2
tags: [transfer, misconception, pointers]
requires:
  - ub-definition
elaborate: "Nothing guarantees a crash: the optimiser may assume a dereferenced pointer is non-null and drop a later null check. In your Go code, which `recover()` or crash log relies on a nil dereference panicking, and what would the C++ port check instead?"
refs:
  - https://en.cppreference.com/w/cpp/language/nullptr
  - https://en.cppreference.com/w/cpp/language/ub
---

In Go, dereferencing a nil pointer is a runtime panic you can recover
from. In C++, `int* p = nullptr;` followed by `*p` is
{{c1::undefined behaviour}}, so C++ code checks `p` before the
dereference instead of recovering after it.
