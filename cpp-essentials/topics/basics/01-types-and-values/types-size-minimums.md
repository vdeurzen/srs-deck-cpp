---
id: types-size-minimums
kind: cloze
version: 1
level: 1
tags: [types, integers, sizes]
elaborate: Say in one sentence why code that stores 3 billion in an `int` is not portable.
refs:
  - https://en.cppreference.com/w/cpp/language/sizeof
  - https://en.cppreference.com/w/cpp/language/types#Properties
  - https://eel.is/c++draft/basic.fundamental
---

`sizeof` counts bytes. `sizeof(char)` is {{c1::exactly 1::a number}} on
every implementation.
For the other integer types the standard fixes only a floor: `int` is at
least {{c2::16::a bit count}} bits wide, `long long` at least
{{c3::64::a bit count}}. A desktop `int` being 32 bits is a platform
choice, not a guarantee.
