---
id: tmpl-definition-in-header
kind: basic
version: 1
level: 2
tags: [templates, instantiation, linkage, headers]
requires:
  - tmpl-instantiation-statics
  - linkage-which-step-fails
refs:
  - https://en.cppreference.com/w/cpp/language/function_template#Implicit_instantiation
  - https://en.cppreference.com/w/cpp/language/function_template#Explicit_instantiation
---

## Both files compile, then the link fails with `undefined reference to 'int twice<int>(int)'`. What is wrong?

```cpp
// twice.h
template <typename T> T twice(T x);
// twice.cpp
#include "twice.h"
template <typename T> T twice(T x) { return x + x; }
// main.cpp
#include "twice.h"
int n = twice(21);
```

---

**`main.cpp` cannot see the template's definition, so nobody instantiates `twice<int>`.**
A template is instantiated in the file that uses it, and only from a
visible body; `twice.cpp` never uses `int`. Put the definition in the
header, or explicitly instantiate `template int twice<int>(int);` in
`twice.cpp`.
