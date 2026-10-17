---
id: life-misconception-shared-to-be-safe
kind: basic
version: 1
level: 2
tags: [lifetime, ownership, misconception]
requires:
  - life-shared-ptr-owners
  - life-unique-ptr-member-no-copy
elaborate: Pick a shared_ptr in your own code. How many places really keep the object alive, and would one of them always outlive the rest?
refs:
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#rr-unique
  - https://en.cppreference.com/w/cpp/memory/shared_ptr
---

## A colleague makes every heap member a `std::shared_ptr`, reasoning that it can never free too early. What does that choice cost or hide in `Parser`?

```cpp
struct Lexer { int pos = 0; };
class Parser {
  std::shared_ptr<Lexer> lexer = std::make_shared<Lexer>();
public:
  void step() { ++lexer->pos; }
};
```

---

**It hides that `Parser` alone owns its `Lexer`.** `Parser q = p;`
compiles, and both parsers now advance one shared `pos`; with
`std::unique_ptr<Lexer>` that copy is a compile error. Every copy also
pays to update a shared count. `shared_ptr` fits an object several
owners keep alive, none known to outlast the rest.
