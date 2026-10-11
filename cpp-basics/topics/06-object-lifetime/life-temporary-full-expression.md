---
id: life-temporary-full-expression
kind: trace
version: 1
level: 2
tags: [lifetime, temporaries, tracing]
requires:
  - life-ctor-dtor-count
  - ptr-const-ref-read-only
probes:
  1: { a: "1", alive: "0" }
  2: { b: "3", alive: "0" }
  3: { c: "1", alive: "1" }
refs:
  - https://en.cppreference.com/w/cpp/language/lifetime#Temporary_object_lifetime
  - https://eel.is/c++draft/class.temporary#4
---

```cpp
int alive = 0;   // the constructor adds 1, the destructor subtracts 1
struct Probe {
  Probe()  { ++alive; }
  ~Probe() { --alive; }
};
int peek(const Probe&) { return alive; }

int main() {
  int a = peek(Probe{});                   // @1 (after this line)
  int b = peek(Probe{}) + peek(Probe{});   // @2 (after this line)
  Probe p;
  int c = peek(p);                         // @3 (after this line)
}
```

---

`Probe{}` creates an unnamed **temporary**. A temporary lives until the end
of the *full-expression* that created it, here the whole statement up to
its `;`, and not a moment longer. So `peek` sees it alive (`a` is 1) and it
is gone by the next line. In the second statement the first temporary is
still alive while the second `peek` runs, so the calls see 1 and 2 (in
either order): `b` is 3. The named `p` lives on until `main`'s `}`.
Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23`), with a clean `-fsanitize=address` run.
