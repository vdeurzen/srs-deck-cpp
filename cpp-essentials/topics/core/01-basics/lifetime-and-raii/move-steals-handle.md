---
id: raii-move-steals-handle
kind: code
version: 2
level: 2
tags: [raii, lifetime, special-members, move-semantics]
requires:
  - raii-copy-double-close
  - move-vs-copy-intro
  - constexpr-fn-static-assert
  - raii-exchange-intro
elaborate: Say aloud what a moved-from owner of yours must look like so that its destructor, and any reassignment, stay safe.
input: chips
choices:
  c1: ["std::exchange(o.h, 0)", "o.h", "o.h = 0", "std::move(o.h)"]
compile:
  harness: |
    constexpr int releases_after_move() {
      int released = 0;
      { Handle a{7, &released}; Handle b = std::move(a); }
      return released;
    }
    static_assert(releases_after_move() == 1,
                  "the handle was released twice, or never");
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/utility/exchange
  - https://en.cppreference.com/w/cpp/language/move_constructor
---

`Handle` releases its resource in the destructor; `0` means "owns
nothing". Complete the move constructor so that moving a `Handle` from
one owner to another still releases the resource exactly once.

```cpp
#include <utility>
struct Handle {
  int h; int* released;
  constexpr Handle(int v, int* r) : h(v), released(r) {}
  constexpr Handle(Handle&& o)
      : h({{c1::std\::exchange(o.h, 0)}}), released(o.released) {}
  constexpr ~Handle() { if (h != 0) ++*released; }
};
```

---

A move must leave the source **owning nothing**, or both destructors
release the same handle: two owners of one resource, and the second
release acts on something already gone. `o.h` copies the
value and leaves the source armed, and so does `std::move(o.h)`: moving an
`int` copies it; `o.h = 0` disarms the source but yields `0`, so the
destination never owns the handle and the resource leaks. `std::exchange`
does the read-then-reset in one expression. (Declaring this move
constructor also makes the compiler delete the copy operations, so a
`Handle` is move-only without a second line.)
