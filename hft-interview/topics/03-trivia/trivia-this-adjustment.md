---
id: trivia-this-adjustment
kind: basic
version: 1
level: 4
tags: [hft-trivia, inheritance, virtual, abi]
requires:
  - trivia-mi-sizeof
refs:
  - https://itanium-cxx-abi.github.io/cxx-abi/abi.html#mangling-special-thunks
  - https://timsong-cpp.github.io/cppwp/n4950/conv.ptr#3
elaborate: What does `static_cast<Session*>(p)` compile to when `p` might be null, and why can't it be a plain add?
---

```cpp
struct Logger  { virtual void log(); };
struct Session { virtual void on_fill(); };
struct Gateway : Logger, Session { void on_fill() override; };
Gateway g;
Session* s = &g;    // Itanium ABI, x86-64: s is 8 bytes past &g
s->on_fill();       // runs Gateway::on_fill
```

## `Gateway::on_fill` expects `this == &g`, but the call passes `s`. What fixes up `this`?

---

**A thunk: `Session`'s vtable slot points at a stub that adjusts `this` first.**
`Logger` occupies offset 0, so the `Session` subobject starts at 8. GCC's
`non-virtual thunk to Gateway::on_fill()` typically subtracts 8 from
`this`, then jumps or inlines the body. A call where the dynamic type is
known may call `Gateway::on_fill` directly, with no thunk. (Itanium ABI.)
