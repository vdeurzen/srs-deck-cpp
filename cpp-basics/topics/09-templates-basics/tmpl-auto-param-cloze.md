---
id: tmpl-auto-param-cloze
kind: cloze
version: 1
level: 2
tags: [templates, abbreviated-templates]
requires:
  - tmpl-instantiation-statics
refs:
  - https://en.cppreference.com/w/cpp/language/function_template#Abbreviated_function_template
---

Since C++20, a function can be a template without a `template` line.
These two declarations mean the same:

```cpp
void show({{c1::auto::a keyword you know from variable declarations}} x);

template <typename T>
void show(T x);
```

So `show(1); show(2); show("hi");` instantiates
{{c2::two::count the distinct argument types}} functions from it.
