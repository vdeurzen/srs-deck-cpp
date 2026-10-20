---
id: technique-recursion-depth
kind: basic
version: 1
level: 2
tags: [recursion, space]
requires:
  - technique-call-stack-worked
  - complexity-space-stack-depth
elaborate: Which recursive function of yours has a depth that grows with the input rather than with its logarithm?
refs:
  - https://man7.org/linux/man-pages/man2/getrlimit.2.html
  - https://github.com/torvalds/linux/blob/master/include/uapi/linux/resource.h
---

```cpp
long count(long n) {
  if (n == 0) return 0;
  return 1 + count(n - 1);
}
```

## Built with `-O0` (no optimisation), `count(10000000)` crashes; a loop counting to the same n does not. Why?

---

**Every pending call keeps a stack frame, so recursion depth n costs O(n) space.**
The addition runs after the call returns, so every frame waits. Linux
typically gives the main thread 8 MB of stack; 10⁷ frames of even 32
bytes need 320 MB. A recursion that halves n is only log₂ n deep, so it
is safe.
