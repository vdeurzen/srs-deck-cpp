---
id: raii-scope-exit-order
kind: trace
version: 1
level: 1
tags: [lifetime, raii, tracing]
requires:
  - raii-storage-durations
probes:
  1: { trail: "cb" }
  2: { trail: "cbda" }
refs:
  - https://en.cppreference.com/w/cpp/language/destructor#Destruction_sequence
  - https://timsong-cpp.github.io/cppwp/n4950/stmt.jump.general#2
---

```cpp
std::string trail;   // every destructor appends its letter
struct Noisy {
  char c;
  ~Noisy() { trail += c; }
};

int f() {
  Noisy a{'a'};
  {
    Noisy b{'b'};
    Noisy c{'c'};
  }                    // @1
  Noisy d{'d'};
  return 0;
}

int main() {
  f();                 // @2
}
```

---

Objects with automatic storage duration are destroyed when control leaves
their scope, in **reverse order of construction**. The inner block's `}`
destroys `c` and then `b`, so `trail` reads `cb` at Probe 1; `a` is
untouched because its scope is the whole function. `return 0;` is an exit
from `f`'s scope too: `d` goes first (constructed last), then `a`. No
statement in `f` mentions destruction; the closing brace and the `return`
do it, and they would do the same on a `break`, a `goto`, or an exception
leaving the scope (one caveat: for an exception nothing ever catches,
whether the stack unwinds before `std::terminate` is
implementation-defined). Verified by compiling and running this program under
GCC 16.2 (`g++ -std=c++23`).
