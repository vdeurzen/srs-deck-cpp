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
elaborate: Say how you would break ties so that words of equal length come out alphabetically.
requires:
  - stdalgo-sort-basics
  - constexpr-fn-static-assert
refs:
  - https://en.cppreference.com/w/cpp/algorithm/sort
---

A `std::string_view` is a read-only view of some characters, with
`size()` and `<` like a string. Complete the comparator so `sort` leaves `w`
as `fig`, `pear`, `banana`.

```cpp
#include <algorithm>
#include <string_view>
#include <vector>
constexpr bool sorted_as_expected() {
    std::vector<std::string_view> w{"pear", "fig", "banana"};
    std::sort(w.begin(), w.end(), [](std::string_view a, std::string_view b) {
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
