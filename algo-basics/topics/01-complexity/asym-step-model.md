---
id: complexity-asym-step-model
kind: basic
version: 1
level: 1
tags: [foundations, complexity, step-model]
elaborate: Name one operation in your own code that you would be tempted to count as a single step but that is not constant-time (a string compare, a map lookup). What would counting it as one step hide?
refs:
  - https://en.wikipedia.org/wiki/Analysis_of_algorithms#Cost_models
---

## The same loop over the same 10 000 elements takes 2 ms on one machine and 9 ms on another. What quantity, counted instead of time, is the same on both?

---

**The number of basic operations executed, as a function of the input
size n.** In this model a basic operation (assignment, comparison,
arithmetic, index) costs one step; a faster machine shrinks the time per
step, not the count. A loop `s += a[i]` over n elements counts a·n + b
steps on every machine: that T(n) is what we analyse.

