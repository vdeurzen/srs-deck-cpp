---
id: tmpl-class-member-type
kind: code
version: 1
level: 1
tags: [templates, class-templates]
requires:
  - tmpl-function-syntax
input: chips
choices:
  c1: ["T", "auto", "typename", "int"]
compile:
  harness: |
    static_assert(std::is_same_v<decltype(Box<double>{}.value), double>);
    static_assert(std::is_same_v<decltype(Box<char>{}.value), char>);
    static_assert(Box<int>{7}.value == 7);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/class_template
---

`Box<double>` must hold a `double`, `Box<char>` a `char`, and so on for
any type written in the angle brackets. Complete the data member.

```cpp
#include <type_traits>
template <typename T>
struct Box {
  {{c1::T}} value;
};
```

---

A **class template** uses its parameter anywhere a type can go, members
included; `Box<double>` is the class you get by substituting `double` for
`T`. A data member cannot be declared `auto` (there is no initialiser to
deduce from), and `int` would make every `Box` hold an `int`.
