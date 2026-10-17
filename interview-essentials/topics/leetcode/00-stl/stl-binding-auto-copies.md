---
id: stl-binding-auto-copies
kind: basic
version: 1
level: 2
tags: [stl, structured-bindings, misconception, lc-49]
requires:
  - cpp-essentials/iter-range-for-alias
refs:
  - https://leetcode.com/problems/group-anagrams/
  - https://en.cppreference.com/w/cpp/language/structured_binding
  - https://en.cppreference.com/w/cpp/language/range-for
elaborate: Go's `for k, v := range m` hands you copies too. Where in your own loops does `auto [a, b]` copy something that owns heap memory?
---

Group Anagrams (LC 49): group the words that are anagrams of each
other. A solution keys each group on its sorted letters and, before
returning, sorts each group:

```cpp
std::map<std::string, std::vector<std::string>> groups;
// filled: "aet" -> {"tea", "eat", "ate"}
for (auto [key, words] : groups) std::ranges::sort(words);
```

## What does `groups["aet"]` hold after the loop?

---

**Still `{tea, eat, ate}`: `words` belongs to a copy of the element.**
A structured binding declares one hidden variable, here `auto e = *it;`,
and `key`, `words` name its members. The `auto` applies to `e`, so each
turn copies a string and a vector, then sorts the copy. Write
`auto& [key, words]`.

(Run under GCC 16.2.)
