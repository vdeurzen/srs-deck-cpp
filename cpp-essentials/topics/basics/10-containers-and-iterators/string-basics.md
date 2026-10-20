---
id: string-basics
kind: basic
version: 1
level: 1
tags: [containers, string, foundations, misconception]
requires:
  - std-names-and-headers
  - types-char-is-integer
elaborate: Say why appending with `s += c` in a loop beats rebuilding with `s = s + c`, as you would to an interviewer.
refs:
  - https://en.cppreference.com/w/cpp/string/basic_string
  - https://en.cppreference.com/w/cpp/string/basic_string/operator_at
---

```cpp
#include <string>
std::string s = "cat";
s[0] = 'b';
```

## Many expect a string's characters to be read-only, so the last line would not compile. What does `s` hold after it?

---

**`"bat"`: a `std::string` owns a modifiable sequence of `char`s.**

`s[0]` names the first `char` itself, so the assignment replaces it in
place. A `std::string` also grows: `s += 'x'` appends a `char`, `s += "yz"`
a whole string, and `s.size()` counts the characters.
