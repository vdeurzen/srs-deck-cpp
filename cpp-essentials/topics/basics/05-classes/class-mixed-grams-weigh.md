---
id: class-mixed-grams-weigh
kind: basic
version: 1
level: 3
tags: [classes, constructors, recognition]
requires:
  - class-explicit-blocks-conversion
  - class-default-delete-where
elaborate: Which one-argument constructors in your own classes would you mark this way, and which would you leave alone?
refs:
  - https://en.cppreference.com/w/cpp/language/explicit
---

## `struct Grams { Grams(double v); };` and `void weigh(Grams g);`. Callers must write `weigh(Grams{5.0})`, and `weigh(5.0)` must stop compiling. What do you add to the constructor?

---

**`explicit` before the constructor: `explicit Grams(double v);`.**

The cue is an unwanted silent conversion from a number. `= delete` on the
constructor would forbid `Grams{5.0}` too; `explicit` keeps direct
construction and only stops the implicit one.
