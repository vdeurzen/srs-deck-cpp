---
id: move-semantics-perfect-forwarding
kind: code
version: 1
level: 4
tags: [move-semantics, templates]
input: chips
choices:
  c1: ["std::forward<T>(arg)", "std::move(arg)", "arg", "std::forward<int>(arg)"]
compile:
  harness: |
    constexpr bool check() {
        int x = 5;
        return wrapper(x) == 1 && wrapper(5) == 2;
    }
    static_assert(check());
    int main() {}
requires:
  - value-categories-overload-binding
  - templates-instantiation
refs:
  - https://en.cppreference.com/w/cpp/utility/forward
---

Complete `wrapper` so it forwards `arg` preserving whether the caller
passed an lvalue or an rvalue, calling the matching `inner` overload
either way.

```cpp
#include <utility>
constexpr int inner(int&) { return 1; }
constexpr int inner(int&&) { return 2; }
template<typename T>
constexpr int wrapper(T&& arg) {
    return inner({{c1::std\::forward<T>(arg)}});
}
```

---

`T&&` here is a **forwarding reference**: for a named lvalue argument,
template argument deduction makes `T` an lvalue reference type, and for
an rvalue argument, an unreferenced type. `std::forward<T>(arg)` uses that
deduced `T` to cast `arg` back to whatever value category it originally
had. `std::move(arg)` always casts to rvalue regardless of `T`, and `arg`
alone is always an lvalue — both lose the caller's original value
category.
