---
id: variadic-what-is-a-pack
kind: basic
version: 1
level: 1
tags: [templates, variadic]
requires:
  - templates-instantiation
refs:
  - https://en.cppreference.com/w/cpp/language/pack
  - https://eel.is/c++draft/temp.variadic
elaborate: Say aloud why a pack that cannot be indexed or stored still lets a function such as `std::make_unique` pass every argument on.
---

## Given `template<typename... Ts> void f(Ts... args);`, what are `Ts` and `args` in the call `f(1, 'c', 2.0)`?

---

**`Ts` is a pack of three types (`int, char, double`); `args` a pack of
three parameters of those types.**

A pack is not a tuple or an array: it has no `[i]` and cannot be stored.
You use it only by **expanding** it with `...`. It may also hold zero
elements.
