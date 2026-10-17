---
id: life-misconception-delete-array
kind: basic
version: 1
level: 2
tags: [lifetime, new-delete, misconception]
requires:
  - cpp-essentials/life-delete-matches-new
elaborate: Where does your code still hold an array from new[]? What would replacing it with std::vector remove from your list of things to get right?
refs:
  - https://en.cppreference.com/w/cpp/language/delete
  - https://eel.is/c++draft/expr.delete#2
---

## The allocator remembers how big each block is, so `delete names;` should free all three strings. What actually happens?

```cpp
std::string* names = new std::string[3]{"ann", "bo", "cy"};
// ...
delete names;
```

---

**Undefined behaviour.** Plain `delete` treats `names` as one object, so
it does not destroy each element, and it hands the pointer to the
single-object deallocation function. With GCC, a `new[]` of strings
returns a pointer *past* a hidden element count, so `free` gets an
address it never allocated: AddressSanitizer reports `bad-free`, and GCC
warns (`-Wmismatched-new-delete`). Use `delete[]`, or better,
`std::vector`.
