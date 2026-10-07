---
id: sort-introsort-vs-pdqsort
kind: basic
version: 1
level: 4
tags: [sorting, adaptivity]
requires:
  - sort-pattern-defeating
elaborate: Your service sorts arrays that are usually already sorted. Which standard library would you expect to notice?
refs:
  - https://gcc.gnu.org/git/?p=gcc.git;a=blob;f=libstdc%2B%2B-v3/include/bits/stl_algo.h
  - https://github.com/llvm/llvm-project/blob/main/libcxx/include/__algorithm/sort.h
  - https://github.com/rust-lang/rust/blob/master/library/core/src/slice/sort/unstable/mod.rs
---

## libstdc++'s `std::sort` and Rust's `sort_unstable` both fall back to heapsort after ~2·log₂ n bad steps. What does Rust's do that libstdc++'s does not?

---

**Adapts to the input: a fully sorted or reversed slice returns after one scan.**

Rust (ipnsort, since 1.81) is a pdqsort descendant. libstdc++ (GCC 16)
is plain introsort, so sorted input still costs n log n. libc++
(LLVM 22) is in between: introsort plus pdqsort's equal-key partition,
partial insertion sort, branchless partition for arithmetic keys.
