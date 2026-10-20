---
id: move-semantics-forward-intro
kind: basic
version: 1
level: 3
tags: [move-semantics, templates]
requires:
  - move-semantics-forwarding-reference
  - value-categories-std-move-cloze
elaborate: Say in one sentence, as to an interviewer, why `std::forward` needs its template argument spelled out while `std::move` does not.
refs:
  - https://en.cppreference.com/w/cpp/utility/forward
  - https://eel.is/c++draft/forward
---

`std::forward<T>(x)`, from `<utility>`, casts `x` to `T&&`.

```cpp
template<class T>
void wrap(T&& x) { use(std::forward<T>(x)); }

int n = 1;
wrap(n);   // T is int&
wrap(1);   // T is int
```

## Inside `wrap`, `x` is a named lvalue in both calls. What value category does `use` receive in each?

---

**An lvalue for `wrap(n)`, an rvalue for `wrap(1)`: the caller's own.**

With `T = int&`, `T&&` is `int& &&`, which collapses to `int&`: an lvalue.
With `T = int`, it is `int&&`, an rvalue (an xvalue). `std::move(x)` would
give an rvalue in both calls.
