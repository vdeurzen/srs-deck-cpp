---
id: fn-explain-parameter-choice
kind: explain
version: 1
level: 2
tags: [functions, parameters, return]
requires:
  - cpp-essentials/fn-by-value-vs-reference
  - fn-reference-same-object
  - cpp-essentials/fn-return-by-value
refs:
  - https://en.cppreference.com/w/cpp/language/reference_initialization
  - https://en.cppreference.com/w/cpp/language/return
---
A colleague asks how to decide the parameter and return types of a new
function. Explain your rules and the bug each one avoids.
---
- [ ] Cheap-to-copy types (`int`, `double`, small structs) go by value: the function works on its own copy
- [ ] Large objects that are only read go by `const T&`: no copy, and the function cannot modify them
- [ ] `const T&` also accepts `const` objects and temporaries, which a plain `T&` rejects
- [ ] Plain `T&` is reserved for changing the caller's object, and the call site does not show it
- [ ] Results go back by value; a reference to a local would dangle once the function returns
