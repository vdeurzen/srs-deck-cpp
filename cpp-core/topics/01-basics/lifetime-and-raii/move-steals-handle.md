---
id: raii-move-steals-handle
kind: code
version: 1
level: 2
tags: [raii, lifetime, special-members, move-semantics]
requires:
  - raii-copy-double-close
input: chips
choices:
  c1: ["std::exchange(o.h, 0)", "o.h", "std::move(o.h)", "o.h = 0"]
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
  constexpr Handle(Handle&& o) noexcept
      : h({{c1::std\::exchange(o.h, 0)}}), released(o.released) {}
  constexpr ~Handle() { if (h != 0) ++*released; }
};
```

---

A move must leave the source **owning nothing**, or both destructors
release the same handle — the double release that deleting the copy
constructor shut out, back in through the other door. `o.h` copies the
value and leaves the source armed; `std::move(o.h)` on an `int` is the
same copy with a cast; `o.h = 0` disarms the source but yields `0`, so the
destination never owns the handle and the resource leaks. `std::exchange`
does the read-then-reset in one expression. (Declaring this move
constructor also makes the compiler delete the copy operations, so a
`Handle` is move-only without a second line.)
