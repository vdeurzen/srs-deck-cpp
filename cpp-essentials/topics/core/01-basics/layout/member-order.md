---
id: layout-member-order
kind: code
version: 1
level: 2
tags: [layout, padding]
input: chips
choices:
  c1:
    - "double d; char a; char b;"
    - "char b; double d; char a;"
    - "double d; char a; char b; char pad[6];"
    - "float d; char a; char b;"
compile:
  harness: |
    static_assert(sizeof(Quote) == 16);
    constexpr bool same_three_members() {
      auto [m1, m2, m3] = Quote{};
      return sizeof(m1) + sizeof(m2) + sizeof(m3) == 10;
    }
    static_assert(same_three_members(), "not the original double and two chars");
    int main() {}
requires:
  - layout-trailing-padding
  - layout-declaration-order
elaborate: Pick a struct you have written recently; say aloud which member you would move first and how many bytes that saves.
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
double d;` also gives 16: the two `char`s share one gap.) Adding
`char pad[6]` only names the padding the compiler would insert anyway,
and turning `d` into a `float` changes the data, not the layout.
