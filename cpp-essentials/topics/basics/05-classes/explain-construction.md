---
id: class-explain-construction
kind: explain
version: 2
level: 2
tags: [classes, constructors, initialization, invariants]
requires:
  - class-init-list-vs-body
  - class-invariant-who-checks
  - class-default-ctor-restore
  - types-uninit-local-read
elaborate: Pick a constructor in your code; which of its members are built in the list, which by default, and which only assigned in the body?
refs:
  - https://en.cppreference.com/w/cpp/language/constructor
  - https://en.cppreference.com/w/cpp/language/data_members#Member_initialization
---
An interviewer shows you `Car(int hp) : engine_(hp) { /* body */ }` and
asks what a constructor is for and where each member of the new object
gets its starting value. Explain it to them.
---
- [ ] Problem: a constructor establishes the class invariant before any other code can use the object
- [ ] Mechanism: every member is constructed before the body runs, from its list entry if it has one
- [ ] Example: a member missing from the list uses its default member initialiser, such as `int retries = 3`
- [ ] Cost: assigning a member in the body is a second write to an object already built
- [ ] Pitfall: an `int` member with neither a list entry nor a default holds an indeterminate value
