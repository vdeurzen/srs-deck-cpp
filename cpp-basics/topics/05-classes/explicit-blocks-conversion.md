---
id: class-explicit-blocks-conversion
kind: cloze
version: 1
level: 1
tags: [classes, constructors, conversions]
requires:
  - class-converting-constructor
refs:
  - https://en.cppreference.com/w/cpp/language/explicit
---

Add the keyword that makes the second call a compile error while the
first still compiles.

```cpp
struct Celsius {
    {{c1::explicit::a keyword}} Celsius(double d);
};
void heat(Celsius c);

heat(Celsius{21.5});   // must compile
heat(21.5);            // must not compile
```
