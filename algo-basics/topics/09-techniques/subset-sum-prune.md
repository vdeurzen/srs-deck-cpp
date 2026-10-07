---
id: technique-subset-sum-prune
kind: trace
version: 1
level: 2
tags: [backtracking, tracing]
requires:
  - technique-backtracking-state-space
probes:
  1: { nodes: "127" }
  2: { nodes: "9" }
refs:
  - https://doi.org/10.1145/321296.321300
  - https://en.wikipedia.org/wiki/Subset_sum_problem
---

`fits` asks whether some subset of the sorted items sums to `left`,
taking or skipping each item in turn. With `prune`, it gives up as soon
as the next item is already too big. No odd target is reachable from even
items. Each probe reads `nodes` after its line.

```cpp
int nodes = 0;
bool fits(const int* a, int n, int i, int left, bool prune) {
  ++nodes;
  if (left == 0) return true;
  if (i == n || (prune && a[i] > left)) return false;
  return fits(a, n, i + 1, left - a[i], prune)   // take a[i]
      || fits(a, n, i + 1, left, prune);         // skip a[i]
}

int main() {
  int a[] = {2, 4, 6, 8, 10, 12};
  fits(a, 6, 0, 7, false);              // @1
  nodes = 0; fits(a, 6, 0, 7, true);    // @2
}
```

---

Without pruning, a failed search visits the whole take/skip tree:
2⁷ − 1 = 127 nodes for 6 items. Because the items are sorted, `a[i] > left`
means no later item fits either, so the whole subtree is cut: 9 nodes.
The worst case is still exponential; pruning changes the constant you actually pay.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
