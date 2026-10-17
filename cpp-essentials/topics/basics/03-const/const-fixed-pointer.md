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
    static_assert(fill_three() == 6);
    int main() {}
requires:
  - const-pointer-read-rule
refs:
  - https://en.cppreference.com/w/cpp/language/pointer#Constness
  - https://eel.is/c++draft/dcl.ptr
---

`out` must stay aimed at the start of `buf` for its whole life, yet writes
through it must work. Complete its type.

```cpp
constexpr int fill_three() {
  int buf[3]{};
  {{c1::int* const}} out = buf;
  out[0] = 1; out[1] = 2; out[2] = 3;
  return buf[0] + buf[1] + buf[2];
}
```

---

`const` after the `*` freezes the **pointer**: `out` cannot be re-aimed,
but the `int`s it points at stay writable. `const int*` puts the `const` before the `*`, on the pointee, so
`out[0] = 1` fails; `const int* const` freezes both. (`int const*` is
just another spelling of `const int*`.)
