---
id: class-struct-vs-class
kind: basic
version: 1
level: 1
tags: [classes, access]
requires:
  - class-struct-members
elaborate: Say in one sentence how C++'s `private` compares with Go's lower-case, package-private names.
refs:
  - https://en.cppreference.com/w/cpp/language/class
  - https://en.cppreference.com/w/cpp/language/access
---

## Exactly one assignment below fails to compile. Which one?

```cpp
struct Pixel  { int x; };
class  Sample { int x; };

void fill() {
    Pixel p;   p.x = 1;
    Sample s;  s.x = 1;
}
```

---

**`s.x = 1`: members of a `class` are `private` by default.**

That default is the only difference between the two keywords; a `struct`'s
members (and bases) start out `public`. Add `public:` and `Sample` behaves
exactly like `Pixel`. Convention: `struct` for a plain bundle of data,
`class` when the members guard a rule.
