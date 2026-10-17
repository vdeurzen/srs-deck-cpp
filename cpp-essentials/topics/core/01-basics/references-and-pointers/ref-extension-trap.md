---
id: ptr-ref-extension-trap
kind: basic
version: 1
level: 2
tags: [references, lifetime, misconception]
requires:
  - ptr-lifetime-extension
  - ptr-dangling
elaborate: Where in your code does a `const auto&` or a `std::string_view` take the result of a function call? For each one, who owns the object it refers to, and is that owner still alive on the next line?
refs:
  - https://en.cppreference.com/w/cpp/language/reference_initialization#Lifetime_of_a_temporary
  - https://timsong-cpp.github.io/cppwp/n4950/class.temporary#6
---

## "Binding `const auto&` extends a temporary's lifetime, so `name` is safe here." What actually happens on the last line?

```cpp
const std::string& first(const std::vector<std::string>& v) { return v.front(); }

const auto& name = first({"ada", "bob"});
std::size_t n = name.size();
```

---

**`name` dangles: `name.size()` is undefined behaviour.** Lifetime
extension applies only when a reference binds *directly* to a temporary
(`const auto& v = std::vector{...}`), hence the belief. Here it binds to
what `first` returns: a reference into the temporary vector, which dies at
the end of the full-expression. A function returning a reference lends its
argument's lifetime, never its own.
