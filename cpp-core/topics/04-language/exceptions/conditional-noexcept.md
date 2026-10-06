---
id: exceptions-conditional-noexcept
kind: code
version: 1
level: 3
tags: [exceptions, noexcept, templates]
input: chips
choices:
  c1: ["noexcept(noexcept(f()))", "noexcept", "noexcept(f())", "noexcept(false)"]
compile:
  harness: |
    void quiet() noexcept;
    void loud();
    static_assert(noexcept(invoke_twice(quiet)));
    static_assert(!noexcept(invoke_twice(loud)));
    int main() {}
requires:
  - exceptions-noexcept-operator
  - templates-instantiation
refs:
  - https://en.cppreference.com/w/cpp/language/noexcept_spec
  - https://en.cppreference.com/w/cpp/language/noexcept
---

Make `invoke_twice` promise not to throw exactly when calling `f` can't
throw.

```cpp
template <class F>
void invoke_twice(F f) {{c1::noexcept(noexcept(f()))}} {
    f();
    f();
}
```

---

The outer `noexcept(...)` is the **specifier**: it makes the promise when
its constant is `true`. The inner one is the operator, supplying that
constant per instantiation. Unconditional `noexcept` would terminate on `loud`;
`noexcept(f())` passes `void` where a `bool` is needed. This is how wrappers
pass on the guarantee `std::vector` checks before moving elements.
