---
id: str-bwt-from-suffix-array
kind: code
version: 1
level: 5
tags: [strings, indexing, compression]
input: chips
choices:
  c1: ["(sa[i] + 6) % 7", "sa[i]", "(sa[i] + 1) % 7", "sa[i] - 1"]
compile:
  harness: |
    constexpr std::array<int, 7> sa{6, 5, 3, 1, 0, 4, 2};
    static_assert(bwt("banana$", sa) ==
                  std::array<char, 7>{'a', 'n', 'n', 'b', '$', 'a', 'a'});
    constexpr std::array<int, 7> sa2{6, 4, 0, 2, 5, 1, 3};   // "abacab$"
    static_assert(bwt("abacab$", sa2) ==
                  std::array<char, 7>{'b', 'c', '$', 'b', 'a', 'a', 'a'});
    int main() {}
requires:
  - str-suffix-array
refs:
  - https://en.wikipedia.org/wiki/Burrows%E2%80%93Wheeler_transform
  - https://doi.org/10.1109/SFCS.2000.892127
---

The Burrows–Wheeler transform of a `$`-terminated string lists, in
suffix-array order, the character just before each suffix — wrapping
round for the suffix that starts at 0. Complete the index.

```cpp
#include <array>
#include <string_view>
constexpr std::array<char, 7> bwt(std::string_view s, std::array<int, 7> sa) {
  std::array<char, 7> out{};
  for (int i = 0; i < 7; ++i) out[i] = s[{{c1::(sa[i] + 6) % 7}}];
  return out;
}
```

---

The character before suffix `sa[i]` is at `sa[i] − 1`, and for the
whole string (`sa[i] == 0`) the predecessor wraps to the sentinel at
6. Adding n − 1 mod n is that wrap without a negative index: `sa[i] − 1`
reads `s[-1]`, which a constant expression rejects.

The transform groups characters by the context that follows them, so
`banana$` becomes `annb$aa`, with runs that compress well (bzip2). The
same column, plus rank counts, is the FM-index: substring search over a
compressed text.
