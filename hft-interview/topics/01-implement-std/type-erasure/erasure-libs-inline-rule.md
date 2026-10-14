---
id: erasure-libs-inline-rule
kind: basic
version: 1
level: 5
tags: [type-erasure, callables, small-buffer, implement-std]
elaborate: Which callables you put into std::function on a hot path are not trivially copyable, and so allocate?
requires:
  - erasure-sbo-nothrow-move
refs:
  - https://github.com/gcc-mirror/gcc/blob/releases/gcc-14.2.0/libstdc%2B%2B-v3/include/bits/std_function.h#L62-L128
  - https://github.com/gcc-mirror/gcc/blob/releases/gcc-14.2.0/libstdc%2B%2B-v3/include/bits/std_function.h#L404-L413
  - https://github.com/llvm/llvm-project/blob/llvmorg-19.1.0/libcxx/include/__functional/function.h#L340-L393
---

## An 8-byte functor has a `noexcept` move and a user-written copy constructor. A nothrow-move rule would store it inline, yet `std::function` allocates for it in both libstdc++ and libc++. Which targets do they store inline?

---

**Only small targets that copy without throwing: libstdc++ demands trivially copyable, libc++ nothrow copy-constructible.**
libstdc++ (16-byte buffer) moves a `function` by copying its bytes.
libc++ (default ABI, 24-byte buffer that also holds a vptr) moves an
inline target by copying it. Either way, that functor goes on the heap.
Implementation behaviour, not the standard's.
