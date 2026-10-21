---
id: sort-insertion-code
kind: code
version: 1
level: 2
tags: [sorting, insertion-sort, stability]
input: chips
choices:
  c1:
    - "j > 0 && a[j - 1].key > x.key"
    - "j > 0 && a[j - 1].key >= x.key"
    - "a[j - 1].key > x.key && j > 0"
    - "j > 1 && a[j - 1].key > x.key"
compile:
  harness: |
    constexpr std::array<Rec, 5> kIn{{{3, 'a'}, {1, 'b'}, {3, 'c'}, {2, 'd'}, {1, 'e'}}};
    static_assert(insertion_sort(kIn) ==
                  std::array<Rec, 5>{{{1, 'b'}, {1, 'e'}, {2, 'd'}, {3, 'a'}, {3, 'c'}}});
    int main() {}
requires:
  - sort-insertion-trace
  - interview-essentials/sort-stable-meaning
elaborate: Why does `std::stable_sort` matter when you sort records by a second key after sorting them by a first?
refs:
  - https://en.cppreference.com/w/cpp/algorithm/stable_sort
  - https://en.wikipedia.org/wiki/Insertion_sort
---

Complete the loop condition so `insertion_sort` sorts by `key` and
records with equal keys keep their input order.

```cpp
#include <array>
struct Rec { int key; char tag; bool operator==(const Rec&) const = default; };
constexpr std::array<Rec, 5> insertion_sort(std::array<Rec, 5> a) {
  for (int i = 1; i < 5; ++i) {
    const Rec x = a[i];  int j = i;
    while ({{c1::j > 0 && a[j - 1].key > x.key}}) { a[j] = a[j - 1]; --j; }
    a[j] = x;
  }
  return a;
}
```

---

Strict `>` stops at the first equal key, so `x` lands **after** the
records equal to it: stable. `>=` walks past equal keys and swaps
`(1, b)` behind `(1, e)`. Testing `a[j - 1]` before `j > 0` reads
`a[-1]`, out of bounds, when `x` is the new minimum. `j > 1` never
moves anything into slot 0.
