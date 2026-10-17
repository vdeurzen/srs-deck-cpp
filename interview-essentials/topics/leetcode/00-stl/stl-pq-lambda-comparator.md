---
id: stl-pq-lambda-comparator
kind: code
version: 1
level: 3
tags: [stl, heaps, top-k, lc-347]
input: chips
choices:
  c1:
    - "a.second > b.second"
    - "a.second < b.second"
    - "a.second >= b.second"
    - "a > b"
compile:
  harness: |
    #include <algorithm>
    constexpr bool keeps_two_most_frequent() {   // TopK's ordering on a vector heap, k = 2
      std::vector<P> h;
      for (P p : {P{1, 3}, P{2, 1}, P{3, 2}, P{4, 5}}) {
        h.push_back(p);  std::push_heap(h.begin(), h.end(), cmp);
        if (h.size() > 2) { std::pop_heap(h.begin(), h.end(), cmp);  h.pop_back(); }
      }
      std::sort(h.begin(), h.end());
      return h == std::vector<P>{{1, 3}, {4, 5}};
    }
    static_assert(keeps_two_most_frequent());
    static_assert(!cmp(P{7, 2}, P{9, 2}));   // equal counts: neither must come first
    int main() { pq.push({1, 1}); }
requires:
  - stl-pq-min-heap-type
  - cpp-essentials/stdalgo-comparator-strict
refs:
  - https://leetcode.com/problems/top-k-frequent-elements/
  - https://leetcode.com/problems/top-k-frequent-words/
  - https://en.cppreference.com/w/cpp/container/priority_queue
  - https://en.cppreference.com/w/cpp/named_req/Compare
elaborate: Top K Frequent Words (LC 692) returns the k most frequent words, most frequent first, equal counts in lexicographical order. How does the comparator change, and which way must the tie go?
---

Top K Frequent Elements (LC 347): return the `k` most frequent values
in `nums`, in any order. After counting, the heap holds `(value, count)` pairs and pops
whenever it holds k + 1, so the k most frequent values survive.
Complete the comparator.

```cpp
#include <queue>
#include <utility>
#include <vector>
using P = std::pair<int, int>;   // (value, count)
inline constexpr auto cmp = [](const P& a, const P& b) { return {{c1::a.second > b.second}}; };
std::priority_queue<P, std::vector<P>, decltype(cmp)> pq(cmp);   // in a solution: local `auto cmp`
```

---

**`>` on the count: the least frequent pair must be on top to be
popped.** A `priority_queue` comparator answers "does `a` rank below
`b`?", so `<` puts the most frequent on top and throws the answer away.
`>=` claims a tie ranks below itself, which breaks strict weak ordering
(undefined behaviour). `a > b` compares the *value* first. The type
goes in the template argument list as `decltype(cmp)`; the object goes
to the constructor.
