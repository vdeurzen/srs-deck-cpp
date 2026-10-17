---
id: ptr-array-name-to-pointer
kind: basic
version: 1
level: 1
tags: [pointers, arrays]
requires:
  - ptr-holds-an-address
refs:
  - https://en.cppreference.com/w/cpp/language/implicit_conversion#Array-to-pointer_conversion
  - https://eel.is/c++draft/conv.array#1
---

## `int temps[4] = {7, 9, 4, 6}; int* p = temps;` compiles with no `&`. Which element does `p` point to?

---

**To `temps[0]`, the first element.** Where a pointer is needed, an
array's name converts implicitly to a pointer to its first element
(array-to-pointer conversion, "decay"). The pointer carries only that start
address; the length 4 is lost, so code given `p` cannot know how many elements follow; the
count must travel separately.
