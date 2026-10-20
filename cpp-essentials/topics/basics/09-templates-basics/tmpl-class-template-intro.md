---
id: tmpl-class-template-intro
kind: basic
version: 1
level: 1
tags: [templates, class-templates]
requires:
  - tmpl-why-template
  - class-struct-members
elaborate: Say what you would have to change in every copy if `IntBox`, `DoubleBox` and five more such structs each gained a second member.
refs:
  - https://en.cppreference.com/w/cpp/language/class_template
---

## These two structs differ only in the member's type. What lets one definition serve both, and any other type?

```cpp
struct IntBox    { int v; };
struct DoubleBox { double v; };
```

---

**A class template, with the member's type as a parameter.**

```cpp
template <typename T>
struct Box { T v; };
```

You name the type in angle brackets when you use it: `Box<int>` and
`Box<double>` are generated from the one definition, each a real class.
Without it, every new type means another hand-copied struct.
