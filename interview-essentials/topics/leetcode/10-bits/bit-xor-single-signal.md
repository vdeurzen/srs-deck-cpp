---
id: bit-xor-single-signal
kind: basic
version: 1
level: 2
tags: [recognition, lc-136]
requires:
  - foundations-bitwise-operators
  - complexity-space-stack-depth
refs:
  - https://leetcode.com/problems/single-number/
  - https://leetcode.com/problems/missing-number/
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Bitwise_logic_operators
elaborate: Missing Number (LC 268) gives `n` distinct numbers from 0..n and asks for the one absent, with no pairs in its input. Which second sequence would you XOR in to create them?
---

> Given a non-empty array of integers `nums`, every element appears
> **twice** except for one. Find that single one. You must implement a
> solution with linear runtime complexity and use only **constant
> extra space**.

## Which one-pass fold (combining every element into one accumulator) finds it?

---

**XOR all the elements: each pair cancels, and the single one is left.**

`x ^ x == 0` and `x ^ 0 == x`, and XOR is commutative and associative,
so the pairs cancel in any order. A hash set also works but needs O(n)
memory; sorting needs O(n log n).
