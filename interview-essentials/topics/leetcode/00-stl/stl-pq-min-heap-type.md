---
id: stl-pq-min-heap-type
kind: code
version: 1
level: 2
tags: [stl, heaps, top-k, lc-215]
input: chips
choices:
  c1:
    - "std::priority_queue<int, std::vector<int>, std::greater<>>"
    - "std::priority_queue<int>"
    - "std::priority_queue<int, std::greater<int>>"
    - "std::priority_queue<int, std::greater<>>"
compile:
  harness: |
    #include <algorithm>
    constexpr int run(std::vector<int> nums, std::size_t k) {   // KeepK's ordering on a vector heap
      KeepK::value_compare c{};
      std::vector<int> h;
      for (int x : nums) {
        h.push_back(x);  std::push_heap(h.begin(), h.end(), c);
        if (h.size() > k) { std::pop_heap(h.begin(), h.end(), c);  h.pop_back(); }
      }
      return h.front();
    }
    static_assert(run({3, 2, 1, 5, 6, 4}, 2) == 5);
    static_assert(run({3, 2, 3, 1, 2, 4, 5, 5, 6}, 4) == 4);
    int main() { return kth_largest({1, 2}, 1); }
requires:
  - heap-min-comparator
refs:
  - https://leetcode.com/problems/kth-largest-element-in-an-array/
  - https://en.cppreference.com/w/cpp/container/priority_queue
elaborate: LC 703 (k-th largest in a stream) keeps the same heap alive between calls. What does `top()` mean there?
---

LC 215 asks for the k-th largest element in O(n log k): keep a heap
of the k largest values seen so far, dropping one whenever it holds
k + 1. Complete the heap's type.

```cpp
#include <functional>
#include <queue>
#include <vector>
using KeepK = {{c1::std\::priority_queue<int, std\::vector<int>, std\::greater<>>}};
int kth_largest(const std::vector<int>& nums, std::size_t k) {
  KeepK pq;
  for (int x : nums) { pq.push(x); if (pq.size() > k) pq.pop(); }
  return pq.top();
}
```

---

**"k largest" needs a min-heap.** The value to throw out when the heap
overflows is the *smallest* of the k + 1, so it must sit at `top()`;
what is left at the top at the end is the k-th largest. The default
`priority_queue<int>` is a max-heap: it pops the largest and returns
the k-th *smallest*. The parameters go element, container,
comparator, with no way to skip the middle one: `priority_queue<int,
greater<>>` makes `greater` the container and doesn't compile.
The harness replays `KeepK`'s comparator with `push_heap`/`pop_heap`,
which is what `priority_queue` is specified to do.
