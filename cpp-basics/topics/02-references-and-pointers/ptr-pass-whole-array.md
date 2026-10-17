---
id: ptr-pass-whole-array
kind: code
version: 1
level: 1
tags: [pointers, arrays]
requires:
  - cpp-essentials/ptr-array-name-to-pointer
input: chips
choices:
  c1: ["readings", "&readings", "*readings", "readings[0]"]
compile:
  harness: |
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/implicit_conversion#Array-to-pointer_conversion
  - https://eel.is/c++draft/conv.array#1
---

`sum3` adds the three `int`s starting at `first`. Call it on the array
`readings`, passing the start of its elements.

```cpp
constexpr int sum3(const int* first) {
  return first[0] + first[1] + first[2];
}
constexpr int readings[3] = {4, 5, 6};
static_assert(sum3({{c1::readings}}) == 15);
```

---

The array's name decays to a pointer to its first element: `readings`
becomes `&readings[0]`, a `const int*`. `&readings` is a pointer to the
whole array, type `const int (*)[3]`, which does not convert to
`const int*`. `*readings` and `readings[0]` are the `int` 4, not a
pointer. Only the start is passed, which is why `sum3` hard-codes the 3.
