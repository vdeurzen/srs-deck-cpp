---
id: heap-top-k
kind: basic
version: 1
level: 3
requires:
  - heap-vocabulary
tags: [heaps, selection, databases]
refs:
  - https://en.cppreference.com/w/cpp/algorithm/partial_sort
  - https://en.cppreference.com/w/cpp/algorithm/nth_element
---

## Three ways to take the top k of n items. What is each one's cost, and when is each right?

---

**Sort and take k** — O(n log n), one line, and the right answer when n
is small or you needed the sort anyway. Do not be embarrassed by it: for
n in the thousands it often beats the clever versions, because
`std::sort` is a tuned, branch-predicted, cache-friendly loop and the
alternatives are not.

**A bounded min-heap of size k** — O(n log k) time and **O(k) space**,
one pass, and it works on a *stream* you cannot store or re-read. Keep a
min-heap of the best k so far; for each new item, compare against the
root and replace it if larger. The comparison is the common case and the
sift is rare when the data is not adversarially ordered, so the
practical cost is close to n comparisons.

**Quickselect / `nth_element`** — expected O(n), the asymptotic winner,
and it only works on an array you own and may reorder. `nth_element`
partitions so the k-th element is in place with everything smaller
before it (unordered); `partial_sort` gives you the top k *in order* in
O(n log k).

Choosing between them:

- Streaming, k small, n unknown or huge → bounded heap. This is how
  "top 10 heavy hitters" is computed over a log, and it pairs naturally
  with a count-min sketch for the counts.
- Array in memory, need the k items but not sorted → `nth_element`.
- Need them sorted → `partial_sort`, or `nth_element` then sort the k
  prefix (usually the fastest, since sorting k ≪ n items is noise).
- Distributed → each shard computes its own top k and sends k items;
  the merge is a k-way heap. The correctness argument is that an item
  in the global top k must be in some shard's local top k — which holds
  for maxima, and **not** for aggregates like sums, where a value
  spread thinly across shards can win globally while being nobody's
  local top k.
