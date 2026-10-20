---
id: string-literal-is-char-array
kind: basic
version: 1
level: 1
tags: [strings, arrays, pointers]
requires:
  - ptr-array-name-to-pointer
  - string-basics
  - const-no-modify
refs:
  - https://en.cppreference.com/w/cpp/language/string_literal
  - https://eel.is/c++draft/lex.string
elaborate: Say in one sentence what a C++ function given only a pointer to `"cat"` must do to find the end.
---

```cpp
std::string pet = "cat";
```

## The literal `"cat"` on the right is an array of `char`. How many elements does it have?

---

**Four: `'c'`, `'a'`, `'t'` and a terminating `'\0'`.**

Its type is `const char[4]`: the `'\0'` marks where the text ends.
