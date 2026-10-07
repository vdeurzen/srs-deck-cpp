---
id: db-merge-join-rewind
kind: code
version: 1
level: 4
tags: [databases, joins, sorting]
input: chips
choices:
  c1: ["j = mark", "j = mark + 1", "mark = j", "--j"]
compile:
  harness: |
    static_assert(merge_join(std::array{1, 2, 2, 4}, std::array{2, 2, 3, 4}) == 5);
    static_assert(merge_join(std::array{3, 3, 3}, std::array{3, 3}) == 6);
    static_assert(merge_join(std::array{1, 5}, std::array{2, 5, 5}) == 2);
    int main() {}
requires:
  - db-sort-merge-join
refs:
  - https://15445.courses.cs.cmu.edu/
  - https://dl.acm.org/doi/10.1145/582095.582099
elaborate: How many times does the inner side get read when both inputs are 1 000 copies of the same key?
---

A merge join over two sorted inputs counts its output rows. Complete
what happens when the next outer row repeats the key just matched.

```cpp
#include <array>
constexpr int merge_join(const auto& r, const auto& s) {
  int out = 0; std::size_t i = 0, j = 0;
  while (i < r.size() && j < s.size()) {
    if (r[i] < s[j]) ++i;
    else if (r[i] > s[j]) ++j;
    else {
      const std::size_t mark = j;
      while (j < s.size() && s[j] == r[i]) { ++out; ++j; }
      if (++i < r.size() && r[i] == s[mark]) {{c1::j = mark}};
    }
  }
  return out;
}
```

---

**Rewind the inner cursor to the start of its matching group.** With
duplicates on both sides, every outer copy must meet every inner copy.
Without the rewind each group is matched once and rows are silently
lost. So the merge is linear only when one side's key is unique; with
duplicates on both its cost is |R| + |S| + |output|.
