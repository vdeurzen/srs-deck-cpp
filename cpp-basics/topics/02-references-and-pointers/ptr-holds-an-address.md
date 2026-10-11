---
id: ptr-holds-an-address
kind: basic
version: 1
level: 1
tags: [pointers]
refs:
  - https://en.cppreference.com/w/cpp/language/pointer#Pointers_to_objects
  - https://eel.is/c++draft/basic.compound#3
---

## After these two lines, what value is stored in the object `p` itself?

```cpp
int n = 5;
int* p = &n;
```

---

**The address of `n`: where `n` lives, not the `5`.** `p` is an object
of its own, with its own storage and its own address. Its value only
*designates* `n`; reaching the `5` takes one step through it, `*p`.
Copying `p` copies the address, never the `int`, so two pointers can lead
to the same `n`.
