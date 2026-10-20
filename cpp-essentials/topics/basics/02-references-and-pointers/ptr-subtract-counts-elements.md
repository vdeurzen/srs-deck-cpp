---
id: ptr-subtract-counts-elements
kind: basic
version: 1
level: 2
tags: [pointers, arrays]
requires:
  - ptr-arith-counts-elements
elaborate: Say where a pointer difference would tell you an index you would otherwise have to track by hand.
refs:
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Additive_operators
  - https://eel.is/c++draft/expr.add#5
---

## With a 4-byte `int`, what is `q - p`?

```cpp
int v[5] = {2, 4, 6, 8, 10};
int* p = &v[1];
int* q = &v[4];
```

---

**3: subtracting two pointers into one array counts the elements between them.**

Like `p + i`, the difference is in elements, not bytes, so it is 3, not
12: `p + 3 == q`. It is defined only when both point into the same array
(or one past its end).
