---
id: templates-requires-clause
kind: code
version: 1
level: 3
tags: [templates, concepts]
input: chips
choices:
  c1: ["std::integral", "std::floating_point", "typename", "class"]
compile:
  harness: |
    static_assert(add_one(5) == 6);
    template<class U>
    concept Accepts = requires(U u) { add_one(u); };
    static_assert(Accepts<int>);
    static_assert(!Accepts<double>);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/concepts/integral
---

Constrain `T` so `add_one` only accepts integer types.

```cpp
#include <concepts>
template<{{c1::std\::integral}} T>
constexpr T add_one(T x) { return x + 1; }
```

---

`std::integral` is a standard library concept: a named, reusable
predicate over types. Writing it directly as the template parameter's
constraint reads as "for every integral `T`", and a call with the wrong
`T` fails overload resolution with a message that names the unsatisfied
concept, not a wall of substitution failures.
