---
id: life-misconception-shared-to-be-safe
kind: basic
version: 1
level: 2
tags: [lifetime, ownership, misconception]
requires:
  - smart-shared-ptr-intro
  - life-unique-ptr-member-no-copy
  - ptr-arrow-member
elaborate: Pick a shared_ptr in your own code. How many places really keep the object alive, and would one of them always outlive the rest?
refs:
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#rr-unique
  - https://en.cppreference.com/w/cpp/memory/shared_ptr
---

## A colleague makes every heap member a `std::shared_ptr`, reasoning that it can never free too early. After `Parser p; Parser q = p; q.step();`, what does `p.pos()` return?

```cpp
struct Lexer { int pos = 0; };
class Parser {
  std::shared_ptr<Lexer> lexer = std::make_shared<Lexer>();
public:
  void step() { ++lexer->pos; }
  int pos() { return lexer->pos; }
};
```

---

**1: the copy shares `p`'s `Lexer`, so `q.step()` moved `p` too.**
"Never frees too early" is true, which makes the choice feel safe, but it
also hides that `Parser` meant to own its `Lexer` alone. With
`std::unique_ptr<Lexer>`, `Parser q = p;` is a compile error instead.
Every copy also pays to update a shared count.
