---
id: life-copy-which-runs
kind: trace
version: 2
level: 1
tags: [lifetime, copy, special-members, tracing]
requires:
  - life-copy-init-not-assign
  - fn-param-change-intro
elaborate: Find a function in your code that takes a class type by value; how many copies does each call make?
probes:
  1: { copies: "1" }
  2: { copies: "2" }
refs:
  - https://en.cppreference.com/w/cpp/language/copy_constructor
  - https://en.cppreference.com/w/cpp/language/copy_initialization
---

`copies` counts how often `Note`'s copy constructor has run. Read it
after each marked line.

```cpp
int copies = 0;
struct Note {
  Note() {}
  Note(const Note&) { ++copies; }
};
void file(Note) {}

int main() {
  Note a;
  Note b = a;      // @1
  file(b);         // @2
}
```

---

Ask of each line: is a new `Note` being created? `Note b = a;` creates
`b` from `a`: the copy constructor. Calling `file(b)` creates the
by-value parameter, a new `Note`, from `b`: another copy construction,
though no `=` appears. Verified by compiling and running an instrumented
copy under GCC 16.2 (`g++ -std=c++23`).
