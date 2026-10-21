---
id: str-go-range-runes
kind: basic
version: 2
level: 2
tags: [strings, unicode]
requires:
  - cpp-essentials/string-basics
  - cpp-essentials/iter-range-for-intro
refs:
  - https://en.cppreference.com/w/cpp/string/basic_string
  - https://www.rfc-editor.org/rfc/rfc3629
elaborate: Where would a Go habit of `for range` decoding characters make a C++ loop over a string miscount, or split a character in two?
---

The source file is UTF-8.

```cpp
std::string s = "héllo";
int n = 0;
for (char c : s) ++n;
```

## What is `n` after the loop?

---

**6: a `std::string` holds UTF-8 bytes, and the loop visits bytes, not characters.**

`é` is two bytes in UTF-8, so `s.size()` is 6 as well. Indexing or
iterating a `std::string` never decodes; counting or splitting
characters needs a UTF-8 decoder. Checked with GCC 16.2.
