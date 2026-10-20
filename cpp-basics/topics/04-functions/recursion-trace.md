---
id: fn-recursion-trace
kind: trace
version: 2
level: 1
tags: [functions, recursion, tracing]
requires:
  - fn-recursion-worked
elaborate: Say in one sentence, as to an interviewer, what in a recursive tree walk runs "on the way back up", and why that order matters there.
probes:
  1: { s: "2112" }
refs:
  - https://eel.is/c++draft/expr.call#14
---

```cpp
#include <string>
std::string s;

void count(int n) {
    if (n == 0) return;
    s += char('0' + n);
    count(n - 1);
    s += char('0' + n);
}

int main() {
    count(2);       // @1
}
```

---

`count(2)` appends `2`, then calls `count(1)`, which appends `1` and calls
`count(0)`; that base case returns at once. Now the paused calls finish,
innermost first: `count(1)` appends `1`, then `count(2)` appends `2`. The
append before the call runs on the way in, the one after it on the way
back out, so `s` reads `2112`. Verified by running an instrumented copy
under GCC 16.2 (`g++ -std=c++23`).
