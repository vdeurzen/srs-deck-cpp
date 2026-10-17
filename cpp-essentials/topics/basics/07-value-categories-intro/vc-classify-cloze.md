---
id: vc-classify-cloze
kind: cloze
version: 1
level: 1
tags: [value-categories]
requires:
  - vc-lvalue-has-identity
refs:
  - https://en.cppreference.com/w/cpp/language/value_category#Primary_categories
  - https://en.cppreference.com/w/cpp/language/operator_incdec
---

```cpp
int n = 4;
int* p = &n;
```

The expression `*p` has value category {{c1::lvalue::a value category}}. The expression `n++` has value category {{c2::prvalue::a value category}}. The expression `++n` has value category
{{c3::lvalue::a value category}}.
