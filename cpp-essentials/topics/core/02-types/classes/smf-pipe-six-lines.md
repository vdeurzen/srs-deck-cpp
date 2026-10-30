---
id: smf-pipe-six-lines
kind: basic
version: 1
level: 1
tags: [classes, special-members, foundations]
requires:
  - class-default-delete-where
  - life-copy-init-not-assign
  - move-vs-copy-intro
elaborate: Say aloud which two of the six build a new object from an existing one, and which two overwrite an object that is already alive.
refs:
  - https://en.cppreference.com/w/cpp/language/member_functions#Special_member_functions
  - https://en.cppreference.com/w/cpp/language/move_assignment
  - https://eel.is/c++draft/special
---

`operator=` is the function an assignment `x = y;` calls.

## `Pipe` declares all six of its special members. Which line declares the *move assignment operator*?

```cpp
struct Pipe {
    Pipe();                         // A
    Pipe(const Pipe&);              // B
    Pipe& operator=(const Pipe&);   // C
    Pipe(Pipe&&);                   // D
    Pipe& operator=(Pipe&&);        // E
    ~Pipe();                        // F
};
```

---

**Line E: an `operator=` whose parameter is `Pipe&&`.**

Constructors (A, B, D) build a new object; assignments (C, E) overwrite a
live one. `const Pipe&` marks the copy pair (B, C), `Pipe&&` the move pair
(D, E). A is the default constructor, F the destructor: six in all.
