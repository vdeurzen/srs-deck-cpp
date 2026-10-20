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
    constexpr bool tags_are(std::vector<Rec> v, const char* want) {
      for (int k = 0; k < 6; ++k) if (v[k].tag != want[k]) return false;
      return true;
    }
    static_assert(tags_are(merge({{1, 'a'}, {3, 'b'}, {5, 'c'}},
                                 {{1, 'd'}, {3, 'e'}, {4, 'f'}}), "adbefc"));
    static_assert(tags_are(merge({{2, 'a'}, {2, 'b'}, {7, 'c'}},
                                 {{2, 'd'}, {6, 'e'}, {7, 'f'}}), "abdecf"));
    int main() {}
requires:
  - sort-merge-idea
  - sort-stable-meaning
  - cpp-essentials/class-struct-members
  - cpp-essentials/vector-basics
refs:
  - https://en.cppreference.com/w/cpp/algorithm/merge
  - https://en.wikipedia.org/wiki/Merge_sort
elaborate: Where would a sort that silently reorders equal keys break a result you rely on, such as rows sorted twice by different columns?
---

`L` came from earlier in the input than `R`. Complete the test so the
merge is sorted by `key` and keeps equal keys in input order
(`constexpr` lets the compiler run it).

```cpp
#include <vector>
struct Rec { int key; char tag; };
constexpr std::vector<Rec> merge(std::vector<Rec> L, std::vector<Rec> R) {
  std::vector<Rec> out;
  int i = 0, j = 0;
  while (i < 3 || j < 3)
    if (j == 3 || (i < 3 && {{c1::L[i].key <= R[j].key}})) { out.push_back(L[i]); ++i; }
    else { out.push_back(R[j]); ++j; }
  return out;
}
```

---

On a tie the left run must win, because its element came first in the
input. `<` hands the tie to `R` and outputs `(1, d)` before `(1, a)`:
still sorted, no longer stable. The other two take the larger head
first. This one character is what makes merge sort stable.
