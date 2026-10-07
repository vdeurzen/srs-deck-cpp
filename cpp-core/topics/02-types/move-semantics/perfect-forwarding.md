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
  - move-semantics-forwarding-reference
  - value-categories-overload-binding
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

`T&&` is a forwarding reference: `T` deduces as `int&` for the lvalue
`x` and as `int` for `5`. `std::forward<T>(arg)` uses that `T` to cast
`arg` back to the caller's value category, so each call reaches the
matching `inner`. `std::move(arg)` casts to rvalue whatever `T` is (both
calls hit `inner(int&&)`); bare `arg` is a named lvalue (both hit
`inner(int&)`); `std::forward<int>` discards the deduction and behaves
like `std::move`.
