---
id: technique-call-stack-trace
kind: trace
version: 2
level: 1
tags: [foundations, recursion, tracing]
requires:
  - technique-call-stack-worked
elaborate: Say aloud, as to an interviewer, what each open call keeps while it waits, and where else a waiting-in-reverse order shows up in your code.
probes:
  1: { n: "0", calls: "3" }
  2: { r: "9" }
refs:
  - https://en.wikipedia.org/wiki/Call_stack
---

`calls` counts the calls of `pow3` that have started. Probe 1 is the
moment the base case runs; probe 2 is after `pow3(2)` has returned.

```cpp
int calls = 0;

int pow3(int n) {                 // 3 to the power n
  ++calls;
  int r;
  if (n == 0) r = 1;              // @1
  else r = 3 * pow3(n - 1);
  return r;
}

int main() {
  int r = pow3(2);                // @2
}
```

---

`n == 0` is the **base case**, answered without another call; the
other branch is the **step**, a call on a smaller `n`. When the base case
runs, three calls have started and none has returned: `n` = 2, 1, 0,
each a **stack frame** holding its own `n`, the first two waiting to
multiply. Frames are popped in reverse on the way back up: 1, then
3·1, then 3·3 = 9.

(Values from running it under GCC 16.2.)
