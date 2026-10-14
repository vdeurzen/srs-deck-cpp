---
id: erasure-function-copy-trace
kind: trace
version: 1
level: 4
tags: [type-erasure, callables, small-buffer, tracing, implement-std]
probes:
  1: { news: "0", copies: "1", moves: "0" }
  2: { news: "1", copies: "2", moves: "0" }
  3: { news: "1", copies: "2", moves: "1" }
  4: { news: "1", copies: "2", moves: "1" }
requires:
  - erasure-fnptr-vtable
  - erasure-sbo-nothrow-move
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/func.wrap.func.con
  - https://en.cppreference.com/w/cpp/utility/functional/function
elaborate: Which target size runs a target constructor per element when a `std::vector<Fn>` reallocates, and which only copies pointers?
---

Your `Fn` from `erasure-fnptr-vtable`, now with a 16-byte buffer: a
target that fits and moves `noexcept` lives in `buf`, any other behind
`ptr`. `news` counts `Fn`'s heap allocations. `Small` and `Big` count
their copy and move constructors in `copies` and `moves`; both move
`noexcept`.

```cpp
Fn(const Fn& o) : vt(o.vt) {
    if (vt->small) vt->copy(o.buf, buf);      // F(const F&) into buf
    else ptr = vt->clone(o.ptr);              // new F(*o.ptr)
}
Fn(Fn&& o) noexcept : vt(o.vt) {
    if (vt->small) vt->move(o.buf, buf);      // F(F&&) into buf
    else ptr = std::exchange(o.ptr, nullptr);
}

Fn a{Small{}}, b{Big{}};          // sizeof(Small) == 8, sizeof(Big) == 64
news = copies = moves = 0;
Fn c = a;                         // @1
Fn d = b;                         // @2
Fn e = std::move(c);              // @3
Fn f = std::move(d);              // @4
```

---

**Copying always copies the target, and a heap target also allocates;
moving a heap target only steals the pointer.** At @1 the `Small` is
copied into `c.buf`. At @2 `clone` allocates a new `Big` and copies
into it. At @3 the inline target cannot be stolen, since it lives
inside `c`, so its move constructor runs. At @4 nothing runs at all.

These values follow from C++'s rules for this code; a compiled run of
the full `Fn` on two compilers agreed.
