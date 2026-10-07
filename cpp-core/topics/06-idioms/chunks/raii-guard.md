---
id: chunks-raii-guard
kind: chunk
version: 2
level: 2
tags: [idioms, raii]
requires:
  - raii-copy-double-close
expose_ms: 9000
compile:
  harness: |
    #include <type_traits>
    using G = ScopeGuard<void (*)()>;
    static_assert(!std::is_copy_constructible_v<G>);
    static_assert(!std::is_copy_assignable_v<G>);
    static_assert(!std::is_move_constructible_v<G>);
    static_assert(!std::is_convertible_v<void (*)(), G>);
    void use(int& n) { ScopeGuard g{[&n] { ++n; }}; }
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/raii
  - https://en.cppreference.com/w/cpp/experimental/scope_exit
---

```cpp
template <class F> struct ScopeGuard {
  F on_exit_;
  explicit ScopeGuard(F f) : on_exit_(f) {}
  ScopeGuard(const ScopeGuard&) = delete;
  ScopeGuard& operator=(const ScopeGuard&) = delete;
  ~ScopeGuard() { on_exit_(); }
};
```

---

The scope guard: a type whose only job is to run a cleanup callable in
its destructor, so the cleanup fires on every exit path (return, `break`,
an exception unwinding) without a `try`/`catch`. `F` is the lambda's own
type, deduced at `ScopeGuard g{[&] { ... }};`, so nothing allocates.

The lines follow one fixed order: the state first, then construct,
copy, copy-assign, destroy, the order an object's life runs in. The two deleted lines are the point: a copy, or a copy-assigned guard,
would run the callback twice. Declaring the copy operations also
suppresses the implicit moves, so no moved-from guard exists either. The
Library Fundamentals TS ships this as `std::experimental::scope_exit`.
