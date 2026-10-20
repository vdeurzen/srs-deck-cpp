---
id: iter-range-for-const-auto-ref
kind: basic
version: 1
level: 1
tags: [range-for, auto, references]
requires:
  - iter-range-for-intro
  - types-auto-deduces
  - const-ref-names-caller
  - string-basics
refs:
  - https://en.cppreference.com/w/cpp/language/range-for
  - https://en.cppreference.com/w/cpp/language/auto
elaborate: Find a loop in your code that only reads its elements; which loop-variable type does it use, and what does that cost per element?
---

```cpp
std::vector<std::string> names{"ada", "grace"};
for (const auto& name : names) {
    // ...
}
```

## What is the type of `name` inside the loop?

---

**`const std::string&`: a read-only reference to each element in turn.**
`auto` deduces the element type, `std::string`, and the written `const`
and `&` wrap it. So no string is copied, and the body cannot change one.
Plain `auto name` would copy each string; `auto&` would allow writes.
