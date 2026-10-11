---
id: fn-recursion-trace
kind: trace
version: 1
level: 1
tags: [functions, recursion, tracing]
probes:
  1: { down: "321", up: "123" }
refs:
  - https://eel.is/c++draft/expr.call#14
---

```cpp
#include <string>
std::string down, up;

void count(int n) {
    if (n == 0) return;
    down += char('0' + n);
    count(n - 1);
    up += char('0' + n);
}

int main() {
    count(3);       // @1
}
```

---

A **recursive** function calls itself. Each call gets its own `n`, so
`count(3)` → `count(2)` → `count(1)` → `count(0)`, which returns at once
(the **base case**). Work before the recursive call happens on the way
down (3, 2, 1); work after it waits until the inner call returns, so it
runs on the way back up (1, 2, 3). Verified by running an instrumented copy
under GCC 16.2 (`g++ -std=c++23`).
