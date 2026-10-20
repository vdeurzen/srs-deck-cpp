---
id: erasure-function-copy-trace
kind: trace
version: 2
level: 4
tags: [type-erasure, callables, small-buffer, tracing, implement-std]
probes:
  1: { news: "1", copies: "1" }
  2: { moves: "1" }
  3: { news: "1", moves: "1" }
requires:
  - erasure-fnptr-vtable
  - erasure-sbo-nothrow-move
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/func.wrap.func.con
  - https://en.cppreference.com/w/cpp/utility/functional/function
elaborate: Which target size runs a target constructor per element when a `std::vector<Fn>` reallocates, and which only copies pointers?
---

A hand-written `std::function`-style `Fn` with a 16-byte buffer: a
target that fits and moves `noexcept` lives in `buf`, any other behind
`ptr`; `vt` is its table of per-type operations. `news` counts `Fn`'s
heap allocations; `copies` and `moves` count the targets' copy and move
constructors. `Small` is 8 bytes, `Big` 64; both move `noexcept`.

```cpp
Fn(const Fn& o) : vt(o.vt) {
    if (vt->small) vt->copy(o.buf, buf);      // F(const F&) into buf
    else ptr = vt->clone(o.ptr);              // new F(*o.ptr)
}
Fn(Fn&& o) noexcept : vt(o.vt) {
    if (vt->small) vt->move(o.buf, buf);      // F(F&&) into buf
    else ptr = std::exchange(o.ptr, nullptr);
}

Fn a{Small{}}, b{Big{}};
news = copies = moves = 0;
Fn d = b;                // @1
Fn e = std::move(a);     // @2
Fn f = std::move(b);     // @3
```

---

**Copying copies the target, and a heap target also allocates; moving
a heap target only steals the pointer.** At @1 `clone` allocates a new
`Big` and copies into it. At @2 the inline `Small` cannot be stolen,
since it lives inside `a`, so its move constructor runs. At @3 nothing
runs at all: `f` takes `b`'s pointer.

Values from compiling and running an instrumented copy of the full `Fn`
under GCC 16.2 (`-std=c++23 -fsanitize=address,undefined`).
