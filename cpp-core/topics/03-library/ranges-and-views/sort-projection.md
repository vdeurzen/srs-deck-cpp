---
id: ranges-sort-projection
kind: code
version: 1
level: 3
tags: [ranges]
input: chips
choices:
  c1: ["&Person::age", "&Person", "Person::age", "std::identity{}"]
compile:
  harness: |
    static_assert(sorted_by_age());
    int main() {}
requires:
  - callables-std-invoke-member
refs:
  - https://en.cppreference.com/w/cpp/algorithm/ranges/sort
---

Sort `people` by age without writing a comparator, using `std::ranges::sort`'s
**projection** parameter.

```cpp
#include <algorithm>
#include <array>
struct Person { int age; };
constexpr bool sorted_by_age() {
    std::array<Person, 3> people{{ {30}, {10}, {20} }};
    std::ranges::sort(people, {}, {{c1::&Person\::age}});
    return people[0].age == 10 && people[1].age == 20 && people[2].age == 30;
}
```

---

The third argument is a projection applied to each element before the
(here, default `{}` = `std::ranges::less`) comparator sees it. A
pointer-to-member, `&Person::age`, is `std::invocable` on a `Person` and
yields its `age`, so `std::ranges::sort` compares ages without a
hand-written `[](auto& a, auto& b){ return a.age < b.age; }` lambda —
most range algorithms that compare or test elements accept one.
