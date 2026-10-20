---
id: class-friend-basics
kind: basic
version: 1
level: 1
tags: [classes, friend, access]
requires:
  - class-struct-members
  - class-struct-vs-class
refs:
  - https://en.cppreference.com/w/cpp/language/friend
  - https://eel.is/c++draft/class.friend
elaborate: Say in one sentence why a `friend` defined inside the class weakens encapsulation less than making `cents` public.
---

```cpp
class Money {
    int cents;
    friend bool same(Money a, Money b) { return a.cents == b.cents; }
};
```

## `cents` is private. Given two `Money` objects `x` and `y`, which call compiles: `x.same(y)` or `same(x, y)`?

---

**`same(x, y)`: a `friend` is a non-member function granted private access.**

Writing it inside the class does not make it a member, so it has no
object to be called on and takes both `Money`s as parameters. Only the
class can grant this access, by naming the function `friend`.
