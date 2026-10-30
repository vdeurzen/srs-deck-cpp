---
id: smf-frame-defaulted-dtor
kind: basic
version: 1
level: 3
tags: [classes, special-members, move-semantics, misconception]
requires:
  - move-semantics-implicit-move-suppressed
elaborate: Search your own code for `~X() = default;` written "for clarity"; what would you add next to it so those classes still move?
refs:
  - https://eel.is/c++draft/class.copy.ctor#8
  - https://en.cppreference.com/w/cpp/language/move_constructor#Implicitly-declared_move_constructor
---

`std::move(x)` only casts `x` to an rvalue, which lets a move constructor be chosen.

Many expect `~Frame() = default;` to change nothing.

```cpp
struct Frame {
    std::vector<int> pixels;
    ~Frame() = default;
};
Frame a;
Frame b = std::move(a);
```

## Which constructor builds `b`: the move constructor, the copy constructor, or none (a compile error)?

---

**The copy constructor: `= default` still declares the destructor, so no implicit move constructor.**

The rule asks only whether the destructor is *declared*. The xvalue
binds the copy constructor's `const Frame&`: every pixel is copied, silently.
`Frame(Frame&&) = default;` restores the move.
