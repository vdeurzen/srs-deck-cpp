---
id: spaceship-hand-written-no-equality
kind: basic
version: 1
level: 3
tags: [comparisons, misconception]
requires:
  - spaceship-basics
elaborate: "For a type of yours with a hand-written `<=>`, would an `==` derived from it do more work than a dedicated one?"
refs:
  - https://en.cppreference.com/w/cpp/language/default_comparisons
  - https://wg21.link/p1185r2
---

## `a < b` compiles for two `Version`s. What happens with `a == b`?

```cpp
struct Version {
    int major, minor;
    std::strong_ordering operator<=>(const Version& o) const {
        if (auto c = major <=> o.major; c != 0) return c;
        return minor <=> o.minor;
    }
};
```

---

**It does not compile: only a *defaulted* `operator<=>` implicitly
declares `operator==`.**

Tempting, since `<`, `<=`, `>`, `>=` all come from `<=>`. But equality is
often cheaper than ordering (strings of different lengths differ without
comparing characters), so a hand-written `<=>` is never reused for `==`.
Add `bool operator==(const Version&) const = default;`.
