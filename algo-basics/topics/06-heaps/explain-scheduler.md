---
id: heap-explain-job-scheduler
kind: explain
version: 1
level: 3
tags: [heaps, complexity, capstone]
requires:
  - heap-heapify-linear
  - interview-essentials/heap-vs-bst
elaborate: Jobs can also be cancelled by id while pending. What would you add to this structure to find a job without an O(n) scan?
refs:
  - https://doi.org/10.1145/512274.512284
  - https://doi.org/10.1145/355588.365103
  - https://en.cppreference.com/w/cpp/container/priority_queue
---
A job scheduler holds about 10⁶ pending jobs and always runs the most
urgent next. At startup it loads all saved jobs at once; afterwards jobs
arrive and finish continuously. Explain to a colleague the structure you
would use and what each operation costs.
---
- [ ] A binary heap in one array: slot i's children are 2i + 1 and 2i + 2, so no pointers
- [ ] The most urgent job sits at the root by heap order: peeking costs O(1), with no search
- [ ] A new job is appended and sifted up past less urgent parents: O(log n), about 20 levels
- [ ] Running the next job moves the last one into the root and sifts it down: O(log n)
- [ ] Startup uses bottom-up heapify, O(n): each node sifts down at most its height, mostly tiny
