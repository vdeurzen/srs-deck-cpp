---
id: hash-go-map-semantics
kind: basic
version: 2
level: 3
requires:
  - hash-chaining-vs-open-addressing
tags: [go, hashing, containers]
elaborate: Where in your C++ do you hold a pointer into an `unordered_map`? What would you write instead in Go?
refs:
  - https://go.dev/ref/spec#Address_operators
  - https://go.dev/blog/swisstable
---

## Why does Go reject this, when `&m[k]` is fine on a C++ `std::unordered_map`?

```go
m := map[string]Order{"a": {}}
p := &m["a"]        // compile error
m["a"].Qty = 7      // compile error too
```

---

**The map may move entries as it grows, so Go gives no element address.**

A pointer would dangle after the next insert. Store `map[K]*V` (the map
moves only the pointer), or read the value, modify it, and assign it
back. `std::unordered_map` promises stable nodes instead.
