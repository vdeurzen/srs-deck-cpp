---
id: life-copy-init-not-assign
kind: basic
version: 1
level: 1
tags: [lifetime, copy, special-members]
requires:
  - life-copy-ctor-vocab
elaborate: Say how you would tell, line by line, whether an `=` in your code initialises or assigns.
refs:
  - https://en.cppreference.com/w/cpp/language/copy_constructor
  - https://en.cppreference.com/w/cpp/language/copy_assignment
---

## `Account` defines a copy constructor and a *copy assignment operator*, the function `x = y;` calls. Which of the two runs on the second line?

```cpp
Account a{"alice"};
Account b = a;
```

---

**The copy constructor: it builds the new `b`.**

`b` does not exist before this line, so this `=` is part of
*initialising* a new object, not an assignment. Copy assignment runs only
on an object already alive, as in a later `b = a;`. Ask: does this line
create the object on the left?
