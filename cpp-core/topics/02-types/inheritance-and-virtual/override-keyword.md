---
id: virtual-override-keyword
kind: code
version: 1
level: 2
tags: [inheritance, virtual]
input: chips
choices:
  c1: ["const override", "override", "noexcept override", "final"]
compile:
  harness: |
    constexpr int via_base() {
        Derived d;
        const Base& b = d;
        return b.id();
    }
    static_assert(via_base() == 1);
    int main() {}
requires:
  - virtual-dispatch-dynamic-type
refs:
  - https://en.cppreference.com/w/cpp/language/override
---

`Derived::id` must replace `Base::id` for calls through a `const Base&`,
and the compiler must reject it if `Base::id`'s signature ever drifts.

```cpp
struct Base {
    constexpr virtual ~Base() = default;
    constexpr virtual int id() const { return 0; }
};
struct Derived : Base {
    constexpr int id() {{c1::const override}} { return 1; }
};
```

---

An override must match the base signature exactly, `const` included.
Without `const`, `int id()` is a **new** function that hides `Base::id`; the
call through `const Base&` silently runs `Base::id` and returns 0. `override`
turns that silent mismatch into a compile error ("marked override, but does
not override"), which is why it belongs on every overriding function.
