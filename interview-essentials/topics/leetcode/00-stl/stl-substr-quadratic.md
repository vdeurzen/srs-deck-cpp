---
id: stl-substr-quadratic
kind: basic
version: 1
level: 3
tags: [stl, strings, complexity, lc-151]
requires:
  - cpp-essentials/strings-string-view-parameter
refs:
  - https://leetcode.com/problems/reverse-words-in-a-string/
  - https://en.cppreference.com/w/cpp/string/basic_string/substr
  - https://en.cppreference.com/w/cpp/string/basic_string_view/substr
elaborate: "Recursive solutions that pass `s.substr(1)` down a level (LC 91, LC 139): what does each call copy, and what would you pass instead?"
---

A split helper for LC 151 (Reverse Words), words separated by single
spaces:

```cpp
std::vector<std::string> split(std::string rest) {
  std::vector<std::string> words;
  for (;;) {
    auto sp = rest.find(' ');
    words.emplace_back(rest.substr(0, sp));
    if (sp == rest.npos) return words;
    rest = rest.substr(sp + 1);
  }
}
```

## For an n-character string of one-letter words, how does its running time grow?

---

**O(n²): every `rest.substr(sp + 1)` copies the whole remaining
tail.** The tail shrinks by 2 per turn, so the copies sum to ≈ n²/4
characters: harmless at LC 151's 10⁴, the habit that TLEs at 10⁵
(2.5 × 10⁹). Declare `rest` a `std::string_view`: `substr` becomes a
pointer and a length, O(1), and only the words are copied, O(n).
