---
id: ptr-array-name-to-pointer
kind: basic
version: 2
level: 1
tags: [pointers, arrays]
requires:
  - ptr-holds-an-address
elaborate: Where in your code is an array handed to a function, and how does that function learn the length?
refs:
  - https://en.cppreference.com/w/cpp/language/implicit_conversion#Array-to-pointer_conversion
  - https://eel.is/c++draft/conv.array#1
---

## `int temps[4] = {7, 9, 4, 6};` is passed as `show(temps)` to `void show(int* p);`, with no `&`. How can the code inside `show` find out that there are 4 elements?

---

**It cannot: `temps` converts to a pointer to `temps[0]`, and the length is lost.**
Where a pointer is needed, an array's name converts implicitly to a
pointer to its first element (array-to-pointer conversion, "decay"). `p`
carries only that start address, so the count must travel separately.
