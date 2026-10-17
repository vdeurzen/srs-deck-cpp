---
id: dp-word-break-code
kind: code
version: 1
level: 3
tags: [dynamic-programming, strings, lc-139]
input: chips
choices:
  c1: ["dp[i - w.size()]", "dp[i - 1]", "true", "dp[w.size()]"]
compile:
  harness: |
    static_assert(word_break("leetcode", {"leet", "code"}));                          // LC 139, example 1
    static_assert(word_break("applepenapple", {"apple", "pen"}));                     // example 2
    static_assert(!word_break("catsandog", {"cats", "dog", "sand", "and", "cat"}));   // example 3
    static_assert(word_break("aaab", {"a", "ab"}));
    static_assert(!word_break("ab", {"b"}));
    int main() {}
requires:
  - technique-dp-state
  - technique-memo-vs-table
refs:
  - https://leetcode.com/problems/word-break/
  - https://leetcode.com/problems/word-break-ii/
  - https://en.cppreference.com/w/cpp/string/basic_string_view/ends_with
elaborate: With a thousand dictionary words, none longer than 20 characters, what would you loop over instead of `dict`, and what would you look each piece up in?
---

Word Break (LC 139): can `s` be split into a sequence of dictionary
words, each reusable? `dp[i]` says whether the first `i` characters
can. Complete the condition that lets word `w` end the prefix.

```cpp
#include <bits/stdc++.h>
constexpr bool word_break(std::string_view s, std::vector<std::string_view> dict) {
  std::vector<bool> dp(s.size() + 1);
  dp[0] = true;                                  // the empty prefix
  for (std::size_t i = 1; i <= s.size(); ++i)
    for (std::string_view w : dict)
      if (s.substr(0, i).ends_with(w) && {{c1::dp[i - w.size()]}}) dp[i] = true;
  return dp[s.size()];
}
```

---

**`dp[i - w.size()]`: the last word fits only if what comes before it already splits.**
That cell is shorter, so the upward loop has filled it. O(n · |dict| ·
L) for words up to length L.

`true` accepts any prefix that merely ends in a word: "catsandog" ends
in "dog", yet "catsan" does not split. `dp[i - 1]` looks one character
back, whatever the word's length; `dp[w.size()]` measures from the
wrong end.
