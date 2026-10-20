---
id: string-basics
kind: basic
version: 1
level: 1
tags: [containers, string, foundations, misconception]
requires:
  - std-names-and-headers
  - types-char-is-integer
elaborate: Say where a Go habit of building a new string for every change would cost you in C++, and what you would write instead.
refs:
  - https://en.cppreference.com/w/cpp/string/basic_string
  - https://en.cppreference.com/w/cpp/string/basic_string/operator_at
---

```cpp
#include <string>
std::string s = "cat";
s[0] = 'b';
```

## Go strings are immutable, so many expect the last line not to compile. What does `s` hold after it?

---

**`"bat"`: a `std::string` owns a modifiable sequence of `char`s.**

`s[0]` names the first `char` itself, so the assignment replaces it in
place. A `std::string` also grows: `s += 'x'` appends a `char`, `s += "yz"`
a whole string, and `s.size()` counts the characters.
