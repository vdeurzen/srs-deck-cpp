---
id: tmpl-instantiation-statics
kind: trace
version: 1
level: 2
tags: [templates, instantiation, tracing]
requires:
  - tmpl-function-syntax
probes:
  1: { a: "1" }
  2: { b: "2" }
  3: { c: "1" }
  4: { d: "1" }
  5: { e: "3" }
refs:
  - https://en.cppreference.com/w/cpp/language/function_template#Implicit_instantiation
  - https://en.cppreference.com/w/cpp/language/storage_duration#Static_block_variables
---

```cpp
template <typename T>
int tick(T) {
  static int calls = 0;   // initialised once, then kept between calls
  return ++calls;
}

int main() {
  int a = tick(1);     // @1
  int b = tick(2);     // @2
  int c = tick('x');   // @3
  int d = tick(3.0);   // @4
  int e = tick(4);     // @5
}
```

---

A template is not one function: each distinct `T` **instantiates** its
own. `tick(1)`, `tick(2)` and `tick(4)` all deduce `T = int` and share
`tick<int>`, whose `calls` reaches 3. `'x'` is a `char` and `3.0` a
`double`, so they get the separate functions `tick<char>` and
`tick<double>`, each with its own `calls` starting from 0. Verified by
compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23`).
