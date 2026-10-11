---
id: technique-call-stack-trace
kind: trace
version: 1
level: 1
tags: [foundations, recursion, tracing]
probes:
  1: { n: "1", depth: "4" }
  2: { r: "24", depth: "0" }
refs:
  - https://en.wikipedia.org/wiki/Call_stack
---

`depth` counts the calls of `fact` that have started but not yet
returned. Probe 1 is the moment the base case runs; probe 2 is after
`fact(4)` has returned.

```cpp
int depth = 0;

int fact(int n) {
  ++depth;                        // entering a call
  int r;
  if (n <= 1) r = 1;              // @1
  else r = n * fact(n - 1);
  --depth;                        // leaving it
  return r;
}

int main() {
  int r = fact(4);                // @2
}
```

---

`n <= 1` is the **base case**, answered without another call; the
other branch is the **step**, a call on a smaller `n`. At the base case
four calls are open, `n` = 4, 3, 2, 1, each a **stack
frame** holding its own `n` and waiting to multiply. Frames are pushed
on the way down and popped in reverse on the way back up: 1, then
2·1, 3·2, 4·6 = 24. Afterwards nothing is left on the stack.

(Values from running an instrumented copy under GCC 16.2.)
