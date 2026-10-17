---
id: life-destructor-frees
kind: code
version: 1
level: 2
tags: [lifetime, new-delete, raii, destructors]
requires:
  - life-delete-matches-new
  - life-destructor-intro
input: chips
choices:
  c1:
    - "delete[] data;"
    - "delete data;"
    - "data = nullptr;"
    - "std::free(data);"
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

`IntBuf` gets its array from the heap in its constructor. Complete the
destructor so that every `IntBuf` gives the array back when it dies,
whichever path its function returns by.

```cpp
#include <cstdlib>

struct IntBuf {
  int* data;
  constexpr explicit IntBuf(int n) : data(new int[n]{}) {}
  constexpr ~IntBuf() { {{c1::delete[] data;}} }
};
```

---

Memory from `new T[n]` must be released with **`delete[]`**; plain
`delete` on it is undefined behaviour. Putting the release in the
destructor of a local object means no return path can skip it, which is
what raw `new`/`delete` in a function body cannot promise. That pattern
is RAII. `std::free` releases only `malloc` memory, never `new`'s, and
`data = nullptr;` leaks the array; the harness's `constexpr` evaluation
rejects the leak and both mismatched releases.
