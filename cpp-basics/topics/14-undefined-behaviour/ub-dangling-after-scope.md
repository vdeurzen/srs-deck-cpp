---
id: ub-dangling-after-scope
kind: cloze
version: 1
level: 1
tags: [undefined-behaviour, lifetime, pointers]
requires:
  - ub-passing-tests-prove-nothing
  - life-scope-automatic
  - ptr-holds-an-address
refs:
  - https://en.cppreference.com/w/cpp/language/lifetime
  - https://eel.is/c++draft/basic.life
---

```cpp
int* p = nullptr;
{
    int n = 42;
    p = &n;
}
int v = *p;
```

`n` is destroyed at {{c1::the closing brace of its block::a point in the code}}.
From there on `p` is a {{c2::dangling::the name for this kind of pointer}}
pointer: it still holds an address, but no object lives there, so `*p` is
undefined behaviour, even if it happens to read 42.
