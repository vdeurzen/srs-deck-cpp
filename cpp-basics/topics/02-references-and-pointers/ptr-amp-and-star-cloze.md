---
id: ptr-amp-and-star-cloze
kind: cloze
version: 1
level: 1
tags: [pointers, operators]
requires:
  - ptr-holds-an-address
refs:
  - https://en.cppreference.com/w/cpp/language/operator_member_access#Built-in_address-of_operator
  - https://en.cppreference.com/w/cpp/language/operator_member_access#Built-in_indirection_operator
---

```cpp
int n = 5;
int* p = &n;
*p = 9;
```

Applied to an object, the unary `&` in `&n` yields its
{{c1::address::a kind of value}}. Applied to a pointer, the unary `*` in
`*p = 9;` denotes {{c2::`n`::which object?}} itself.
