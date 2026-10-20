---
id: complexity-sequence-cost-intro
kind: basic
version: 1
level: 1
tags: [foundations, complexity, vectors]
requires:
  - complexity-asym-big-o-definition
  - cpp-essentials/iter-size-vs-capacity
refs:
  - https://epubs.siam.org/doi/10.1137/0606031
  - https://en.cppreference.com/w/cpp/container/vector/push_back
elaborate: Say in one sentence, as to an interviewer, which other structure you know has a rare expensive step paid for by many cheap ones.
---

An empty `std::vector<int>` with room for 1 element doubles its
capacity whenever `push_back` finds it full, copying every element into
the new buffer.

```text
push   capacity   elements copied
1      1          0
2      1 → 2      1
3      2 → 4      2
```

Push 5 copies 4 more, the rest copy nothing: 8 pushes copy 7 in all.

## Total copies stay below one per push. What is a cost averaged over the whole sequence this way called?

---

**Its amortised cost: here `push_back` is amortised O(1).**

The rare expensive push is paid for by the cheap ones before it: with
doubling, n pushes copy fewer than n elements in total. It bounds the
sum over a sequence, not any single call, which can still copy all n.
