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

**Only the constructor and the member functions that write `lo_` or `hi_`.**

`lo_` and `hi_` are `private`, so no code outside `Range` can change them.
The constructor must establish `lo <= hi` (or reject its arguments) and
`widen` must preserve it. Everything else, including every caller, may rely
on it unchecked: that local reasoning is what `private` buys.
