---
id: exceptions-unwinding-order
kind: trace
version: 1
level: 2
tags: [exceptions, raii, tracing]
requires:
  - exceptions-unwinding-destroys-locals
probes:
  1: { trail: "bai!" }
  2: { trail: "bai!o" }
refs:
  - https://en.cppreference.com/w/cpp/language/throw
---

```cpp
std::string trail;
struct Guard { char c; ~Guard() { trail += c; } };
void step() {
    Guard a{'a'}, b{'b'};
    throw 42;
}
void run() {
    Guard outer{'o'};
    try {
        Guard inner{'i'};
        step();
    } catch (int) {
        trail += '!';        // @1
    }
}
int main() { run(); }      // @2
```

---

Unwinding destroys locals innermost first, each frame in reverse
construction order: `b`, `a` (leaving `step`), then `inner` (leaving the
`try` block). Only then does the handler run, so `!` comes after them.
`outer` is outside the `try` and is destroyed normally when `run` returns.
Verified with GCC 16.2 (`g++ -std=c++23`).
