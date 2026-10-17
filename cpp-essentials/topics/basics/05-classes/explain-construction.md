---
id: class-explain-construction
kind: explain
version: 1
level: 2
tags: [classes, constructors, initialization, invariants]
requires:
  - class-init-list-vs-body
  - class-invariant-who-checks
  - class-default-ctor-restore
refs:
  - https://en.cppreference.com/w/cpp/language/constructor
  - https://en.cppreference.com/w/cpp/language/data_members#Member_initialization
---
Explain what happens to an object's members when a constructor such as
`Car(int hp) : engine_(hp) { /* body */ }` runs, and what the constructor
owes the rest of the program when it finishes.
---
- [ ] Every member is constructed before the first statement of the body runs
- [ ] A member named in the initialiser list is constructed from that entry
- [ ] A member left out uses its default member initialiser, else default construction (an `int` stays indeterminate)
- [ ] An assignment in the body is a second write to an already-constructed member, not its initialisation
- [ ] On return the class invariant must hold; arguments that can't satisfy it must be rejected
