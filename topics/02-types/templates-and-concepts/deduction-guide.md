---
id: templates-deduction-guide
kind: code
version: 1
level: 3
tags: [templates]
input: chips
choices:
  c1: ["std::string", "const char*", "char*", "std::string_view"]
compile:
  harness: |
    static_assert(std::is_same_v<decltype(Box{"hi"}), Box<std::string>>);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/class_template_argument_deduction
---

Write a deduction guide so brace-initializing a `Box` from a string
literal deduces `Box<std::string>`, not `Box<const char*>`.

```cpp
#include <string>
template<typename T>
struct Box {
    T value;
};
Box(const char*) -> Box<{{c1::std::string}}>;
```

---

Without this guide, CTAD on the aggregate `Box` deduces `T` from the
constructor argument's own type, giving `Box<const char*>` — the pointer
outlives the temporary it points at exactly as long as the string literal
does, which is usually not what the author wanted. A deduction guide lets
the author say explicitly what type the deduced specialization should be,
independent of the argument's own type.
