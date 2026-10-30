---
id: smf-price-cents-only
kind: basic
version: 1
level: 2
tags: [classes, special-members, constructors]
requires:
  - class-default-ctor-restore
  - smf-pipe-six-lines
elaborate: Pick a class of yours with one hand-written constructor; which of its uses copy, move or assign it without you ever writing those functions?
refs:
  - https://eel.is/c++draft/class.default.ctor#1
  - https://eel.is/c++draft/class.copy.ctor#6
  - https://en.cppreference.com/w/cpp/language/default_constructor
---

## `Price` declares this one constructor and nothing else. Which of the six special members does the compiler still write for it?

```cpp
struct Price {
    long cents;
    explicit Price(long c) : cents(c) {}
};
```

---

**Five of them: all but the default constructor.**

Any constructor you declare removes the no-argument one, so `Price p;`
no longer compiles. The copy and move constructors, copy and move
assignment and the destructor are untouched: only declaring one of the
special members changes those.
