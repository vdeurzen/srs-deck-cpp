---
id: life-destructor-frees
kind: code
version: 1
level: 2
tags: [lifetime, new-delete, raii, destructors]
requires:
  - life-delete-matches-new
  - life-destructor-intro
  - class-ctor-colon-part
  - ptr-null-pointer
elaborate: Name another resource besides memory (a file, a lock, a socket) and say where its release would go in this pattern.
input: chips
choices:
  c1:
    - "delete[] data;"
    - "delete data;"
    - "data = nullptr;"
compile:
  harness: |
    constexpr int use(bool leave_early) {
      IntBuf buf{4};
      buf.data[0] = 7;
      if (leave_early) return -1;
      return buf.data[0];
    }
    // A constant expression may not leak or mismatch an allocation.
    static_assert(use(false) == 7);
    static_assert(use(true) == -1);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/delete
  - https://en.cppreference.com/w/cpp/language/raii
---

`IntBuf` gets its array from the heap in its constructor (`constexpr`
lets both members also run at compile time). Complete the
destructor so that every `IntBuf` gives the array back when it dies,
however the function holding it returns.

```cpp
struct IntBuf {
  int* data;
  constexpr IntBuf(int n) : data(new int[n]) {}
  constexpr ~IntBuf() { {{c1::delete[] data;}} }
};
```

---

**`delete[] data;` in the destructor: no return path can skip a destructor.**

Memory from `new T[n]` needs `delete[]`; plain `delete` is undefined
behaviour, and `data = nullptr;` loses the array for ever (a leak). Raw
`delete` in a function body can be skipped by an early return. This
pattern, acquire in the constructor and release in the destructor, is RAII.
