---
id: technique-recursion-unwind
kind: trace
version: 3
level: 1
tags: [recursion, tracing]
requires:
  - technique-call-stack-trace
elaborate: Where else does code after a recursive call run in reverse order, and when would you rely on that on purpose?
probes:
  1: { down: "21", up: "12" }
refs:
  - https://en.wikipedia.org/wiki/Call_stack
---

`f` records `n` before **and** after its recursive call; `x * 10 + n`
appends the digit `n` to `x`. The probe reads both after `f(2)` returns.

```cpp
int down = 0, up = 0;
void f(int n) {
  if (n == 0) return;
  down = down * 10 + n;
  f(n - 1);
  up = up * 10 + n;
}

int main() {
  f(2);  // @1
}
```

---

Code before the call runs on the way **down** (2, then 1), the base case
returns at the bottom, and code after the call runs on the way **back
up**, in reverse (1, then 2). Each pending call waits on the stack with
its own `n`; that stack is what reverses the order.

(Values from running it under GCC 16.2.)
