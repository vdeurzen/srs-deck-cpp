---
id: raii-guard-destructor
kind: code
version: 1
level: 2
tags: [raii, lifetime]
requires:
  - raii-owner-in-destructor
  - life-temporary-intro
  - constexpr-fn-static-assert
elaborate: Say in one sentence, as to an interviewer, why an unnamed guard object is a bug that compiles cleanly.
input: chips
choices:
  c1:
    - "Lock guard{held};"
    - "Lock{held};"
    - "auto* guard = new Lock{held};"
    - "*held = true;"
compile:
  harness: |
    constexpr bool released(int n) {
      bool held = false;
      update(&held, n);
      return !held;
    }
    constexpr bool body_locked() {
      bool held = false;
      return update(&held, 1);
    }
    static_assert(body_locked(), "the body ran without the lock");
    static_assert(released(1) && released(-1), "a path out kept the lock");
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/raii
  - https://en.cppreference.com/w/cpp/language/storage_duration
---

`Lock` sets `*held` to `true` while it holds the lock. Hold it for the
body of `update` and release it on every path out. Complete the line
that takes it.

```cpp
struct Lock {
  bool* held;
  constexpr Lock(bool* h) : held(h) { *held = true; }
  constexpr ~Lock() { *held = false; }
};
constexpr bool update(bool* held, int n) {
  {{c1::Lock guard{held};}}
  if (n < 0) return false;
  return *held;
}
```

---

The guard only does its job as a **named object with automatic storage
duration**: its destructor then runs when `update`'s scope ends, by any
route. An unnamed `Lock{held};` is a temporary, destroyed at the end of
its own statement, so the body runs unlocked. Setting `*held = true;` by
hand has no destructor, so nothing ever releases. A `Lock` made with
`new` lives until someone `delete`s it, which nobody does.
