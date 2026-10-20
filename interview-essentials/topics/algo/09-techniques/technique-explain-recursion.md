---
id: technique-explain-recursion
kind: explain
version: 1
level: 4
tags: [recursion]
requires:
  - technique-recursion-sum-code
  - technique-recursion-unwind
  - technique-recursion-depth
refs:
  - https://en.wikipedia.org/wiki/Recursion_(computer_science)
  - https://man7.org/linux/man-pages/man2/getrlimit.2.html
elaborate: Where in code you have written would a recursion be clearer than a loop, and how deep could it get on the largest input?
---
A junior colleague says they never trust recursive functions. Explain
to them how one runs. Answer aloud.
---
- [ ] Problem: solve an input by solving a smaller instance of the same problem, such as a shorter prefix
- [ ] Mechanism: a base case answers directly, and the step calls itself on a smaller input and waits
- [ ] Example: the sum of the first n elements is a[n − 1] plus the first n − 1 summed
- [ ] Cost: every pending call keeps its own stack frame, so depth n costs O(n) stack space
- [ ] Pitfall: a step whose call does not shrink the input never reaches the base case
