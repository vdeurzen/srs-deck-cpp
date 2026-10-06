---
id: sort-external-merge
kind: basic
version: 1
level: 4
tags: [sorting, databases, external-memory]
requires:
  - foundations-external-memory-model
refs:
  - https://dl.acm.org/doi/10.1145/48529.48535
  - https://15445.courses.cs.cmu.edu/
---

## Sort 1 TB with 8 GB of RAM. Describe the algorithm and count the passes.

---

**Phase 1, run generation.** Read the input in memory-sized chunks,
sort each in memory, write it back as a sorted **run**. With 8 GB of
memory you get ~128 runs of 8 GB each. Cost: one read and one write of
everything.

**Phase 2, merge.** Merge the runs k at a time with a k-way merge —
one input buffer per run, a loser tree or heap over the buffer heads, one
output buffer. The fan-in `k` is limited by memory divided by buffer
size: 8 GB with 8 MB buffers gives k ≈ 1000, so 128 runs merge in a
**single pass**. Total: two reads and two writes of the data, and the
I/O model's bound `Θ((N/B)·log_(M/B)(N/B))` is, for real numbers, "two
passes".

The engineering that matters:

- **Buffer size sets the fan-in, and both matter.** Large buffers mean
  sequential I/O (good) but fewer runs merged per pass (bad). The
  optimum is where the merge still finishes in one pass with the largest
  buffers that allows — which is why engines compute it rather than
  hardcode it.
- **Replacement selection** produces runs averaging 2× memory instead
  of 1× by maintaining a heap and emitting elements that are still ≥ the
  last emitted — worth it when it saves a merge pass, less so on SSDs
  where the extra random-ish I/O costs little.
- **Double buffering and prefetch**: read the next block of a run while
  merging the current one, or the merge is latency-bound.
- **Sort keys, not rows.** Extract (key, row-id) pairs, sort those, and
  fetch rows afterwards — much less data to move, at the cost of a
  random-access gather at the end.

The same structure appears anywhere the data exceeds the fast level:
LSM compaction is a k-way merge of sorted SSTables, `sort -m` merges
sorted files, and a GPU or SIMD sort does exactly this with the cache as
"memory" and RAM as "disk".
