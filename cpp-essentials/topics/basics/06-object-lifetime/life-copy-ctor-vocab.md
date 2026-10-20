---
id: life-copy-ctor-vocab
kind: basic
version: 1
level: 1
tags: [lifetime, copy, special-members, foundations]
requires:
  - class-constructor-intro
  - const-ref-names-caller
elaborate: Say which classes in your own code would need a copy constructor that does more than copy each member.
refs:
  - https://en.cppreference.com/w/cpp/language/copy_constructor
  - https://eel.is/c++draft/class.copy.ctor#1
---

## Which of the three declarations is `Account`'s *copy constructor*: the one that builds a new `Account` from an existing one?

```cpp
struct Account {
    Account(int id);
    Account(const Account& other);
    void copy_from(const Account& other);
};
```

---

**`Account(const Account& other);`: a constructor whose parameter is its own class.**

Being a constructor (class name, no return type), it creates a new
object; its parameter names the existing `Account` to copy from.
`copy_from` overwrites an object that already exists; `Account(int)`
builds one from an `int`.
