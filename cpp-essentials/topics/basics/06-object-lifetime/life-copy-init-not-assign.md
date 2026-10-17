---
id: life-copy-init-not-assign
kind: basic
version: 1
level: 1
tags: [lifetime, copy, special-members]
refs:
  - https://en.cppreference.com/w/cpp/language/copy_constructor
  - https://en.cppreference.com/w/cpp/language/copy_assignment
---

## `Account` defines both a copy constructor and a copy assignment operator. Which of the two runs on the second line?

```cpp
Account a{"alice"};
Account b = a;
```

---

**The copy constructor.** `b` does not exist before this line, so the `=`
here is part of *initialising* a new object, not an assignment. Copy
assignment only runs on an object that is already alive: `b = a;` as a
statement on its own, later. The deciding question: is this line creating
the object on the left?
