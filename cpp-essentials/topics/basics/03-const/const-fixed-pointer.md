---
id: const-fixed-pointer
kind: code
version: 1
level: 2
tags: [const, pointers]
input: chips
choices:
  c1: ["int* const", "const int*", "const int* const"]
compile:
  harness: |
    static_assert(set_score() == 7);
    int main() {}
requires:
  - const-pointer-read-rule
  - ptr-amp-and-star-cloze
  - constexpr-fn-static-assert
elaborate: Where in your code would a pointer that must never be re-aimed be better written as `T* const`, or as a reference?
refs:
  - https://en.cppreference.com/w/cpp/language/pointer#Constness
  - https://eel.is/c++draft/dcl.ptr
---

`out` must stay aimed at `score` for its whole life, yet writes through
it must work. Complete its type.

```cpp
constexpr int set_score() {
  int score = 0;
  {{c1::int* const}} out = &score;
  *out = 7;
  return score;
}
```

---

**`const` after the `*` freezes the pointer**: `out` cannot be re-aimed,
but the `int`s it points at stay writable. `const int*` puts the `const` before the `*`, on the pointee, so
`*out = 7` fails; `const int* const` freezes both. (`int const*` is
just another spelling of `const int*`.)
