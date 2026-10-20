---
id: vc-param-binding-no-extension
kind: basic
version: 1
level: 2
tags: [value-categories, temporaries, lifetime]
requires:
  - ptr-lifetime-extension
  - string-basics
elaborate: Find a function in your code that returns a `const&` to a parameter; what happens when a caller passes it a temporary?
refs:
  - https://en.cppreference.com/w/cpp/language/reference_initialization#Lifetime_of_a_temporary
  - https://eel.is/c++draft/class.temporary#6
---

## Which of `a` and `b` can safely be used on the next line?

```cpp
const std::string& pass(const std::string& s) { return s; }

const std::string& a = std::string("abc");
const std::string& b = pass(std::string("abc"));
```

---

**Only `a`.** A temporary dies at the end of the full-expression that
created it (here, the `;`), unless a local reference binds to it
*directly*: then it lives as long as that reference. `a` binds directly.
For `b`, the temporary is bound to the parameter `s`, which never
extends past the call's full-expression; `b` dangles.
