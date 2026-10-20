---
id: life-temporary-full-expression
kind: trace
version: 3
level: 2
tags: [lifetime, temporaries, tracing]
requires:
  - life-ctor-dtor-count
  - life-temporary-intro
probes:
  1: { a: "1", alive: "0" }
  2: { c: "1", alive: "1" }
elaborate: Where in your code is a temporary passed to a `const&` parameter, and would anything break if the function kept that reference?
refs:
  - https://en.cppreference.com/w/cpp/language/lifetime#Temporary_object_lifetime
  - https://eel.is/c++draft/class.temporary#4
---

`Probe{}` creates an unnamed `Probe`.

```cpp
int alive = 0;   // the constructor adds 1, the destructor subtracts 1
struct Probe {
  Probe()  { ++alive; }
  ~Probe() { --alive; }
};
int peek(const Probe& p) { return alive; }

int main() {
  int a = peek(Probe{});        // @1 (after this line)
  Probe p;
  int c = peek(p);              // @2 (after this line)
}
```

---

`Probe{}` creates an unnamed **temporary**. A temporary lives until the end
of the *full-expression* that created it, here the whole statement up to
its `;`, and not a moment longer. So `peek` sees it alive (`a` is 1) and it
is gone by the next line (`alive` is 0). The named `p` lives on until
`main`'s `}`, so it is still alive after its line. Verified by compiling
and running an instrumented copy under GCC 16.2 (`g++ -std=c++23`).
