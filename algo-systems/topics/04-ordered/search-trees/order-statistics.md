---
id: ordered-order-statistics
kind: basic
version: 1
level: 4
tags: [trees, databases, ranking]
refs:
  - https://en.wikipedia.org/wiki/Order_statistic_tree
  - https://en.cppreference.com/w/cpp/algorithm/nth_element
---

## How do you answer "what is the rank of this key" and "what is the k-th key" in O(log n), and where does that show up in real systems?

---

Augment each node with the **size of its subtree**. Then:

- **Select(k)**: at a node, if the left subtree has `L` elements and
  `k < L` go left; if `k == L` this node is the answer; otherwise go
  right looking for `k − L − 1`. One root-to-leaf path.
- **Rank(key)**: descend as for a search, adding `L + 1` every time you
  step right. Again one path.

The maintenance cost is a size update along the insertion path and,
crucially, a **fixed-up size after each rotation** — which is why this
augmentation is easy in a red-black tree you own and impossible in
`std::map`, whose nodes you cannot extend. (The usual workaround in
competitive C++ is GNU's `__gnu_pbds::tree` with
`tree_order_statistics_node_update`.) The same augmentation pattern
generalises: store any subtree aggregate — sum, min, max, count of a
predicate — and any of them can be queried over a range in O(log n).

Where it appears:

- **Databases**: `LIMIT n OFFSET m` over an index without scanning `m`
  rows; percentile and median maintenance; `ROW_NUMBER()` over an
  ordered index.
- **Exchanges and order books**: the depth of a price level (how much
  volume is ahead of this order) is a rank query, and it has to be
  answered per event.
- **Schedulers and load balancers**: weighted random choice is a
  select query against a Fenwick tree of weights — find the slot where
  the running weight passes a random threshold.

Know the cheaper alternatives: for a *static* array, a sorted array
plus `lower_bound` gives rank in O(log n) with no augmentation, and
`std::nth_element` gives the k-th element in expected O(n) without
sorting. Augmented trees earn their keep only when the data changes and
both queries and updates are frequent.
