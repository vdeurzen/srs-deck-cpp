---
id: variadic-expansion-intro
kind: basic
version: 1
level: 2
tags: [templates, variadic]
requires:
  - variadic-what-is-a-pack
elaborate: Say aloud what `f(args...)` and `f(g(args)...)` each pass to `f` when the pack holds two values.
refs:
  - https://en.cppreference.com/w/cpp/language/pack#Pack_expansion
  - https://eel.is/c++draft/temp.variadic#5
---

```cpp
int sum3(int a, int b, int c) { return a + b + c; }
int twice(int x) { return 2 * x; }

template<typename... Ts>
int run(Ts... args) { return sum3(twice(args)...); }
```

## In the call `run(1, 2, 3)`, what argument list does `twice(args)...` become?

---

**`twice(1), twice(2), twice(3)`: the pattern before `...` repeats once per element.**

The pattern is everything to the left of `...` that names the pack, here
`twice(args)`. Each copy takes the next element, and the copies are
separated by commas, so `run(1, 2, 3)` returns 12.
