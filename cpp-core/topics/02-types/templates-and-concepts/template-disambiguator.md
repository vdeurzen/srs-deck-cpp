---
id: templates-template-disambiguator
kind: code
version: 1
level: 4
tags: [templates, lookup]
input: chips
choices:
  c1: ["template", "typename", "auto", "*"]
compile:
  harness: |
    struct Pack {
        template<int I> constexpr int get() const { return I * 10; }
    };
    static_assert(second(Pack{}) == 10);
    int main() {}
requires:
  - templates-two-phase-lookup
refs:
  - https://en.cppreference.com/w/cpp/language/dependent_name#The_template_disambiguator_for_dependent_names
---

`get` takes its index in angle brackets, as `get<1>()`. Inside `second`,
the parser cannot know that `p.get` accepts them, and reads `get < 1` as
a comparison. Complete the call.

```cpp
template<class P>
constexpr int second(const P& p) {
    return p.{{c1::template}} get<1>();
}
```

---

After `.` or `->` on a dependent object, a name followed by `<` is taken
to be "less than" unless `template` marks it as naming a template, so the
`<` opens a template argument list. Its sibling `typename` answers a
different question: whether a dependent qualified name such as
`C::value_type` is a type rather than a value. Neither `auto` nor `.*`
changes how the `<` is parsed.
