---
id: coroutines-parameters-copied
kind: basic
version: 2
level: 4
tags: [coroutines, lifetimes]
requires:
  - coroutines-frame-allocation
  - coroutines-eager-vs-lazy-start
refs:
  - https://eel.is/c++draft/dcl.fct.def.coroutine
  - https://en.cppreference.com/w/cpp/language/coroutines#Execution
---

## A lazy coroutine `Task greet(std::string s)` is called as `greet(name)`, and `name` is destroyed before the coroutine is resumed. Why is the body still safe?

---

**The frame holds its own `std::string`, moved in from the parameter.**
`greet(name)` copy-initialises the parameter `s` from the argument; the
frame's copy is then move-constructed from `s` (GCC 16: one copy, one
move). The body only ever sees the frame's copy, so by-value is the rule
for a coroutine that outlives its call; a reference copies only itself.
