---
id: class-member-function-this
kind: trace
version: 2
level: 1
tags: [classes, member-functions, tracing, misconception]
probes:
  1: { "a.count": "2" }
requires:
  - class-this-pointer
  - ptr-arrow-member
refs:
  - https://en.cppreference.com/w/cpp/language/member_functions
  - https://en.cppreference.com/w/cpp/language/this
elaborate: How would you write `reset_to` so it really sets the member, without renaming its parameter?
---

Many expect `a.reset_to(9)` to set `a`'s `count` to 9.

```cpp
struct Tally {
    int count;
    void reset_to(int count) { count = count; }
};

int main() {
    Tally a{2};
    a.reset_to(9);      // @1
}
```

---

Inside a member function a bare `count` normally means the member of the
object the call was made on. But in `reset_to` the parameter is also
named `count`, and the innermost name wins: `count = count` assigns the
parameter to itself. `a.count` stays 2. Write `this->count = count`.
Verified by running an instrumented copy under GCC 16.2 (`g++ -std=c++23`).
