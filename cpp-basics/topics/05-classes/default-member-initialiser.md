---
id: class-default-member-initialiser
kind: trace
version: 1
level: 1
tags: [classes, constructors, initialization, tracing]
probes:
  1: { "a.timeout": "30", "b.retries": "3", "b.timeout": "5" }
requires:
  - class-init-list-required
refs:
  - https://en.cppreference.com/w/cpp/language/data_members#Member_initialization
---

```cpp
struct Conn {
    int retries = 3;
    int timeout = 30;
    Conn() {}
    Conn(int t) : timeout(t) {}
};

int main() {
    Conn a;
    Conn b(5);      // @1
}
```

---

`= 3` and `= 30` are **default member initialisers**: the value a member
gets from any constructor whose initialiser list doesn't mention it. `b`'s
constructor lists `timeout`, so that entry wins for `timeout` only;
`retries` still gets 3. Without `= 3`, an `int` member left out of the list
would hold an indeterminate value. Verified by running an instrumented copy
under GCC 16.2 (`g++ -std=c++23`).
