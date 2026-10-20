---
id: linear-stack-brackets-worked
kind: basic
version: 1
level: 1
tags: [stacks, worked-example]
requires:
  - interview-essentials/linear-stack-recognition
refs:
  - https://en.cppreference.com/w/cpp/container/stack
---

## Checking that brackets nest in `([)]`, with `st[0..top)` (indices 0 up to, not including, `top`) as the stack of still-open brackets:

```cpp
void feed(char c) {
  if (c == '(' || c == '[') { st[top] = c; ++top; return; }
  char want = '(';
  if (c == ']') want = '[';
  if (top == 0 || st[top - 1] != want) ok = false;   // wrong closer
  else --top;                                        // matched: pop
}
```

| c | stack before | top holds | action |
|---|---|---|---|
| `(` | empty | — | push |
| `[` | `(` | — | push |
| `)` | `( [` | `[` | wants `(`: ok = false |

Why is `)` rejected in row 3, though a `(` is on the stack?

---

**`)` must close the latest open bracket, `[`; the `(` lies beneath it.**

Brackets nest, so a closer always pairs with the most recently opened
bracket still open, and that is exactly the stack's top. The `(` further
down can only be closed after the `[` above it.
