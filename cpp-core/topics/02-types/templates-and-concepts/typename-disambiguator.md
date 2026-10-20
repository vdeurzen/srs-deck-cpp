---
id: templates-typename-disambiguator
kind: code
version: 1
level: 3
tags: [templates, lookup]
input: chips
choices:
  c1: ["typename", "template", "const", "class"]
compile:
  harness: |
    #include <array>
    static_assert(first(std::array{7, 8}) == 7);
    int main() {}
requires:
  - templates-two-phase-lookup
refs:
  - https://en.cppreference.com/w/cpp/language/dependent_name#The_typename_disambiguator_for_dependent_names
  - https://wg21.link/p0634r3
---

`first` should work for any standard container, each of which has a
member type `value_type`. Complete the declaration so the template
compiles.

```cpp
template<class C>
constexpr auto first(const C& c) {
    {{c1::typename}} C::value_type x = *c.begin();
    return x;
}
```

---

A qualified name that depends on a template parameter is assumed to name
a value, not a type, unless it is prefixed with `typename`. Without it
this line is a parse error at the definition, before any call. `template`
answers a different question: whether a `<` after a dependent name opens
template arguments.
`const` alone does not help: C++20 dropped `typename` only where nothing
but a type can appear (P0634), and a statement in a function body is not
such a place. `class C::value_type` demands a class type, so it fails for
`int`.
