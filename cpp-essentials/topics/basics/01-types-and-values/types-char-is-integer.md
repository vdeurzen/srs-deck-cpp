---
id: types-char-is-integer
kind: basic
version: 1
level: 1
tags: [types, char, integers]
refs:
  - https://en.cppreference.com/w/cpp/language/types#Character_types
  - https://eel.is/c++draft/lex.charset
---

## What value does `d` get?

```cpp
char c = '7';
int d = c - '0';
```

---

**7: a `char` is a small integer code, and digit codes are consecutive.**

`'7'` is the character's code, not the number 7, and arithmetic uses
that code. The standard makes `'0'`..`'9'` adjacent, so `c - '0'` is the
digit's value. ASCII letters are adjacent too: `c - 'a'` indexes 26
counters.
