---
id: tree-rotation-code
kind: code
version: 1
level: 2
tags: [trees, rotations]
requires:
  - tree-rotation
input: chips
choices:
  c1:
    - "t[y].left = t[x].right;"
    - "t[y].left = t[x].left;"
    - "t[y].right = t[x].right;"
    - "t[x].right = t[y].left;"
compile:
  harness: |
    #include <array>
    struct Node { int key, left, right; };
    constexpr int fill(const std::array<Node, 5>& t, int v, std::array<int, 5>& out, int n) {
      if (v < 0) return n;
      n = fill(t, t[v].left, out, n);
      out[n++] = t[v].key;
      return fill(t, t[v].right, out, n);
    }
    struct After { std::array<int, 5> in; int root, rootLeft, yLeft; };
    constexpr After rotated() {
      //  index:   0 = A    1 = x      2 = B    3 = y     4 = C
      std::array<Node, 5> t{{{1, -1, -1}, {2, 0, 2}, {3, -1, -1}, {4, 1, 4}, {5, -1, -1}}};
      const int r = rotate_right(t, 3);
      std::array<int, 5> in{};
      fill(t, r, in, 0);
      return {in, t[r].key, t[t[r].left].key, t[3].left};
    }
    static_assert(rotated().in == std::array<int, 5>{1, 2, 3, 4, 5});
    static_assert(rotated().root == 2 && rotated().rootLeft == 1);
    static_assert(rotated().yLeft == 2);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Tree_rotation
---

Rotate right at `y`: its left child `x` becomes the subtree's root, as in
the drawing. Complete the missing link.

```cpp
//        y                x
//       / \              / \
//      x   C    ==>     A   y
//     / \                  / \
//    A   B                B   C
// t[v].left, t[v].right: child indices, -1 for none.
// Returns the index of the subtree's new root.
constexpr int rotate_right(auto& t, int y) {
  const int x = t[y].left;
  {{c1::t[y].left = t[x].right;}}
  t[x].right = y;
  return x;
}
```

---

x's right link is about to point at y, so B must be rehomed first, and
the only free slot is y's left, which pointed at x. Order matters: set
`t[x].right = y` first and B is lost.

The caller still has to point y's old parent (or the root) at the
returned x: the third link. `t[x].right = t[y].left` makes x its own
child, a cycle.
