---
id: vc-trace-extended-temporary
kind: trace
version: 2
level: 2
tags: [value-categories, temporaries, lifetime, tracing]
requires:
  - life-temporary-intro
  - value-categories-reference-binding-cloze
probes:
  1: { a: "0" }
  2: { b: "1" }
  3: { c: "0" }
elaborate: Say why binding a `const&` to a temporary in a local declaration is safe, yet returning such a reference is not.
refs:
  - https://en.cppreference.com/w/cpp/language/reference_initialization#Lifetime_of_a_temporary
  - https://eel.is/c++draft/class.temporary#6
---

```cpp
int alive = 0;       // number of Probe objects currently alive
struct Probe {
  Probe()  { ++alive; }
  ~Probe() { --alive; }
};
int main() {
  Probe{};
  int a = alive;                     // @1
  {
    const Probe& kept = Probe{};
    int b = alive;                   // @2
  }
  int c = alive;                     // @3
}
```

---

A temporary normally dies at the end of the full-expression that made
it: the first `Probe{}` is gone by its `;`, so `a` is 0. Binding a
`const Probe&` *directly* to a temporary stretches the temporary's life
to the reference's: `kept` keeps one alive (1). When `kept`'s block
closes, the reference ends and its temporary dies with it (back to 0).
Verified by running an instrumented copy under GCC 16.2
(`g++ -std=c++23`).
