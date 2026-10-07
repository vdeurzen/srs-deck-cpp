---
id: tree-red-black-check-code
kind: code
version: 1
level: 3
tags: [trees, red-black, invariants, recursion]
requires:
  - tree-red-black-invariant
  - tree-height-code
input: chips
choices:
  c1: ["l + (t.red[v] ? 0 : 1)", "l + 1", "l + (t.red[v] ? 1 : 0)", "l"]
compile:
  harness: |
    struct T { int key[5], left[5], right[5]; bool red[5]; };
    //         10B             10B
    //        /   \           /   \
    //      5R     15B      5B     15B
    //     /  \            /  \
    //   3B    7B        3B    7B
    constexpr T good{{10, 5, 15, 3, 7}, {1, 3, -1, -1, -1}, {2, 4, -1, -1, -1},
                     {false, true, false, false, false}};
    constexpr T bad{{10, 5, 15, 3, 7}, {1, 3, -1, -1, -1}, {2, 4, -1, -1, -1},
                    {false, false, false, false, false}};
    static_assert(black_height(good, 0) == 2);
    static_assert(black_height(bad, 0) == -1);
    int main() {}
refs:
  - https://doi.org/10.1109/SFCS.1978.3
  - https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Properties
---

Check one red-black rule: every path down from a node meets the same
number of black nodes. Count the node itself, and 0 for an empty link.
Complete the count passed up to the parent.

```cpp
// Black nodes on every path from v down to an empty link, or -1 if the
// paths disagree somewhere below v. (Red-red is checked elsewhere.)
constexpr int black_height(const auto& t, int v) {
  if (v < 0) return 0;
  const int l = black_height(t, t.left[v]);
  const int r = black_height(t, t.right[v]);
  if (l < 0 || r < 0 || l != r) return -1;
  return {{c1::l + (t.red[v] ? 0 : 1)}};
}
```

---

Both subtrees agree on their black count, so either serves; the node
adds one only if it is **black**. Red nodes are free, which is the slack
that lets a red-black tree absorb inserts without rebalancing every time.

`l + 1` counts every node, which is height, and rejects the valid tree:
its left side holds an extra (red) node. Like `tree-height-code`, this
is a postorder walk, O(n).
