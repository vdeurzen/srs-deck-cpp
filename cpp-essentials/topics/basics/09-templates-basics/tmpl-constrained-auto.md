---
id: tmpl-constrained-auto
kind: code
version: 2
level: 2
tags: [templates, concepts, abbreviated-templates]
input: chips
choices:
  c1:
    - "std::integral auto"
    - "std::integral"
    - "auto std::integral"
    - "auto"
compile:
  harness: |
    template <class T>
    concept Accepts = requires(T t) { twice(t); };
    static_assert(Accepts<short> && Accepts<long long> && Accepts<unsigned>);
    static_assert(!Accepts<double> && !Accepts<float>, "a floating-point argument got in");
    static_assert(twice(21) == 42);
    int main() {}
requires:
  - tmpl-concept-error
  - tmpl-auto-param-cloze
  - fn-auto-return-type
  - constexpr-fn-static-assert
elaborate: Say aloud which reads better to a caller, `std::integral auto x` or a full `template` line, and when you would pick the other.
refs:
  - https://en.cppreference.com/w/cpp/language/function_template#Abbreviated_function_template
  - https://en.cppreference.com/w/cpp/concepts/integral
---

`twice` must accept every integer type and reject `twice(2.5)` at the
call, with no `template` line. Complete the parameter's type.

```cpp
#include <concepts>
constexpr auto twice({{c1::std\::integral auto}} x) { return x + x; }
```

---

A **concept** written before `auto` constrains the deduced type: this is
shorthand for `template <std::integral T> constexpr auto twice(T x)`.
Plain `auto` accepts `2.5` too. A concept alone, `std::integral x`, is
not a type, so it does not compile; neither does `auto std::integral`,
since the concept must come first.
