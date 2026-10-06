---
id: types-narrowing-braces
kind: code
version: 1
level: 1
tags: [types, conversions, initialization]
input: chips
choices:
  c1: ["static_cast<int>(ratio)", "ratio", "ratio + 0.5"]
compile:
  harness: |
    static_assert(whole == 2);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/list_initialization#Narrowing_conversions
  - https://eel.is/c++draft/dcl.init.list#7
---

`int whole = ratio;` compiled silently and dropped the fraction. The team
switched to brace initialization. Complete it so it compiles and keeps the
old, truncated value.

```cpp
constexpr double ratio = 2.5;
constexpr int whole{ {{c1::static_cast<int>(ratio)}} };
```

---

Braces reject **narrowing conversions**: floating to integer, a wider
integer to a narrower one (unless it is a constant that fits), and so on.
`int whole = ratio;` truncates without a word; `int whole{ratio};` is a
compile error. The cast is how you say "yes, I mean to drop the
fraction", and it leaves a greppable trace in the code.
