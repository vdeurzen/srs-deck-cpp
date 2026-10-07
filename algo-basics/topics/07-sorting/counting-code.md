---
id: sort-counting-code
kind: code
version: 1
level: 2
tags: [sorting, counting-sort, stability]
input: chips
choices:
  c1:
    - "for (int i = 5; i >= 0; --i)"
    - "for (int i = 0; i < 6; ++i)"
    - "for (int i = 5; i > 0; --i)"
    - "for (int i = 6; i > 0; --i)"
compile:
  harness: |
    constexpr std::array<Rec, 6> kIn{
        {{2, 'a'}, {0, 'b'}, {2, 'c'}, {1, 'd'}, {0, 'e'}, {3, 'f'}}};
    static_assert(counting_sort(kIn) == std::array<Rec, 6>{
        {{0, 'b'}, {0, 'e'}, {1, 'd'}, {2, 'a'}, {2, 'c'}, {3, 'f'}}});
    int main() {}
requires:
  - sort-counting-idea
  - sort-stable-meaning
  - linear-prefix-sum-range
refs:
  - https://en.wikipedia.org/wiki/Counting_sort
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
---

Keys are in `[0, 4)`. After the prefix sum, `count[k]` is one past the
last slot for key `k`. Complete the placement loop's header so the sort
is stable.

```cpp
#include <array>
struct Rec { int key; char tag; bool operator==(const Rec&) const = default; };
constexpr std::array<Rec, 6> counting_sort(const std::array<Rec, 6>& in) {
  std::array<int, 4> count{};
  for (const Rec& r : in) ++count[r.key];
  for (int k = 1; k < 4; ++k) count[k] += count[k - 1];
  std::array<Rec, 6> out{};
  {{c1::for (int i = 5; i >= 0; --i)}} out[--count[in[i].key]] = in[i];
  return out;
}
```

---

Each key's slots are filled from the back (`--count`), so the input
must be walked from the back too: the last `2` goes last. Walking
forwards puts `(2, c)` before `(2, a)`: sorted, but reversed within each
key. `i > 0` never places `in[0]`; `i = 6` reads past the end.
