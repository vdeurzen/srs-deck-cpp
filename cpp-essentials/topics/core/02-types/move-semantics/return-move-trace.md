---
id: move-semantics-return-move-trace
kind: trace
version: 1
level: 3
tags: [move-semantics, tracing]
probes:
  1: { moves: "1" }
requires:
  - move-semantics-return-std-move
  - class-ctor-colon-part
elaborate: Say aloud what `x.moves` could be if `make` ended with `return b;`, and which of those values the standard guarantees.
refs:
  - https://en.cppreference.com/w/cpp/language/copy_elision
  - https://eel.is/c++draft/class.copy.elision
---

Each `Big` counts how often its value has been moved: the move constructor
sets the new object's count to the source's plus 1. Predict `moves`.

```cpp
struct Big {
    int moves = 0;
    Big() {}
    Big(Big&& from) : moves(from.moves + 1) {}
};
Big make() {
    Big b;
    return std::move(b);
}
Big x = make();
int moves = x.moves;   // @1
```

---

`std::move(b)` is not a plain name, so `b` cannot be built in the caller's
slot: the return object is **move-constructed** from `b` (1). `make()` is
a prvalue, so it initialises `x` directly, with no further move. GCC even
warns that the cast prevents elision. Verified by running it under GCC 16.2.
