---
id: linear-stack-recognition
kind: basic
version: 1
level: 1
tags: [stacks, recognition]
requires:
  - linear-stack-at-the-back
refs:
  - https://en.cppreference.com/w/cpp/container/stack
---

## An HTML checker reads `<b><i>…</i></b>`. Every closing tag must match the most recently opened tag that is still open. Which structure does that rule describe?

---

**A stack: "most recently opened, still open" is last in, first out.**

Push each opening tag; a closing tag must equal the top, which is then
popped. `</b>` arriving while `<i>` is on top is the error. The same
shape appears in undo histories and in a function's call stack.
