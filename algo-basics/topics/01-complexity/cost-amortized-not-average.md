---
id: complexity-cost-amortized-not-average
kind: basic
version: 1
level: 2
tags: [foundations, complexity, amortised, misconception]
requires:
  - complexity-cost-amortized
  - interview-essentials/complexity-cost-cases
elaborate: Which "constant time on average" operation in your code could an adversary who chooses the inputs make slow, and which amortised one could they not?
refs:
  - https://epubs.siam.org/doi/10.1137/0606031
  - https://en.wikipedia.org/wiki/Best,_worst_and_average_case
---

## "Amortised constant time just means constant on average." An adversary who chooses every input attacks a growable array's push (amortised O(1)) and a hash table's lookup (average-case O(1): a hash function spreads keys over buckets, and a lookup scans one bucket). What happens to each?

---

**The pushes stay O(1) each over any sequence; the lookups can all become O(n).**
Amortised averages over the *operations* of a sequence and holds for
every sequence, so no input choice defeats it. Average-case averages
over a *distribution of inputs*; an adversary simply picks inputs
outside it (all keys to one bucket). Both say "on average" about
different things.
