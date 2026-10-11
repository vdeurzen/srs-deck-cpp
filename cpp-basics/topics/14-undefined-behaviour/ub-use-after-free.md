---
id: ub-use-after-free
kind: basic
version: 1
level: 1
tags: [undefined-behaviour, lifetime, pointers]
requires:
  - ub-dangling-after-scope
  - life-delete-matches-new
refs:
  - https://en.cppreference.com/w/cpp/language/delete
  - https://en.cppreference.com/w/cpp/language/lifetime
---

## What does the last line read?

```cpp
int* p = new int(7);
delete p;
int v = *p;
```

---

**Nothing defined: `delete` ended the object's lifetime, so `p` dangles
and `*p` is undefined behaviour.** `p` still holds the old address, but
that memory may already serve another allocation. It may read 7,
garbage, or crash. `-fsanitize=address` reports it as
`heap-use-after-free`.
