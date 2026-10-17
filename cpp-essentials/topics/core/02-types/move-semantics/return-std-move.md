---
id: move-semantics-return-std-move
kind: basic
version: 1
level: 3
tags: [move-semantics, misconception]
requires:
  - value-categories-std-move-cloze
  - value-categories-guaranteed-elision
elaborate: "`return std::move(p.first);` for a local `std::pair` is the case where the cast genuinely helps: why does the implicit-move rule not cover a subobject?"
refs:
  - https://en.cppreference.com/w/cpp/language/copy_elision
  - https://en.cppreference.com/w/cpp/language/return#Notes
  - https://eel.is/c++draft/class.copy.elision
  - https://wg21.link/p1825r0
---

## A colleague returns a local "so it isn't copied". What does the `std::move` change?

```cpp
std::vector<int> primes(int n) {
    std::vector<int> result;
    sieve(result, n);
    return std::move(result);
}
```

---

**It only takes away copy elision (NRVO).** A local returned by name is
already an rvalue for overload resolution, and the compiler may build it
in the caller's slot: zero moves. `std::move(result)` is an xvalue, not a
name, so that rule no longer applies: one move, guaranteed
(`-Wpessimizing-move`). A by-value or `T&&` parameter returned by name
is implicitly moved too.
