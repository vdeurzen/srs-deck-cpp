---
id: stdalgo-explain-raw-loop
kind: explain
version: 1
level: 2
tags: [algorithms, lambdas, refactoring]
requires:
  - cpp-essentials/stdalgo-capture-ref-vs-copy
  - cpp-essentials/stdalgo-find-if-not-found
  - cpp-essentials/stdalgo-accumulate-init
  - stdalgo-loop-to-count-if
elaborate: Find a raw loop in your own code; which algorithm names its job, and what would you check after the swap?
refs:
  - https://en.cppreference.com/w/cpp/algorithm
---
A reviewer asks you to replace a hand-written loop with a standard
algorithm call. Talk them through how you would do it.
---
- [ ] Names the loop's job (searching, counting, summing) before choosing the algorithm that does that job
- [ ] Writes the per-element test as a lambda, capturing by copy the locals it only reads
- [ ] Uses `find_if` for "the first element that passes a test": it returns an iterator to that element
- [ ] Compares that iterator with the range's end before dereferencing it, because a miss returns the end
- [ ] Gives `accumulate` an initial value of the result type, because the running total keeps that type
