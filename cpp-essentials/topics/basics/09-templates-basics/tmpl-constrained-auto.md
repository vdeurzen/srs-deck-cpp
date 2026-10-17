---
id: tmpl-constrained-auto
kind: code
version: 1
level: 2
tags: [templates, concepts, abbreviated-templates]
requires:
  - tmpl-concept-intro
  - tmpl-concept-error
input: chips
choices:
  c1:
    - "std::integral"
    - "std::signed_integral"
    - "std::floating_point"
    - "std::unsigned_integral"
compile:
  harness: |
    template <class T>
    concept Accepts = requires(T t) { twice(t); };
    static_assert(Accepts<short> && Accepts<long long> && Accepts<unsigned>);
    static_assert(!Accepts<double> && !Accepts<float>, "a floating-point argument got in");
    static_assert(twice(21) == 42);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/function_template#Abbreviated_function_template
  - https://en.cppreference.com/w/cpp/concepts/integral
---

A concept name written directly before `auto` constrains that parameter,
as `template <C T>` would. `twice` must accept `short`, `long long` and
`unsigned` arguments, and reject `twice(2.5)` at the call site. Complete
the parameter.

```cpp
#include <concepts>
constexpr auto twice({{c1::std\::integral}} auto x) { return x + x; }
```

---

A **concept** written before `auto` constrains the deduced type: this is
shorthand for `template <std::integral T> constexpr auto twice(T x)`.
`std::integral` holds for every integer type (and `char`, `bool`), and a
`double` fails it at the call. `std::signed_integral` is too narrow: it
rejects `unsigned`; `std::unsigned_integral` rejects `short` and
`long long`. `std::floating_point` admits exactly the wrong types.
