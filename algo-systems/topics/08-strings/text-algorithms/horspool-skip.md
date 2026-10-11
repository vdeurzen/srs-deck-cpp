---
id: str-horspool-skip
kind: code
version: 1
level: 4
tags: [strings, scanning]
input: chips
choices:
  c1: ["shift[(unsigned char)t[i + m - 1]]", "shift[(unsigned char)t[i]]", "shift[(unsigned char)p[m - 1]]", "shift[(unsigned char)t[i + m]]"]
compile:
  harness: |
    constexpr std::array<int, 2> run(std::string_view t, std::string_view p) {
      int tries = 0;
      const int at = horspool(t, p, tries);
      return {at, tries};
    }
    static_assert(run("here is a simple example", "example") == std::array<int, 2>{17, 5});
    static_assert(run("abcabcabd", "abd") == std::array<int, 2>{6, 3});
    static_assert(run("abracadabra", "cad") == std::array<int, 2>{4, 3});
    int main() {}
requires:
  - str-naive-matching
refs:
  - https://doi.org/10.1002/spe.4380100608
  - https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore%E2%80%93Horspool_algorithm
---

`shift[c]` is the distance from `c`'s last occurrence in `p[0..m-2]`
to the end of `p`, or `m` if `c` is absent. Complete the step between
alignments.

```cpp
#include <array>
#include <string_view>
constexpr int horspool(std::string_view t, std::string_view p, int& tries) {
  const std::size_t m = p.size();
  std::array<std::size_t, 256> shift;
  shift.fill(m);
  for (std::size_t j = 0; j + 1 < m; ++j) shift[(unsigned char)p[j]] = m - 1 - j;
  for (std::size_t i = 0; i + m <= t.size(); i += {{c1::shift[(unsigned char)t[i + m - 1]]}}) {
    ++tries;
    if (t.substr(i, m) == p) return static_cast<int>(i);
  }
  return -1;
}
```

---

The text character under the pattern's **last** position decides the
jump: the pattern slides until its rightmost earlier copy of that
character lines up, or past it entirely. On "here is a simple example"
that is 5 alignments instead of 18. `t[i]` keys the table on the
wrong character; `p[m - 1]` is always `m` and skips real matches;
`t[i + m]` is Sunday's variant, which needs a table built over all
of `p`. The pattern's last character is excluded from the
table, so a shift is never 0.
