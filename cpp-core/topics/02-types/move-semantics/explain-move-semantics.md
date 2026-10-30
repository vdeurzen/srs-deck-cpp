---
id: move-semantics-explain
kind: explain
version: 3
level: 4
tags: [move-semantics]
requires:
  - cpp-essentials/move-semantics-explain-mechanism
  - move-semantics-explain-special-members
  - cpp-essentials/move-semantics-explain-lost-moves
  - cpp-essentials/move-semantics-vector-move-if-noexcept
elaborate: Which single change to `Widget` would you make first, and which of these copies would it still leave?
refs:
  - https://en.cppreference.com/w/cpp/language/move_constructor
  - https://en.cppreference.com/w/cpp/utility/move_if_noexcept
---
```cpp
struct Cache { Cache(const Cache&); Cache(Cache&&); };
struct Widget {
    const std::string id;
    Cache cache;
    ~Widget() { flush(); }
};
```
`v.push_back(std::move(w))` and `return std::move(w2);` copy a `Widget`
where a move was intended. An interviewer asks why. Explain it to them.
---
- [ ] `std::move(w)` is only a cast to an xvalue; the constructor chosen decides whether anything moves
- [ ] `~Widget()` suppresses the implicit move constructor, so the xvalue binds `const Widget&` and copies
- [ ] Even a defaulted move would copy `id`: a `const std::string` member cannot be moved from
- [ ] On reallocation the vector copies anyway: `Cache`'s move isn't `noexcept`, so a defaulted `Widget` move isn't either
- [ ] `return std::move(w2);` also blocks NRVO, which plain `return w2;` would allow
