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
    static_assert(merge3({{{1, 4, 7}, {2, 5, 8}, {0, 3, 9}}}) ==
                  std::array<int, 9>{0, 1, 2, 3, 4, 5, 7, 8, 9});
    static_assert(merge3({{{1, 2, 3}, {7, 8, 9}, {4, 5, 6}}}) ==
                  std::array<int, 9>{1, 2, 3, 4, 5, 6, 7, 8, 9});
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/algorithm/push_heap
  - https://en.wikipedia.org/wiki/K-way_merge_algorithm
---

Merge three sorted runs with a min-heap of `(value, run)` heads — the
inner loop of an external merge sort. Complete the value that replaces
the head just output.

```cpp
#include <algorithm>
#include <array>
#include <functional>
#include <utility>

using Runs = std::array<std::array<int, 3>, 3>;
constexpr std::array<int, 9> merge3(const Runs& runs) {
  std::array<std::size_t, 3> next{1, 1, 1};            // next unread per run
  std::array<std::pair<int, std::size_t>, 3> h{
      {{runs[0][0], 0}, {runs[1][0], 1}, {runs[2][0], 2}}};
  std::size_t n = 3;                                   // live heap entries
  std::ranges::make_heap(h, std::greater{});
  std::array<int, 9> out{};
  for (int& o : out) {
    std::pop_heap(h.begin(), h.begin() + n, std::greater{});
    const auto [v, r] = h[n - 1];
    o = v;
    if (next[r] == 3) { --n; continue; }               // run r exhausted
    h[n - 1].first = {{c1::runs[r][next[r]++]}};      // .second stays r
    std::push_heap(h.begin(), h.begin() + n, std::greater{});
  }
  return out;
}
```

---

The output came from run `r`, so run `r`'s next element is the only new
candidate: every other run's head is already in the heap. Each output is
one pop and one push, O(log k), so merging n items is O(n log k) and
needs only k heads in memory — which is why external sort can merge
hundreds of runs from disk in one pass.

Not advancing `next[r]` emits the same value again; taking the next
*run's* head (round-robin) breaks the invariant "one head per live run,
labelled with its run", and `runs[next[r]][r]` reads across runs. The
output is then no longer sorted.

A **loser tree** does the same job with one comparison per level instead
of a heap's two: each internal node stores the loser of its match, so
replacing the winner replays only the path from its leaf to the root.
That is what tuned external sorts use.
