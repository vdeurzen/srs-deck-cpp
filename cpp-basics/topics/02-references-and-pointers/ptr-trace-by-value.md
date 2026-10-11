---
id: ptr-trace-by-value
kind: trace
version: 1
level: 1
tags: [functions, parameters, tracing]
probes:
  1: { x: "5", y: "10" }
  2: { x: "20", y: "10" }
refs:
  - https://en.cppreference.com/w/cpp/language/function#Parameter_list
  - https://eel.is/c++draft/expr.call#7
---

```cpp
int double_it(int n) {
  n = n * 2;
  return n;
}
int main() {
  int x = 5;
  int y = double_it(x);   // @1
  x = double_it(y);       // @2
}
```

---

A by-value parameter is a new object initialised from the argument:
`n` is a copy of `x`, so `n = n * 2` changes only the copy, and `x` is
still 5 at Probe 1. The caller sees the result only through the return
value, which it stores in `y` (10). At Probe 2, `x` changes because the
caller assigns to it, not because `double_it` touched it.
