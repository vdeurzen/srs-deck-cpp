---
id: life-misconception-shared-to-be-safe
kind: basic
version: 2
level: 2
tags: [lifetime, ownership, misconception]
requires:
  - smart-shared-ptr-intro
  - life-unique-ptr-member-no-copy
  - ptr-arrow-member
elaborate: Pick a shared_ptr member in your own code. Would a copy of its class be expected to share that object, or to own one of its own?
refs:
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#rr-unique
  - https://en.cppreference.com/w/cpp/memory/shared_ptr
---

Many expect a `std::shared_ptr` member to make copying a class safe.

```cpp
struct Lexer { int pos = 0; };
class Parser {
  std::shared_ptr<Lexer> lexer = std::make_shared<Lexer>();
public:
  void step() { ++lexer->pos; }
  int pos() { return lexer->pos; }
};
```

## After `Parser p; p.step(); Parser q = p; q.step();`, what does `p.pos()` return?

---

**2: the copy shares `p`'s `Lexer`.**

Nothing is freed twice, so it feels safe, but copying a `shared_ptr`
adds an owner, not a `Lexer`: `q.step()` moves `p` too. A
`std::unique_ptr` member makes `Parser q = p;` a compile error instead.
Each copy also updates a shared count.
