---
id: raii-guard-destructor
kind: code
version: 1
level: 2
tags: [raii, lifetime]
requires:
  - raii-owner-in-destructor
input: chips
choices:
  c1:
    - "Lock guard{held};"
    - "Lock{held};"
    - "auto* guard = new Lock{held};"
    - "*held = true;"
compile:
  harness: |
    constexpr int run(bool fail) {
      bool held = false;
      int r = update(&held, fail);
      return held ? 100 : r;   // 100: still held after update returned
    }
    static_assert(run(false) == 1, "released before the body ran, or leaked");
    static_assert(run(true) == -1, "the early return skipped the release");
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/raii
  - https://en.cppreference.com/w/cpp/language/storage_duration
---

`update` must hold the lock while its body runs and release it on every
path out, including the early `return`. Complete the line that takes the
lock.

```cpp
struct Lock {
  bool* held;
  constexpr explicit Lock(bool* h) : held(h) { *held = true; }
  constexpr ~Lock() { *held = false; }
};
constexpr int update(bool* held, bool fail) {
  {{c1::Lock guard{held};}}
  if (fail) return -1;
  return *held ? 1 : 0;   // 1: the body ran under the lock
}
```

---

The guard only does its job as a **named object with automatic storage
duration**: its destructor then runs when `update`'s scope ends, by any
route. An unnamed `Lock{held};` is a temporary, destroyed at the end of
its own statement, so the body runs unlocked. Setting `*held = true;` by
hand has no destructor, so the early `return` never releases. A `Lock`
made with `new` lives until someone `delete`s it, which nobody does. Each
mistake changes what `run` returns, so the harness's `static_assert`s
reject it (the leaked `new` is also not allowed in a constant
expression).
