---
id: ordered-augment-rotation
kind: basic
version: 1
level: 4
requires:
  - ordered-order-statistics
  - ordered-balance-families
tags: [trees, ranking]
refs:
  - https://gcc.gnu.org/onlinedocs/libstdc++/ext/pb_ds/tree_based_containers.html
  - https://en.cppreference.com/w/cpp/container/map
---

## You add subtree sizes to a red-black tree. Besides the nodes on the insertion path, which step must also repair them?

---

**Every rotation: the two rotated nodes' subtrees change, so their sizes must be recomputed.**

That is why `std::map` cannot be augmented: its rotations are private,
with nowhere to hook the fix. GNU's `__gnu_pbds::tree` with `tree_order_statistics_node_update`
exposes exactly that hook.
