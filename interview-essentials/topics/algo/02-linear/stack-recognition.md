---
id: linear-stack-recognition
kind: basic
version: 1
level: 1
tags: [recognition, parsing]
requires:
  - linear-stack-adt
elaborate: "Name a check in code you have written where the latest thing opened must be the first one closed."
refs:
  - https://en.cppreference.com/w/cpp/container/stack
---

## An HTML checker accepts `<b><i>…</i></b>` and rejects `<b><i>…</b></i>`. Which structure should it keep the open tags in?

---

**A stack: each closing tag must match the top, the latest still-open tag.**

Push each opening tag; a closing tag must equal the top, which is then
popped. `</b>` arriving while `<i>` is on top is the error. The same
shape appears in undo histories and in a function's call stack.
