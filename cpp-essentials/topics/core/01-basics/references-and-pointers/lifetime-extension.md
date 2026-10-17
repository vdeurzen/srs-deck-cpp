---
id: ptr-lifetime-extension
kind: basic
version: 1
level: 2
tags: [references, lifetime, temporaries]
requires:
  - ptr-temporary-full-expression
  - vc-trace-extended-temporary
refs:
  - https://en.cppreference.com/w/cpp/language/reference_initialization#Lifetime_of_a_temporary
  - https://timsong-cpp.github.io/cppwp/n4950/class.temporary#6
---

## When is the `Noisy` returned by `make('k')` destroyed? Its destructor is the observable event.

```cpp
struct Noisy { ~Noisy(); };
Noisy make(char tag);                 // returns by value
const Noisy& kept = make('k');
```

---

**When `kept` goes out of scope — not at the `;`.** Binding a reference
*directly* to a temporary extends the temporary's lifetime to the
reference's. Only direct binding counts: no extension through a function
that returns a reference, nor into a constructor's initialiser list.
`for (const auto& x : make_vector())` relies on it: the range temporary
outlives the loop.
