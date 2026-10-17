---
id: sort-merge-stable-code
kind: code
version: 1
level: 2
tags: [sorting, merge-sort, stability]
input: chips
choices:
  c1:
    - "L[i].key <= R[j].key"
    - "L[i].key < R[j].key"
    - "R[j].key <= L[i].key"
    - "L[i].key >= R[j].key"
compile:
  harness: |
    constexpr std::array<Rec, 3> kL{{{1, 'a'}, {3, 'b'}, {5, 'c'}}};
    constexpr std::array<Rec, 3> kR{{{1, 'd'}, {3, 'e'}, {4, 'f'}}};
    static_assert(merge(kL, kR) == std::array<Rec, 6>{
        {{1, 'a'}, {1, 'd'}, {3, 'b'}, {3, 'e'}, {4, 'f'}, {5, 'c'}}});
    int main() {}
requires:
  - sort-merge-space
  - sort-stable-meaning
refs:
  - https://en.cppreference.com/w/cpp/algorithm/merge
  - https://en.wikipedia.org/wiki/Merge_sort
---

`L` came from earlier in the input than `R`. Complete the test so the
merge is sorted by `key` and keeps equal keys in input order.

```cpp
#include <array>
#include <cstddef>
struct Rec { int key; char tag; bool operator==(const Rec&) const = default; };
constexpr std::array<Rec, 6> merge(std::array<Rec, 3> L, std::array<Rec, 3> R) {
  std::array<Rec, 6> out{};
  std::size_t i = 0, j = 0, k = 0;
  while (i < 3 && j < 3) out[k++] = {{c1::L[i].key <= R[j].key}} ? L[i++] : R[j++];
  while (i < 3) out[k++] = L[i++];
  while (j < 3) out[k++] = R[j++];
  return out;
}
```

---

On a tie the left run must win, because its element came first in the
input. `<` hands the tie to `R` and outputs `(1, d)` before `(1, a)`:
still sorted, no longer stable. The other two take the larger head
first. This one character is what makes merge sort stable.
