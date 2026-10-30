---
id: technique-explain-recursion
kind: explain
version: 2
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
- [ ] A base case answers directly; every other call calls itself on a smaller input, such as a shorter prefix
- [ ] The caller pauses at that call and resumes only when the smaller call returns its value
- [ ] Summing 4, 1: calls open down to the empty prefix's 0, then return 4, then 5
- [ ] Every waiting call keeps its own stack frame, so recursion depth n costs O(n) stack space
- [ ] A call that does not shrink its input never reaches the base case
