---
id: templates-typename-disambiguator
kind: code
version: 1
level: 3
tags: [templates, lookup]
input: chips
choices:
  c1: ["typename", "template", "auto", "class"]
compile:
  harness: |
    #include <array>
    static_assert(first(std::array{7, 8}) == 7);
    int main() {}
requires:
  - templates-two-phase-lookup
refs:
  - https://en.cppreference.com/w/cpp/language/dependent_name#The_typename_disambiguator_for_dependent_names
---

Every standard container has a member type `value_type`, but while `first`
is being parsed, `C` is unknown and so is what `C::value_type` names.
Complete the declaration so the template compiles.

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
`auto C::value_type x` is not a declaration at all, and `class
C::value_type` demands a class type, so it fails for `int`.
