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
    constexpr int check() { Derived d; return via_base(d); }
    static_assert(check() == 1);
    int main() {}
requires:
  - cpp-essentials/virtual-dispatch-dynamic-type
  - cpp-essentials/virtual-override-mismatch
refs:
  - https://en.cppreference.com/w/cpp/language/override
---

With a bare `constexpr int id() { return 1; }`, `via_base` on a `Derived`
returns 0. Pick the specifiers that make it return 1.

```cpp
struct Base {
    constexpr virtual ~Base() = default;
    constexpr virtual int id() const { return 0; }
};
struct Derived : Base {
    constexpr int id() {{c1::const override}} { return 1; }
};
constexpr int via_base(const Base& b) { return b.id(); }
```

---

An override must match the base signature exactly, `const` included.
Without `const`, `int id()` is a **new** function that hides `Base::id`; the
call through `const Base&` silently runs `Base::id` and returns 0. `override`
turns that silent mismatch into a compile error ("marked override, but does
not override"), which is why it belongs on every overriding function.
