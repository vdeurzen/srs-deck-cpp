---
id: ptr-null-pointer
kind: basic
version: 1
level: 1
tags: [pointers, nullptr, undefined-behaviour, misconception]
requires:
  - ptr-amp-and-star-cloze
  - ub-definition
elaborate: Say where a Go program of yours relies on a nil dereference panicking, and what the C++ version must do instead.
refs:
  - https://en.cppreference.com/w/cpp/language/pointer#Null_pointers
  - https://en.cppreference.com/w/cpp/language/nullptr
  - https://eel.is/c++draft/expr.unary.op#1
---

```cpp
int* p = nullptr;
if (p != nullptr) *p = 1;
*p = 2;
```

## `nullptr` is C++'s null pointer, like Go's `nil`: it points at no object. Many expect the last line to panic as it would in Go. What does it do?

---

**Undefined behaviour: there is no object for `*p` to name.**

It often crashes, but nothing is promised: the compiler may assume a
dereferenced pointer is never null and drop later checks. So test
`p != nullptr` before `*p`, as the middle line does.
