---
id: ptr-const-walk-pointer
kind: code
version: 1
level: 1
tags: [pointers, const]
input: chips
choices:
  c1: ["const int*", "int* const", "int*", "const int* const"]
compile:
  harness: |
    constexpr int data[] = {0, 7, 0, 0};
    static_assert(count_zero(data, data + 4) == 3);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/cv
  - https://en.cppreference.com/w/cpp/language/pointer
---

`count_zero` walks a range of `int`s that it must never modify. Declare
the cursor `p` so that it can advance but cannot write.

```cpp
constexpr int count_zero(const int* first, const int* last) {
  {{c1::const int*}} p = first;
  int n = 0;
  for (; p != last; ++p)
    if (*p == 0) ++n;
  return n;
}
```

---

`const` applies to what is immediately on its left — or, with nothing on
its left, to what is on its right. Read the declaration right to left:
`const int* p` is "`p`, a pointer to an `int` that is const": the pointee
is read-only and the pointer moves freely. `int* const p` is "`p`, a const
pointer to `int`": the pointer is fixed, and here cannot even be
initialised from `first`, whose pointee is const. `const int* const`
freezes both, so `++p` fails. Plain `int*` would let the function write
through a pointer its caller handed over as read-only, which the
conversion from `const int*` rightly refuses.
