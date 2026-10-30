---
id: class-default-member-initialiser
kind: code
version: 3
level: 3
tags: [classes, constructors, initialization]
input: chips
choices:
  c1: ["int retries = 3;", "int retries;", "int retries(3);"]
compile:
  harness: |
    constexpr Conn b(5);
    static_assert(b.retries == 3);
    static_assert(b.timeout == 5);
    int main() {}
requires:
  - class-default-member-init-intro
  - constexpr-fn-static-assert
elaborate: Which members in your own structs could get a default member initialiser, so no constructor can forget them?
refs:
  - https://en.cppreference.com/w/cpp/language/data_members#Member_initialization
  - https://eel.is/c++draft/class.mem.general
---

`Conn`'s constructor never mentions `retries`, yet every `Conn` must start
with `retries` at 3. Complete the member's declaration.

```cpp
struct Conn {
    {{c1::int retries = 3;}}
    int timeout;
    constexpr Conn(int t) : timeout(t) {}
};
```

---

**`= 3` in the declaration is a default member initialiser.** Any
constructor whose list leaves `retries` out starts it at 3. Plain
`int retries;` leaves it indeterminate, not 3. A
member declaration cannot take parentheses (`retries(3)`): inside a
class that is a syntax error.
