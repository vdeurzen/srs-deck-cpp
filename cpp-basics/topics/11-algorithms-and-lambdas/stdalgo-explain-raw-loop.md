---
id: stdalgo-explain-raw-loop
kind: explain
version: 1
level: 2
tags: [algorithms, lambdas, refactoring]
requires:
  - stdalgo-capture-ref-vs-copy
  - stdalgo-find-if-not-found
  - stdalgo-accumulate-init
refs:
  - https://en.cppreference.com/w/cpp/algorithm
---
A reviewer asks you to replace a hand-written search or summing loop with
a standard algorithm. Explain how you write the call and what to check.
---
- [ ] Names the loop's job (searching, counting, summing) before choosing the algorithm that does that job
- [ ] Writes the per-element test as a lambda, capturing by copy the locals it only reads
- [ ] Uses `find_if` for "the first element that passes a test": it returns an iterator to that element
- [ ] Compares that iterator with the range's end before dereferencing it, because a miss returns the end
- [ ] Gives `accumulate` an initial value of the result type, because the running total keeps that type
