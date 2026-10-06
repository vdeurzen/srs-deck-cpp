---
id: lambda-this-capture
kind: basic
version: 1
level: 3
tags: [lambdas, lifetime, misconception]
requires:
  - lambda-dangling-reference
elaborate: Which of your own callbacks store a lambda written inside a member function, and does any of them outlive the object it was created in?
refs:
  - https://en.cppreference.com/w/cpp/language/lambda#Lambda_capture
  - https://wg21.link/p0806
---

## `[=]` copies what the lambda uses, so the returned callback owns its own `ticks`. What actually happens when `cb()` runs?

```cpp
struct Timer {
    int ticks = 0;
    auto callback() { return [=] { return ticks; }; }
};
auto make() { Timer t; return t.callback(); }
auto cb = make();
```

---

**Undefined behaviour: `[=]` copied the `this` pointer, not `ticks`, and
`t` is gone.**

`ticks` means `this->ticks`, so only `this` is captured. C++20 deprecates
this implicit capture. Copy the object with `[*this]`, or just the member
with `[ticks = ticks]`.
