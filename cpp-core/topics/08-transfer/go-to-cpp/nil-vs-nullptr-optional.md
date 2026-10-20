---
id: transfer-nil-vs-nullptr-optional
kind: cloze
version: 2
level: 2
tags: [transfer, misconception, pointers]
requires:
  - cpp-essentials/ub-definition
elaborate: "Nothing guarantees a crash: the optimiser may assume a dereferenced pointer is non-null and drop a later null check. Where in your code does a crash log rely on a null dereference faulting, and what would you check instead?"
refs:
  - https://en.cppreference.com/w/cpp/language/nullptr
  - https://en.cppreference.com/w/cpp/language/ub
---

In C++, `int* p = nullptr;` followed by `*p` is
{{c1::undefined behaviour}}, not a guaranteed crash or an error you can
catch, so C++ code checks `p` before the
dereference instead of recovering after it.
