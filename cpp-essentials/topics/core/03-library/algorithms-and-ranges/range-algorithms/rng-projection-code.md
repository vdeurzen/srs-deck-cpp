---
id: rng-projection-code
kind: code
version: 1
level: 3
tags: [algorithms, ranges]
input: chips
choices:
  c1:
    - "&Item::price"
    - "Item::price"
    - "&Item"
    - "[](Item a, Item b) { return a.price < b.price; }"
compile:
  harness: |
    static_assert(priciest({{1, 5}, {2, 9}, {3, 4}}) == 2);
    static_assert(priciest({{4, 7}, {5, 7}}) == 4);
    static_assert(priciest({{6, 3}}) == 6);
    int main() {}
requires:
  - rng-member-pointer-search
  - qry-spread-code
elaborate: Say how this call changes if you want the cheapest item instead, and why the projection stays the same.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/ranges/max_element
  - https://en.cppreference.com/w/cpp/language/pointer#Pointers_to_data_members
---

`items` is never empty. Complete the call so `priciest` returns the id of
the item with the highest `price` (the first one, on a tie), comparing
prices with the default `<`.

```cpp
#include <algorithm>
#include <vector>
struct Item { int id; int price; };
constexpr int priciest(std::vector<Item> items) {
    auto it = std::ranges::max_element(items, {}, {{c1::&Item\::price}});
    return (*it).id;
}
```

---

**`&Item::price` is a projection mapping each `Item` to its price.**
`Item::price` without `&` names a member with no object, which doesn't
compile. `&Item` is not an expression at all. The closure object taking two
`Item`s is a comparator, so in the projection slot it is called with one element and
fails.
