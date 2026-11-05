---
id: move-semantics-explain-mechanism
kind: explain
version: 2
level: 3
tags: [move-semantics]
requires:
  - raii-move-steals-handle
  - move-semantics-moved-from-state
  - move-vs-copy-intro
elaborate: Which type in your own code owns a resource, and what would its move constructor take from the source?
refs:
  - https://en.cppreference.com/w/cpp/language/move_constructor
  - https://en.cppreference.com/w/cpp/language/move_assignment
  - https://en.cppreference.com/w/cpp/utility/move
---
Explain to a colleague, in about a minute, what a move is in C++.
---
- [ ] A move avoids duplicating the resource of an object that is about to be discarded
- [ ] The move constructor takes the source's handle and sets the source's to "owns nothing"
- [ ] Moving a `vector` copies no elements: only the pointer changes hands, in constant time
- [ ] A moved-from source stays a valid object, but its value is unspecified
- [ ] (empty: tick this)
