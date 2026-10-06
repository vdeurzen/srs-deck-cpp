---
id: coroutines-generator-dangling-parameter
kind: basic
version: 1
level: 4
tags: [coroutines, lifetimes, misconception]
requires:
  - coroutines-parameters-copied
  - ptr-temporary-full-expression
elaborate: Which parameter types in your own coroutines are secretly references — string_view, span, a lambda taken by const&? Pick one and decide whether the caller can really keep it alive.
refs:
  - https://en.cppreference.com/w/cpp/coroutine/generator
  - https://en.cppreference.com/w/cpp/language/coroutines
---

## "A coroutine copies its parameters into the frame, so `auto g = chars(std::string{"hi"});` followed by `for (char c : g)` is fine — the frame owns the string." Where does this go wrong?

---

**The copy is real, but it copies the *parameter*, and the parameter
is a reference.**

```cpp
std::generator<char> chars(const std::string& s) { for (char c : s) co_yield c; }
auto g = chars(std::string{"hi"});   // temporary dies at the ';'
for (char c : g) { /* use-after-free */ }
```

The frame stores a reference; the temporary dies at the end of the
full-expression, before the lazy body has run a statement. Take
`std::string s` by value and the frame owns it. A `string_view`, `span`
or `const T&` parameter is the same borrow.
