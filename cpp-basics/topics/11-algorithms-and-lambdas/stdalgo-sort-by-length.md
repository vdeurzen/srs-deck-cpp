---
id: stdalgo-sort-by-length
kind: code
version: 1
level: 2
tags: [algorithms, lambdas, sorting]
input: chips
choices:
  c1: ["a.size() < b.size()", "a < b", "a.size() > b.size()"]
compile:
  harness: |
    static_assert(sorted_as_expected());
    int main() {}
requires:
  - stdalgo-lambda-syntax
refs:
  - https://en.cppreference.com/w/cpp/algorithm/sort
---

Complete the comparator so `sort` orders `w` by `size()`, ascending.

```cpp
#include <algorithm>
#include <string>
#include <vector>
constexpr bool sorted_as_expected() {
    std::vector<std::string> w{"pear", "fig", "banana"};
    std::sort(w.begin(), w.end(), [](const std::string& a, const std::string& b) {
        return {{c1::a.size() < b.size()}};
    });
    return w[0] == "fig" && w[1] == "pear" && w[2] == "banana";
}
```

---

`std::sort` asks the comparator one question: "must `a` come before `b`?"
Answering "is `a` shorter?" gives ascending size. Without a comparator,
`sort` uses `<`, which for strings is alphabetical (banana, fig, pear);
`>` on the sizes gives descending size.
