---
id: move-semantics-explain-lost-moves
kind: explain
version: 3
level: 4
tags: [move-semantics]
requires:
  - move-semantics-return-std-move
  - move-semantics-return-move-trace
elaborate: Where else have you seen code that adds a cast "to be safe", and what did the cast actually cost?
refs:
  - https://en.cppreference.com/w/cpp/language/copy_elision
  - https://en.cppreference.com/w/cpp/language/return#Notes
---
In a code review you find a function that builds a local `std::vector`
and ends with `return std::move(result);` "so it isn't copied". Explain to
the author, aloud, what that line really does.
---
- [ ] `std::move` is only a cast to an xvalue; it never moves anything itself
- [ ] A local returned by plain name may be built in the caller's slot (NRVO), else it is moved
- [ ] So plain `return result;` costs zero or one move, never a copy
- [ ] `std::move(result)` is no longer a plain name, so elision is lost and one move is forced
- [ ] The line therefore costs a move it meant to save: return the plain name instead
