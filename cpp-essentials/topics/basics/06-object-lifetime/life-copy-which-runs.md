---
id: life-copy-which-runs
kind: trace
version: 1
level: 1
tags: [lifetime, copy, special-members, tracing]
requires:
  - life-copy-init-not-assign
  - fn-param-change-intro
  - class-this-pointer
  - const-ref-names-caller
elaborate: Find a function in your code that takes a class type by value; how many copies does each call make?
probes:
  1: { copies: "1", assigns: "0" }
  2: { copies: "1", assigns: "1" }
  3: { copies: "2", assigns: "1" }
refs:
  - https://en.cppreference.com/w/cpp/language/copy_constructor
  - https://en.cppreference.com/w/cpp/language/copy_assignment
---

`Note& operator=(const Note&)` is `Note`'s copy assignment operator.

```cpp
int copies = 0;    // counts copy-constructor calls
int assigns = 0;   // counts copy-assignment calls
struct Note {
  Note() {}
  Note(const Note&) { ++copies; }
  Note& operator=(const Note&) { ++assigns; return *this; }
};
void file(Note) {}

int main() {
  Note a;
  Note b = a;      // @1
  Note c;
  c = a;           // @2
  file(c);         // @3
}
```

---

Ask of each line: is a new `Note` being created? `Note b = a;` creates
`b`, so it is the copy constructor. `c = a;` changes `c`, which already
exists: copy assignment. Calling `file(c)` creates the by-value parameter,
a new `Note`, from `c`: another copy construction, despite no `=` in
sight. Verified by compiling and running an
instrumented copy under GCC 16.2 (`g++ -std=c++23`).
