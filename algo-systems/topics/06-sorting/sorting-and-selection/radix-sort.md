---
id: sort-radix
kind: basic
version: 1
level: 4
tags: [sorting, databases, low-latency]
requires:
  - sort-stability
refs:
  - https://en.wikipedia.org/wiki/Radix_sort
  - https://en.algorithmica.org/hpc/algorithms/sorting/
---

## Radix sort is O(n) — why is `std::sort` still the default, and when should you reach for radix?

---

Because the O is in different units. Radix sort is O(d·n) for `d`
passes over fixed-width keys, and each pass is a counting sort:
histogram the digit, prefix-sum to get offsets, then scatter. With
8-bit digits, 32-bit keys need 4 passes; 64-bit keys need 8. Comparison
sort is O(n log n) comparisons, which for n = 10⁶ is about 20 passes'
worth — so radix wins for large n and loses for small.

What actually decides it on hardware:

- **The scatter is random access.** Each pass writes into 256 output
  positions at once, so the working set is 256 cache lines and 256 TLB
  entries. It streams, but it is not free, and with too many buckets it
  thrashes. This is why the digit size is 8 bits and not 16.
- **No branches, no comparator calls.** The inner loop is a load, an
  index, an increment and a store — vectorisable, perfectly predicted.
  Comparison sorts spend most of their time on mispredicted branches.
- **Keys must be fixed-width and order-preserving as bytes.** Unsigned
  integers work directly; signed integers need the sign bit flipped;
  IEEE floats need the classic transform (flip the sign bit for
  positives, flip everything for negatives); strings need to be padded
  or handled MSD-first with variable-length recursion.

So the rule: radix for large arrays of numbers you can normalise, in
one pass over data you own (it needs O(n) scratch space, unless you use
the in-place American-flag variant). Comparison sort for small n,
complex keys, or a comparator you cannot express as bytes.

Where it shows up in practice: sorting row ids by a numeric column in a
column store, bucketing by timestamp in a time-series engine, radix
*partitioning* as the first phase of a hash join (the same histogram and
scatter, stopping after one pass), and LSD sorting of fixed-width
market-data keys.
