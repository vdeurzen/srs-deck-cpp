---
id: stl-substr-quadratic
kind: basic
version: 2
level: 3
tags: [stl, strings, complexity, lc-151]
requires:
  - cpp-essentials/strings-string-view-parameter
  - complexity-count-loop-steps
refs:
  - https://en.cppreference.com/w/cpp/string/basic_string/substr
  - https://en.cppreference.com/w/cpp/string/basic_string_view/substr
  - https://leetcode.com/problems/reverse-words-in-a-string/
  - https://leetcode.com/problems/decode-ways/
elaborate: "Decode Ways (LC 91: count the ways to decode a digit string, 1 = A ... 26 = Z) invites a recursion that passes `s.substr(1)` down a level. What does each call copy, and what would you pass instead?"
---

`s` is a `std::string`; `s.substr(1)` returns a new string holding all
but its first character.

```cpp
int steps = 0;
while (s.size() > 0) {
  s = s.substr(1);
  ++steps;
}
```

## For an n-character `s`, how does the running time grow?

---

**O(n²): every `substr(1)` copies the whole remaining tail.**

The copies sum to (n − 1) + (n − 2) + … + 0 ≈ n²/2 characters. A split
helper that keeps `rest = rest.substr(sp + 1)` does the same on
one-letter words. With a `std::string_view`, `substr` copies nothing:
O(1) per step, O(n) total.
