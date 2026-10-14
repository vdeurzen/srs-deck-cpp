---
id: tree-inorder-iterative-parsons
kind: parsons
version: 1
level: 3
tags: [trees, traversal, explicit-stack, lc-94, lc-230]
distractors:
  - "  while (!st.empty()) {"
  - "    cur = st.pop();"
compile:
  harness: |
    #include <vector>
    struct TreeNode { int val; TreeNode* left; TreeNode* right; };
    struct Stack {                   // constexpr stand-in for std::stack<TreeNode*>
      std::vector<TreeNode*> v;
      constexpr bool empty() const { return v.empty(); }
      constexpr TreeNode* top() const { return v.back(); }
      constexpr void push(TreeNode* x) { v.push_back(x); }
      constexpr void pop() { v.pop_back(); }
    };
    constexpr bool bst() {           // LC 230 example 2: [5,3,6,2,4,null,null,1]
      TreeNode n[6] = {};
      n[0] = {5, &n[1], &n[2]};
      n[1] = {3, &n[3], &n[4]};
      n[2] = {6, nullptr, nullptr};
      n[3] = {2, &n[5], nullptr};
      n[4] = {4, nullptr, nullptr};
      n[5] = {1, nullptr, nullptr};
      std::vector<int> out;
      inorder(&n[0], out, Stack{});
      return out == std::vector{1, 2, 3, 4, 5, 6};
    }
    static_assert(bst());
    constexpr bool zigzag() {        // 1 -> right 3 -> left 2: inorder 1 2 3
      TreeNode n[3] = {};
      n[0] = {1, nullptr, &n[1]};
      n[1] = {3, &n[2], nullptr};
      n[2] = {2, nullptr, nullptr};
      std::vector<int> out;
      inorder(&n[0], out, Stack{});
      std::vector<int> none;
      inorder(static_cast<TreeNode*>(nullptr), none, Stack{});
      return out == std::vector{1, 2, 3} && none.empty();
    }
    static_assert(zigzag());
    #include <stack>
    int main() {                     // also instantiates it with the real std::stack
      TreeNode a{1, nullptr, nullptr};
      std::vector<int> out;
      inorder(&a, out, std::stack<TreeNode*>{});
      return out[0];
    }
requires:
  - algo-basics/tree-bst-inorder-trace
refs:
  - https://leetcode.com/problems/binary-tree-inorder-traversal/
  - https://leetcode.com/problems/kth-smallest-element-in-a-bst/
  - Knuth, The Art of Computer Programming, Vol. 1, 3rd ed., §2.3.1, Algorithm T
elaborate: LC 173 (BST iterator) asks for `next()` in O(h) memory. Which lines become the constructor, and which become `next()`?
---

LC 94: inorder traversal of a binary tree without recursion. `cur`
starts at the root, and `st` arrives as an empty `std::stack<TreeNode*>`
(a parameter only so the harness can pass a constexpr stand-in).
Order the lines.

```cpp
template <class Node> constexpr void inorder(Node* cur, auto& out, auto st) {
  while (cur || !st.empty()) {
    while (cur) { st.push(cur); cur = cur->left; }
    cur = st.top(); st.pop();
    out.push_back(cur->val);
    cur = cur->right;
  }
}
```

---

**Iterative inorder: dive left pushing, pop and visit, step right.**
The stack holds the ancestors whose left subtree is still being walked:
exactly the frames recursion would hold, so memory is O(h). Each node is
pushed and popped once: O(n).

The outer test needs both halves. At the start the stack is empty but
`cur` is not, so `while (!st.empty())` never runs. After the last pop,
`cur` is null but the stack may still hold ancestors. `std::stack::pop`
returns nothing, so `cur = st.pop()` does not compile: read `top()`
first. Stop at the k-th pop and this is LC 230.
