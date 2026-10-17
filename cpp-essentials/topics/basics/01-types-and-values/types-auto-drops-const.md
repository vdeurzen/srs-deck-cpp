---
id: types-auto-drops-const
kind: code
version: 1
level: 2
tags: [types, auto, const]
input: chips
choices:
  c1: ["auto", "const auto", "auto&", "decltype(auto)"]
compile:
  harness: |
    static_assert(countdown() == 6);
    int main() {}
requires:
  - const-vs-constexpr-initializer
refs:
  - https://en.cppreference.com/w/cpp/language/auto
  - https://eel.is/c++draft/dcl.type.auto.deduct
---

`left` must be a separate, modifiable copy of `limit`, so that counting
it down leaves `limit` untouched. Complete its declaration.

```cpp
constexpr int countdown() {
  const int limit = 3;
  {{c1::auto}} left = limit;
  int steps = 0;
  while (left > 0) { --left; ++steps; }
  return steps + limit;
}
```

---

Plain `auto` declares a fresh object: it takes the
initializer's type and **drops a top-level `const`** (and any reference),
so `left` is an ordinary `int` copy. `const auto` keeps the `const` and
`auto&` binds to `limit` itself as `const int&`, so `--left` fails for
both; `decltype(auto)` reproduces `limit`'s declared type, `const int`.
