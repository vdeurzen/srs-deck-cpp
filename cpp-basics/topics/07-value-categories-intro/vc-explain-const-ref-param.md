---
id: vc-explain-const-ref-param
kind: explain
version: 1
level: 2
tags: [value-categories, references, temporaries]
requires:
  - vc-const-ref-binds-both
  - cpp-essentials/vc-rvalue-ref-binds-temporaries
refs:
  - https://en.cppreference.com/w/cpp/language/value_category
  - https://en.cppreference.com/w/cpp/language/reference_initialization
---

Explain to a newcomer why `void print(const std::string& s)` accepts
both `print(name)` (with `std::string name;`) and `print("hi")`, while
`void print(std::string& s)` accepts only the first.

---

- [ ] `name` is an lvalue: it names an object with identity (you can take `&name`)
- [ ] `"hi"` is not a `std::string`; converting it creates a temporary `std::string`, a prvalue
- [ ] A non-const `T&` binds only to lvalues, because a write into a temporary would be lost unseen
- [ ] `const T&` binds lvalues and temporaries alike, since it promises not to write
- [ ] By contrast, a `std::string&&` parameter would accept `"hi"` but refuse `name`: it binds only rvalues
