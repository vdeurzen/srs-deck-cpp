---
id: ptr-explain-arrays-and-arithmetic
kind: explain
version: 1
level: 4
tags: [pointers, arrays, interview]
requires:
  - ptr-array-name-to-pointer
  - ptr-subscript-is-deref
  - ptr-trace-arithmetic
refs:
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Additive_operators
  - https://en.cppreference.com/w/cpp/language/implicit_conversion#Array-to-pointer_conversion
  - https://eel.is/c++draft/expr.add#4
elaborate: Where else have you seen "a position you move by adding to it" in C++ code, and what plays the role of `p` there?
---

An interviewer hands you `int sum(int* p, int n)` and asks how a pointer
walks an array in C++. Talk them through it.

---

- [ ] An array's elements sit side by side, so a pointer to the first can reach every other one
- [ ] `p + i` moves `i` elements, not bytes; the compiler scales by the element size
- [ ] `p[i]` means `*(p + i)`, the element `i` past wherever `p` currently points
- [ ] An array passed to a function decays to a pointer to its first element, so `n` must carry the length
- [ ] Arithmetic beyond one past the last element is undefined behaviour, so the walk stops at `p + n`
