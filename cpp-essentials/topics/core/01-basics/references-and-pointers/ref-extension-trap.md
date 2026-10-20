---
id: ptr-ref-extension-trap
kind: basic
version: 1
level: 2
tags: [references, lifetime, misconception]
requires:
  - ptr-lifetime-extension
  - ptr-dangling
elaborate: Where in your code does a `const` reference take the result of a function call? For each one, who owns the object it refers to, and is that owner still alive on the next line?
refs:
  - https://en.cppreference.com/w/cpp/language/reference_initialization#Lifetime_of_a_temporary
  - https://timsong-cpp.github.io/cppwp/n4950/class.temporary#6
---

Many expect binding a `const` reference to extend a temporary's lifetime,
so `name` would be safe here. The braces build a temporary
`std::vector<std::string>`.

```cpp
const std::string& first(const std::vector<std::string>& v) { return v[0]; }

const std::string& name = first({"ada", "bob"});
char c = name[0];
```

## What does the last line do?

---

**Reads a dangling reference: undefined behaviour.** Extension applies
only when a reference binds *directly* to a temporary
(`const std::string& s = std::string{"ada"};`), hence the belief. Here
`name` binds to what `first` returns, a reference into the temporary
vector, which dies at the end of the full-expression.
