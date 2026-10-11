---
id: ptr-declarator-star-cloze
kind: cloze
version: 1
level: 1
tags: [pointers, declarations]
requires:
  - ptr-holds-an-address
refs:
  - https://en.cppreference.com/w/cpp/language/pointer#Syntax
  - https://en.cppreference.com/w/cpp/language/operator_member_access#Built-in_indirection_operator
---

```cpp
int n = 5;
int* p = &n;
*p = 9;
```

The same symbol `*` does two jobs here. On line 2, in a declaration, it
is part of `p`'s {{c1::type::what a declaration gives a name}}. On line 3,
in an expression, it is the {{c2::indirection::an operator's name}}
operator.
