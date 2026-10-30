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
- [ ] A recursive function solves its input by solving a smaller instance of the same problem, such as a shorter prefix
- [ ] A base case answers directly; any other call calls itself on a smaller input and waits for the result
- [ ] The sum of the first n elements is a[n − 1] plus the sum of the first n − 1
- [ ] Every pending call keeps its own stack frame, so recursion depth n costs O(n) stack space
- [ ] A call that does not shrink its input never reaches the base case
