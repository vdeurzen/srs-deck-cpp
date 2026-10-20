---
id: tmpl-instantiation-statics
kind: trace
version: 2
level: 2
tags: [templates, instantiation, tracing]
probes:
  1: { a: "1" }
  2: { b: "1" }
  3: { c: "2" }
requires:
  - tmpl-why-template
  - life-function-local-static
elaborate: Say what this means for a template that keeps a cache in a `static` variable.
refs:
  - https://en.cppreference.com/w/cpp/language/function_template#Implicit_instantiation
  - https://en.cppreference.com/w/cpp/language/storage_duration#Static_block_variables
---

`tick(T)` names no parameter: the argument is accepted and ignored, and
only its type matters.

```cpp
template <typename T>
int tick(T) {
  static int calls = 0;
  return ++calls;
}

int main() {
  int a = tick(1);     // @1
  int b = tick('x');   // @2
  int c = tick(2);     // @3
}
```

---

A template is not one function: each distinct `T` **instantiates** its
own. `'x'` is a `char`, so `tick('x')` calls the separate function
`tick<char>`, whose `calls` starts from 0. `tick(1)` and `tick(2)` both
deduce `T = int` and share `tick<int>`, so its `calls` reaches 2. Verified by
compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23`).
