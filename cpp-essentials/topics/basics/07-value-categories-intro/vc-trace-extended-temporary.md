---
id: vc-trace-extended-temporary
kind: trace
version: 1
level: 2
tags: [value-categories, temporaries, lifetime, tracing]
requires:
  - life-temporary-full-expression
  - value-categories-reference-binding-cloze
probes:
  1: { a: "0" }
  2: { b: "1" }
  3: { c: "2" }
  4: { d: "1" }
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
  const Probe& kept = Probe{};
  int b = alive;                     // @2
  {
    const Probe& inner = Probe{};
    int c = alive;                   // @3
  }
  int d = alive;                     // @4
}
```

---

A temporary normally dies at the end of the full-expression that made
it: the first `Probe{}` is gone by its `;`, so `a` is 0. Binding a
`const Probe&` *directly* to a temporary stretches the temporary's life
to the reference's: `kept` keeps one alive (1), `inner` a second (2).
When `inner`'s block closes, its temporary dies with it (back to 1);
`kept`'s lives until `main` ends.
