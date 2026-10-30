---
id: smf-socket-copy-line
kind: basic
version: 1
level: 3
tags: [classes, special-members, copying]
requires:
  - smf-pipe-six-lines
  - life-shallow-copy-pointer
elaborate: Say aloud, as to an interviewer, why refusing to copy is a safer default here than copying each member.
refs:
  - https://eel.is/c++draft/class.copy.ctor#6
  - https://eel.is/c++draft/class.copy.assign#2
  - https://en.cppreference.com/w/cpp/language/copy_constructor#Deleted_copy_constructor
---

## `Socket` declares a move constructor but no copy constructor. What happens at the last line: a memberwise copy, a move, or a compile error?

```cpp
struct Socket {
    int fd = -1;
    Socket() = default;
    Socket(Socket&& o) : fd(o.fd) { o.fd = -1; }
};
Socket a;
Socket b = a;
```

---

**A compile error: a declared move operation makes the implicit copy operations deleted.**

Either move operation does it: copy constructor and copy assignment are
declared `= delete`. A class that moves by hand likely owns something; a
memberwise copy would give it two owners. `a` is not about to be thrown
away, so the move constructor is not chosen.
