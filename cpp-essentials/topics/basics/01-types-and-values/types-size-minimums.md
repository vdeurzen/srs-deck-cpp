---
id: types-size-minimums
kind: cloze
version: 2
level: 1
tags: [types, integers, sizes]
elaborate: Say in one sentence why code that stores 3 billion in an `int` is not portable.
refs:
  - https://en.cppreference.com/w/cpp/language/sizeof
  - https://en.cppreference.com/w/cpp/language/types#Properties
  - https://eel.is/c++draft/basic.fundamental
---

`sizeof(T)` gives the size of type `T` in bytes. For `int` the standard
fixes only a floor: `int` is at least {{c1::16::a bit count}} bits wide.
A desktop `int` being 32 bits is a platform choice, not a guarantee.

---

`sizeof(char)` is exactly 1 by definition: sizes are counted in
`char`-sized bytes.
