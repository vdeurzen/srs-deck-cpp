---
id: linear-stack-brackets-trace
kind: trace
version: 2
level: 1
tags: [stacks, tracing]
requires:
  - linear-stack-brackets-worked
  - interview-essentials/linear-stack-recognition
probes:
  1: { top: "1", ok: "true" }
  2: { top: "1", ok: "false" }
elaborate: Where else must each closing event match the most recent unmatched opening one, as with function calls and returns?
refs:
  - https://en.cppreference.com/w/cpp/container/stack
---

Check that brackets nest. `st[0..top)` (indices 0 up to, not including,
`top`) is the stack of still-open brackets.

```cpp
char st[4]; int top = 0; bool ok = true;

void feed(char c) {
  if (c == '(' || c == '[') { st[top] = c; ++top; return; }
  char want = '(';
  if (c == ']') want = '[';
  if (top == 0 || st[top - 1] != want) ok = false;   // wrong closer
  else --top;                                        // matched: pop
}

int main() {
  feed('('); feed('('); feed(')');   // @1
  feed(']');                         // @2
}
```

---

The `)` matches the second `(` on top and pops it, leaving one `(`
open. The `]` then meets that `(` on top: **a closer must match the most
recently opened bracket**, so it is rejected and nothing is popped.

Each character is one push or one pop at the top, so a string of length
n is checked in O(n).

(Values from running it under GCC 16.2.)
