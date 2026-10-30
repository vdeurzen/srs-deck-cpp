---
id: fn-explain-parameter-choice
kind: explain
version: 2
level: 2
tags: [functions, parameters, return]
requires:
  - cpp-essentials/fn-by-value-vs-reference
  - fn-reference-same-object
  - cpp-essentials/fn-return-by-value
elaborate: Pick a function you wrote recently; which parameter or return type would you change now, and what bug did the old one invite?
refs:
  - https://en.cppreference.com/w/cpp/language/reference_initialization
  - https://en.cppreference.com/w/cpp/language/return
---
A colleague asks how you choose the parameter and return types of a new
function. What do you tell them?
---
- [ ] Cheap-to-copy types (`int`, `double`, small structs) go by value: the function works on its own copy
- [ ] Large objects that are only read go by `const T&`: no copy, and the function cannot modify them
- [ ] `const T&` also binds temporaries, which a plain `T&` rejects
- [ ] Plain `T&` is reserved for changing the caller's object, and the call site does not show it
- [ ] Results go back by value; a reference to a local would dangle once the function returns
