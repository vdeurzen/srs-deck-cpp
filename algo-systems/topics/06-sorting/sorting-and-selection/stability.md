---
id: sort-stability
kind: basic
version: 1
level: 2
tags: [sorting, databases]
refs:
  - https://en.cppreference.com/w/cpp/algorithm/stable_sort
  - https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
---

## What does a stable sort guarantee, and which real requirement actually needs it?

---

Elements that compare **equal** keep their relative input order. Note
the definition is about the *comparator's* notion of equality, not about
the elements being identical — which is what makes it useful: it lets
you sort by one key while preserving an order established earlier by
another.

The requirement that needs it:

- **Multi-key sorting by repeated passes.** Sort by name, then stably by
  department, and you get departments in order with names ordered inside
  each. This is how `ORDER BY a, b` can be implemented as successive
  passes, and how a spreadsheet's "sort by this column" composes with
  what the user did before.
- **Radix sort's correctness.** LSD radix sort *is* a sequence of stable
  counting sorts, one digit at a time. Without stability at each pass
  the earlier digits' work is destroyed.
- **Reproducibility.** A stable sort's output is fully determined by
  the input and the comparator — every correct stable sort, on every
  library and version, produces the same order — which matters for deterministic builds, replayable
  test fixtures and comparing two runs of a query plan.

What it costs: `std::stable_sort` allocates a temporary buffer of n/2
and does merge sort (falling back to an in-place O(n log² n) merge if
the allocation fails). Typically 10–30 % slower than `std::sort` plus the
allocation.

The cheap alternative when you need determinism but not composition is
to **make the comparator total** — add a tiebreaker (an id, an index,
an arrival sequence number) so no two elements compare equal. Then every
correct sort produces the same order, stability is irrelevant, and you
can use the faster unstable algorithm. In an exchange's matching engine
that tiebreaker exists anyway: price, then time priority, then sequence
number.
