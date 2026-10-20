---
id: stl-vector-paren-brace
kind: code
version: 1
level: 2
tags: [stl, initialization, lc-118]
input: chips
choices:
  c1:
    - "(i + 1, 1)"
    - "{i + 1, 1}"
    - "{i + 1}"
    - "(1, i + 1)"
compile:
  harness: |
    constexpr std::vector<int> flat(int rows) {   // g142 rejects a constexpr vector<vector> literal
      std::vector<int> f;
      for (const auto& r : generate(rows)) f.insert(f.end(), r.begin(), r.end());
      return f;
    }
    static_assert(flat(5) == std::vector<int>{1, 1, 1, 1, 2, 1, 1, 3, 3, 1, 1, 4, 6, 4, 1});
    static_assert(generate(5).size() == 5 && generate(5)[3].size() == 4);
    static_assert(flat(1) == std::vector<int>{1});
    int main() {}
refs:
  - https://leetcode.com/problems/pascals-triangle/
  - https://en.cppreference.com/w/cpp/container/vector/vector
  - https://en.cppreference.com/w/cpp/language/list_initialization
elaborate: What do `std::string s(3, 'x')` and `std::string s{3, 'x'}` each hold?
requires:
  - cpp-essentials/initialization-brace-prefers-initializer-list
  - cpp-essentials/vector-of-vectors
  - cpp-essentials/constexpr-fn-static-assert
---

Pascal's Triangle (LC 118): return its first `rows` rows. Row `i` has `i + 1` entries and its outer
entries are 1. Complete the row's initialiser.

```cpp
#include <vector>
constexpr std::vector<std::vector<int>> generate(int rows) {
  std::vector<std::vector<int>> tri;
  for (int i = 0; i < rows; ++i) {
    std::vector<int> row{{c1::(i + 1, 1)}};
    for (int j = 1; j < i; ++j) row[j] = tri[i - 1][j - 1] + tri[i - 1][j];
    tri.push_back(row);
  }
  return tri;
}
```

---

**Parentheses: `(count, value)` calls the sizing constructor.** Braces
pick the `initializer_list` constructor whenever the values can be
elements. `{i + 1, 1}` is always the two entries `[i + 1, 1]`: row 0
comes out `[1, 1]`. `{i + 1}` is one entry, so from row 2 the inner
loop writes out of range. `(1, i + 1)` is one copy of `i + 1`.
