---
id: exceptions-unwinding-order
kind: trace
version: 2
level: 2
tags: [exceptions, raii, tracing]
requires:
  - cpp-essentials/exceptions-unwinding-destroys-locals
elaborate: Say aloud what a `catch` handler can and cannot still rely on, given which objects are already gone when it runs.
probes:
  1: { trail: "bi!" }
  2: { trail: "bi!o" }
refs:
  - https://en.cppreference.com/w/cpp/language/throw
---

```cpp
std::string trail;
struct Guard { char c; ~Guard() { trail += c; } };
void step() { Guard b{'b'}; throw 42; }
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

Unwinding destroys locals innermost first: `b` (leaving `step`), then
`inner` (leaving the `try` block). Only then does the handler run, so `!`
comes after them. `outer` is outside the `try` and is destroyed normally
when `run` returns.
Verified with GCC 16.2 (`g++ -std=c++23`).
