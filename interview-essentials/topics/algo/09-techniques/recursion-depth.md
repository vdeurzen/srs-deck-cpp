---
id: technique-recursion-depth
kind: basic
version: 1
level: 2
tags: [recursion, space]
requires:
  - technique-recursion-unwind
  - complexity-space-stack-depth
elaborate: Which recursive function of yours has a depth that grows with the input rather than with its logarithm?
refs:
  - https://man7.org/linux/man-pages/man2/getrlimit.2.html
  - https://github.com/torvalds/linux/blob/master/include/uapi/linux/resource.h
---

```cpp
int sum(Node* p) { if (!p) return 0; return p->v + sum(p->next); }
```

## Built with `-O0`, this crashes on a 10⁷-node list; a loop does not. Why?

---

**Every pending call keeps a stack frame, so recursion depth n costs O(n) space.**
The addition runs after the call returns, so every frame waits. Linux
typically gives the main thread 8 MB of stack (`ulimit -s`); 10⁷ frames
of even 32 bytes need 320 MB. Recursive binary search is only log₂ n
deep, so it is safe.
