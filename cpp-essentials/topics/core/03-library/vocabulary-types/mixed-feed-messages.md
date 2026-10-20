---
id: vocab-mixed-feed-messages
kind: basic
version: 1
level: 3
tags: [vocabulary-types, mixed-recognition]
requires:
  - vocab-variant-closed-set
elaborate: Say what would change in your answer if third-party plugins could add new message kinds.
refs:
  - https://en.cppreference.com/w/cpp/utility/variant
---

## A feed handler's messages are each exactly one of `Add`, `Cancel` or `Trade`; new kinds arrive only with a protocol version you ship. Which type holds one message?

---

**`std::variant<Add, Cancel, Trade>`: a closed list every `std::visit` is checked against.**

Cue: a fixed set of types that you own. A base class with virtual
functions suits an open set, where others add kinds you never see, and
nothing checks that every kind is handled.
