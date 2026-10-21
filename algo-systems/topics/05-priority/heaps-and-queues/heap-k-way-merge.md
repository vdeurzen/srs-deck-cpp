---
id: heap-k-way-merge
kind: code
version: 1
level: 4
requires:
  - heap-std-library-traps
  - heap-pop-heap-no-remove
tags: [heaps, sorting, external-memory]
input: chips
choices:
  c1:
    - "runs[r][next[r]++]"
    - "runs[r][next[r]]"
    - "runs[(r + 1) % 3][next[(r + 1) % 3]++]"
    - "runs[next[r]++][r]"
compile:
  harness: |
    #include <algorithm>
    #include <functional>
    constexpr std::array<int, 9> merge3(const Runs& runs) {
      std::array<std::size_t, 3> next{1, 1, 1};
      std::array<Head, 3> h{{{runs[0][0], 0}, {runs[1][0], 1}, {runs[2][0], 2}}};
      std::size_t n = 3;
      std::ranges::make_heap(h, std::greater{});
      std::array<int, 9> out{};
      for (int& o : out) {
        std::pop_heap(h.begin(), h.begin() + n, std::greater{});
        o = h[n - 1].first;
        if (refill(runs, next, h[n - 1]))
          std::push_heap(h.begin(), h.begin() + n, std::greater{});
        else
          --n;
      }
      return out;
    }
    static_assert(merge3({{{1, 4, 7}, {2, 5, 8}, {0, 3, 9}}}) ==
                  std::array<int, 9>{0, 1, 2, 3, 4, 5, 7, 8, 9});
    static_assert(merge3({{{1, 2, 3}, {7, 8, 9}, {4, 5, 6}}}) ==
                  std::array<int, 9>{1, 2, 3, 4, 5, 6, 7, 8, 9});
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/algorithm/push_heap
  - https://en.wikipedia.org/wiki/K-way_merge_algorithm
---

Merge three sorted runs with a min-heap of `(value, run)` heads, the
inner loop of an external merge sort: *pop* the smallest head, *output*
it, *refill* that slot, *push* it back. `next[r]` is run `r`'s first
unread index. Complete the refill value.

```cpp
#include <array>
#include <utility>
using Runs = std::array<std::array<int, 3>, 3>;
using Head = std::pair<int, std::size_t>;                  // (value, run)
constexpr bool refill(const Runs& runs, std::array<std::size_t, 3>& next, Head& h) {
  const std::size_t r = h.second;
  if (next[r] == 3) return false;                          // run r exhausted
  h.first = {{c1::runs[r][next[r]++]}};
  return true;
}
```

---

**Only run `r`'s next element is a new candidate; advance `next[r]`.**
Every other run's head is already in the heap. Each output costs one
pop and one push, O(log k), so merging n items is O(n log k) with only
k heads in memory.

Without `++` the same value repeats; another run's head breaks "one
head per live run, labelled with its run"; `runs[next[r]][r]` reads
across runs. A **loser tree** needs one comparison per level instead of
two; tuned external sorts use it.
