---
id: class-default-member-initialiser
kind: trace
version: 2
level: 1
tags: [classes, constructors, initialization, tracing]
probes:
  1: { "b.retries": "3", "b.timeout": "5" }
requires:
  - class-default-member-init-intro
elaborate: Which members in your own structs could get a default member initialiser, so no constructor can forget them?
refs:
  - https://en.cppreference.com/w/cpp/language/data_members#Member_initialization
---

```cpp
struct Conn {
    int retries = 3;
    int timeout = 30;
    Conn(int t) : timeout(t) {}
};

int main() {
    Conn b(5);      // @1
}
```

---

`= 3` and `= 30` are **default member initialisers**: the value a member
gets from any constructor whose initialiser list doesn't mention it. `b`'s
constructor lists `timeout`, so that entry wins for `timeout` only;
`retries` still gets 3. Without `= 3`, an `int` member left out of the list
would hold no reliable value. Verified by running an instrumented copy
under GCC 16.2 (`g++ -std=c++23`).
