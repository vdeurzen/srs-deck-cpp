---
id: move-semantics-explain
kind: explain
version: 2
level: 4
tags: [move-semantics]
requires:
  - move-semantics-explain-mechanism
  - move-semantics-explain-special-members
  - move-semantics-explain-lost-moves
refs:
  - https://en.cppreference.com/w/cpp/language/move_constructor
---
```cpp
struct Cache { Cache(const Cache&); Cache(Cache&&); };
struct Widget {
    const std::string id;
    Cache cache;
    ~Widget() { flush(); }
};
```
`v.push_back(std::move(w))` and `return std::move(w2);` are slower than
expected. Walk through why, why nothing warns, and what one change fixes
all of it.
---
- [ ] `std::move(w)` is only a cast, and the destructor means no move constructor was declared: the xvalue binds `const Widget&` and `push_back` copies — a legal overload-resolution outcome, so no diagnostic
- [ ] Even after `Widget(Widget&&) = default;` restores the move, `id` is still copied: the defaulted move resolves overloads member by member, and a `const std::string` xvalue only binds the copy constructor
- [ ] When `v` reallocates, every element is copied: the defaulted move inherits the throwing member's exception specification, and `move_if_noexcept` refuses a move that could leave the vector half-transferred
- [ ] `return std::move(w2);` adds a cost of its own: it blocks NRVO, and since the move it forces is really a copy, the "optimisation" is a full deep copy of a local that could have been built in place
- [ ] One fix: delete the copy constructor (or drop the destructor and own via a `std::unique_ptr` member, Rule of Zero): every silent copy above then becomes either a compile error or a genuine move, because a move-only type leaves overload resolution no fallback

