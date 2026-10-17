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
  - https://leetcode.com/problems/decode-ways/
  - https://leetcode.com/problems/word-break/
  - https://en.cppreference.com/w/cpp/string/basic_string/substr
  - https://en.cppreference.com/w/cpp/string/basic_string_view/substr
elaborate: "Decode Ways (LC 91: count the ways to decode a digit string, 1 = A ... 26 = Z) and Word Break (LC 139: can `s` be split into dictionary words?) invite recursive solutions that pass a suffix such as `s.substr(1)` down a level. What does each call copy, and what would you pass instead?"
---

Reverse Words in a String (LC 151): return the words of `s` in reverse
order. A split helper for it, if words are separated by single spaces:

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
tail.** The tail shrinks by 2 per turn, so copies sum to ≈ n²/4
characters: ≈ 2.5 × 10⁷, about 1 ms, at this problem's 10⁴; 2.5 × 10¹¹,
seconds, at 10⁶. Make `rest` a `std::string_view`: `substr` is then
O(1), and only the words are copied, O(n).
