---
id: stl-letter-count-chunk
kind: chunk
version: 1
level: 2
tags: [stl, counting, lc-242]
expose_ms: 11000
compile:
  harness: |
    #include <string_view>
    using namespace std::literals;
    static_assert(is_anagram("anagram"sv, "nagaram"sv));
    static_assert(!is_anagram("rat"sv, "car"sv));
    static_assert(!is_anagram("aab"sv, "abb"sv));
    static_assert(!is_anagram("ab"sv, "a"sv));
    int main() {}
refs:
  - https://leetcode.com/problems/valid-anagram/
  - https://leetcode.com/problems/find-all-anagrams-in-a-string/
  - https://en.cppreference.com/w/cpp/container/array/operator_cmp
elaborate: Find All Anagrams in a String (LC 438) returns every start index in `s` of an anagram of `p`, by sliding this counter along `s`. Which two updates happen per step, and what replaces the final comparison?
requires:
  - stl-array-brace-zero
  - cpp-essentials/types-char-is-integer
  - stl-const-auto-param
---

```cpp
#include <array>
constexpr bool is_anagram(const auto& s, const auto& t) {
  std::array<int, 26> cnt{};
  for (char c : s) ++cnt[c - 'a'];
  for (char c : t) --cnt[c - 'a'];
  return cnt == std::array<int, 26>{};
}
```

---

**Letter histogram** for Valid Anagram (LC 242): is `t` a rearrangement
of the letters of `s`? Lowercase input. One
fixed array replaces two hash maps: no allocation, no hashing.

- `{}` zeroes the counts; without it they are indeterminate.
- `c - 'a'` maps `'a'..'z'` to 0..25; `cnt[c]` would index 97 and up.
- `std::array` compares element by element with `==`; a C array can't.
