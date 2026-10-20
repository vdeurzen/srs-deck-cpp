---
id: vc-named-rvalue-ref-is-lvalue
kind: basic
version: 1
level: 2
tags: [value-categories, references, misconception]
requires:
  - vc-rvalue-ref-binds-temporaries
  - value-categories-std-move-cloze
elaborate: In a function of yours that takes a `T&&` parameter, where is that parameter used by name, and what does each of those uses bind to?
refs:
  - https://en.cppreference.com/w/cpp/language/value_category#lvalue
  - https://en.cppreference.com/w/cpp/language/reference#Rvalue_references
---

## "`t` is an rvalue reference, so `t` is an rvalue." Which of the two lines inside `take` compile?

```cpp
void keep(std::string&& s);
void take(std::string&& t) {
  std::string* a = &t;   // line A
  keep(t);               // line B
}
```

---

**Line A compiles; line B does not.** `t` is a name, so the expression
`t` is an lvalue: it has an address, and `std::string&&` refuses it.
`std::string&&` is `t`'s *type*: it decided what the caller could pass.
The belief mixes type with value category. Passing `t` on as an rvalue
takes an explicit cast (`std::move(t)`).
