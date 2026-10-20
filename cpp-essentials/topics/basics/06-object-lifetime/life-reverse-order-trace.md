---
id: life-reverse-order-trace
kind: trace
version: 3
level: 2
tags: [lifetime, constructors, destructors, members, tracing]
requires:
  - life-members-after-body
  - class-default-member-init-intro
  - string-basics
probes:
  1: { seq: "P21" }
elaborate: Say why destroying in reverse order is what lets a later member safely use an earlier one in its destructor.
refs:
  - https://en.cppreference.com/w/cpp/language/destructor#Destruction_sequence
  - https://eel.is/c++draft/class.dtor#13
---

Every destructor appends one character to `seq`. Read `seq` once
`run()` has returned.

```cpp
std::string seq;
struct Tag {
  char c;
  ~Tag() { seq += c; }
};
struct Pair {
  Tag first{'1'};
  Tag second{'2'};
  ~Pair() { seq += 'P'; }
};
void run() { Pair p; }   // @1 (after run() returns)
```

---

`p` dies at `run`'s `}`. The body of `~Pair` runs first (`P`), and only
then are the members destroyed, in reverse order of declaration:
`second` (`2`) before `first` (`1`), exactly as locals die last-built
first. Verified by compiling and running an instrumented copy under
GCC 16.2 (`g++ -std=c++23`).
