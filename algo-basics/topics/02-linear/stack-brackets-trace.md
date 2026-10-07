---
id: linear-stack-brackets-trace
kind: trace
version: 1
level: 1
tags: [stacks, tracing]
requires:
  - linear-stack-recognition
probes:
  1: { top: "3", ok: "true" }
  2: { top: "1", ok: "true" }
  3: { top: "1", ok: "false" }
refs:
  - https://en.cppreference.com/w/cpp/container/stack
---

Check that brackets nest. `st[0..top)` is the stack of still-open
brackets.

```cpp
char st[8]; int top = 0; bool ok = true;

void feed(char c) {
  if (c == '(' || c == '[' || c == '{') { st[top++] = c; return; }
  char want = c == ')' ? '(' : c == ']' ? '[' : '{';
  if (top == 0 || st[top - 1] != want) ok = false;   // wrong closer
  else --top;                                        // matched: pop
}

int main() {
  feed('{'); feed('['); feed('(');   // @1
  feed(')'); feed(']');              // @2
  feed(')');                         // @3
}
```

---

A closer must match **the most recently opened bracket**, which is
exactly what a stack's top holds. At probe 3 the top is `{`, so `)`
is rejected and nothing is popped.

Each character is one push or one pop at the top, so a string of length
n is checked in O(n).

(Values from running it under GCC 16.2.)
