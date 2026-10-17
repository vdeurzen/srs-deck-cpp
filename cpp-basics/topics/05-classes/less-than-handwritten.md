---
id: class-less-than-handwritten
kind: code
version: 1
level: 2
tags: [classes, comparisons, operators]
input: chips
choices:
  c1:
    - "month < o.month || (month == o.month && day < o.day)"
    - "month < o.month && (month == o.month || day < o.day)"
    - "month < o.month || (month != o.month && day < o.day)"
    - "month < o.month || day < o.day"
compile:
  harness: |
    static_assert(Date{1, 31} < Date{2, 1});
    static_assert(!(Date{3, 1} < Date{2, 9}));
    static_assert(Date{5, 2} < Date{5, 9});
    static_assert(!(Date{5, 9} < Date{5, 9}));
    int main() {}
requires:
  - cpp-essentials/const-member-on-const-ref
refs:
  - https://en.cppreference.com/w/cpp/language/operators#Comparison_operators
---

Complete `operator<` so that, of two `Date`s, the earlier calendar
date comes first.

```cpp
struct Date {
    int month, day;
    constexpr bool operator<(const Date& o) const {
        return {{c1::month < o.month || (month == o.month && day < o.day)}};
    }
};
```

---

This is **lexicographic** order: the first member decides, and the next is
consulted only on a tie. `month < o.month || day < o.day` puts 1 March before
9 February, because the day is compared even when the months differ.
