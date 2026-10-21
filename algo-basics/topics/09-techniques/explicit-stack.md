---
id: technique-explicit-stack
kind: code
version: 1
level: 2
tags: [recursion]
requires:
  - interview-essentials/technique-recursion-depth
input: chips
choices:
  c1: ["!todo.empty()", "todo.size() > 1", "sum == 0", "todo.back() != -1"]
compile:
  harness: |
    struct Node { int value, left, right; };
    using T = std::vector<Node>;
    static_assert(tree_sum(T{{1, 1, 2}, {2, -1, -1}, {3, -1, -1}}) == 6);
    static_assert(tree_sum(T{{1, 1, -1}, {2, 2, -1}, {4, -1, -1}}) == 7);  // a chain
    static_assert(tree_sum(T{{5, -1, -1}}) == 5);
    int main() {}
elaborate: Which recursive function you have written could meet input deep enough to overflow the stack, and what would this rewrite cost you?
refs:
  - https://en.wikipedia.org/wiki/Depth-first_search#Pseudocode
  - https://en.cppreference.com/w/cpp/container/vector
---

A recursive tree walk overflows the stack on a tree a million levels
deep. This version keeps its pending work in a `std::vector` on the heap
instead. Node `t[i]` has a `value` and child indices `left` and `right`,
-1 for none. Complete the loop condition.

```cpp
#include <vector>
constexpr int tree_sum(const auto& t) {
  std::vector<int> todo{0};  int sum = 0;   // the root is pending
  while ({{c1::!todo.empty()}}) {
    int i = todo.back();  todo.pop_back();  sum += t[i].value;
    if (t[i].left != -1) todo.push_back(t[i].left);
    if (t[i].right != -1) todo.push_back(t[i].right);
  }
  return sum;
}
```

---

Each push stands in for a recursive call that has not run yet, so the
walk is done exactly when nothing is pending. `size() > 1` drops the last
node. The heap can hold far more than the thread's ~8 MB stack, which is
how to keep a non-tail recursion when depth is unbounded.
