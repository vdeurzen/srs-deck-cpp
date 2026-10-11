---
id: virtual-protected-access
kind: code
version: 1
level: 1
tags: [inheritance, access]
requires:
  - virtual-is-a
  - class-struct-vs-class
input: chips
choices:
  c1: ["protected", "private", "public"]
compile:
  harness: |
    template <class T>
    concept OutsiderCanTouch = requires(T t) { t.count; };
    static_assert(!OutsiderCanTouch<Clicker>, "code outside the classes reached count");
    constexpr int two_clicks() {
      Clicker c;
      c.click();
      c.click();
      return c.value();
    }
    static_assert(two_clicks() == 2);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/access
---

`Clicker` must be able to change `count` directly. Code outside these two
classes must only be able to read it through `value()`. Choose the access.

```cpp
class Counter {
{{c1::protected}}:
  int count = 0;
public:
  constexpr int value() const { return count; }
};
class Clicker : public Counter {
public:
  constexpr void click() { ++count; }
};
```

---

`protected` members are reachable from the class itself **and from
classes derived from it**, but not from anywhere else. `private` shuts out
the derived class too, so `click` does not compile; `public` lets any
caller write `c.count = 99`. (Prefer `private` data plus a protected
function when the base has an invariant to keep.)
