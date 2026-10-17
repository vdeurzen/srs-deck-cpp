---
id: class-invariant-who-checks
kind: basic
version: 1
level: 2
tags: [classes, invariants, access]
requires:
  - class-struct-vs-class
refs:
  - https://en.cppreference.com/w/cpp/language/access
  - https://en.cppreference.com/w/cpp/language/classes
elaborate: Pick a struct in your code with public fields that must agree with each other. How many places could currently break that agreement?
---

## The comment states `Range`'s invariant. Which code must you read to trust it?

```cpp
class Range {
    int lo_, hi_;          // always lo_ <= hi_
public:
    Range(int lo, int hi);
    void widen(int by);
    int size() const;
};
```

---

**Only `Range`'s own members (plus any friends it declares).**

`lo_` and `hi_` are `private`, so no other code can change them. The
constructor must establish `lo <= hi` and `widen` preserve it; `size()` is
`const`, and the implicit copies copy a valid pair. Every caller may rely
on it unchecked: that local reasoning is what `private` buys.
