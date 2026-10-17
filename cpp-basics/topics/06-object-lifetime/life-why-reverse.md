---
id: life-why-reverse
kind: basic
version: 1
level: 2
tags: [lifetime, destructors]
requires:
  - cpp-essentials/life-reverse-order-trace
refs:
  - https://en.cppreference.com/w/cpp/language/destructor#Destruction_sequence
  - https://eel.is/c++draft/stmt.jump#general-2
---

## `Cursor` keeps a reference to the vector it was built from. If C++ destroyed these two locals in declaration order instead of reverse order, what could go wrong?

```cpp
void scan() {
  std::vector<int> data{1, 2, 3};
  Cursor cur{data};
  // ...
}
```

---

**`~Cursor` could use its reference after `data` was destroyed.** That is
use of a dead object: undefined behaviour. An object can only depend on
things that existed when it was constructed, i.e. things declared
earlier. Destroying in reverse order guarantees those are all still alive
while it dies.
