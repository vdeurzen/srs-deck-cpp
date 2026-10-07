---
id: technique-recursion-unwind
kind: trace
version: 1
level: 1
tags: [recursion, tracing]
requires:
  - technique-recursion-base-case
probes:
  1: { out: "321.123", calls: "4" }
refs:
  - https://en.wikipedia.org/wiki/Call_stack
---

`f` appends before **and** after its recursive call. The probe reads
both variables after `f(3)` returns.

```cpp
#include <string>
std::string out;
int calls = 0;
void f(int n) {
  ++calls;
  if (n == 0) { out += '.'; return; }
  out += char('0' + n);
  f(n - 1);
  out += char('0' + n);
}

int main() {
  f(3);  // @1
}
```

---

Code before the call runs on the way **down** (3, 2, 1), the base case
runs once at the bottom (`.`), and code after the call runs on the way
**back up**, in reverse (1, 2, 3). Each pending call waits on the stack
with its own `n`; that stack is what reverses the order.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
