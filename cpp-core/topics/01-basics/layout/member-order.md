---
id: layout-member-order
kind: code
version: 1
level: 2
tags: [layout, padding]
input: chips
choices:
  c1: ["double d; char a; char b;", "char a; double d; char b;", "char b; double d; char a;"]
compile:
  harness: |
    static_assert(sizeof(Quote) == 16);
    int main() {}
requires:
  - layout-trailing-padding
  - layout-declaration-order
refs:
  - https://en.cppreference.com/w/cpp/language/object#Alignment
---

`struct Quote { char a; double d; char b; };` is 24 bytes on x86-64.
Complete the member list so the same three members take 16.

```cpp
struct Quote { {{c1::double d; char a; char b;}} };
```

---

With `d` in the middle, each `char` drags 7 bytes of padding with it:
1 + 7 + 8 + 1 + 7 = 24. Putting the most-aligned member first lets the
small ones share one tail: 8 + 1 + 1 + 6 = 16. The rule of thumb:
**declare members in decreasing order of alignment**. (`char a; char b;
double d;` also gives 16: the two `char`s share one gap.)
