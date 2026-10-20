---
id: tmpl-auto-param-cloze
kind: cloze
version: 2
level: 2
tags: [templates, abbreviated-templates]
requires:
  - tmpl-why-template
  - types-auto-deduces
elaborate: Say aloud when you would still write the full `template <typename T>` line instead of an `auto` parameter.
refs:
  - https://en.cppreference.com/w/cpp/language/function_template#Abbreviated_function_template
---

Since C++20, a function can be a template without a `template` line.
These two declarations mean the same:

```cpp
void show(auto x);

template <typename T>
void show(T x);
```

So `show(1); show(2); show("hi");` makes the compiler generate
{{c1::two::a number}} functions from it.
