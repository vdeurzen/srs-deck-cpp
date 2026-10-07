---
id: heap-explain-job-scheduler
kind: explain
version: 1
level: 3
tags: [heaps, complexity, capstone]
requires:
  - heap-heapify-linear
  - heap-vs-bst
refs:
  - https://doi.org/10.1145/512274.512284
  - https://doi.org/10.1145/355588.365103
  - https://en.cppreference.com/w/cpp/container/priority_queue
---
A job scheduler holds about 10⁶ pending jobs and always runs the most
urgent next. At startup it loads all saved jobs at once; afterwards jobs
arrive and finish continuously. Explain the structure you would use and
what each operation costs.
---
- [ ] A binary heap in one array: complete shape, so slot i's children are 2i + 1 and 2i + 2 and its parent (i − 1) / 2, no pointers
- [ ] The most urgent job is at the root by heap order: peeking costs O(1), with no search
- [ ] A new job is appended and sifted up past less urgent parents: O(log n), about 20 levels for 10⁶
- [ ] Running the next job moves the last element into the root and sifts it down, swapping with the more urgent child: O(log n)
- [ ] Startup uses bottom-up heapify, O(n), not 10⁶ pushes, because each node sifts down at most its height and most nodes are near the bottom
