---
id: stl-letter-count-chunk
kind: chunk
version: 1
level: 2
tags: [stl, counting, lc-242]
expose_ms: 7000
compile:
  harness: |
    #include <string_view>
    using namespace std::literals;
    static_assert(is_anagram("anagram"sv, "nagaram"sv));
    static_assert(!is_anagram("rat"sv, "car"sv));
    static_assert(!is_anagram("aab"sv, "abb"sv));
    static_assert(!is_anagram("ab"sv, "a"sv));
    int main() {}
requires:
  - cpp-basics/types-constexpr-catches-uninit
refs:
  - https://leetcode.com/problems/valid-anagram/
  - https://en.cppreference.com/w/cpp/container/array/operator_cmp
elaborate: LC 438 (find all anagrams) slides this counter along `s`. Which two updates happen per step, and what replaces the final comparison?
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

**Letter histogram** (LC 242, Valid Anagram; lowercase input). One
fixed array replaces two hash maps: no allocation, no hashing.

- `{}` zeroes the counts; without it they are indeterminate.
- `c - 'a'` maps `'a'..'z'` to 0..25; `cnt[c]` would index 97 and up.
- `std::array` compares element by element with `==`; a C array can't.

Compile-checked against LC 242's examples, so either loop may come
first. Dropping the `{}` or the `- 'a'` fails that check. (`const auto&`
lets the harness pass `string_view`s; on LeetCode it is `string s, t`.)
