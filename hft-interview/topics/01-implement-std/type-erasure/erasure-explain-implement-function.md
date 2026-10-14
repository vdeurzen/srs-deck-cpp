---
id: erasure-explain-implement-function
kind: explain
version: 1
level: 4
tags: [type-erasure, callables, implement-std]
requires:
  - erasure-fnptr-vtable
  - erasure-sbo-nothrow-move
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/func.wrap.func
  - https://en.cppreference.com/w/cpp/utility/functional/function
  - https://github.com/gcc-mirror/gcc/blob/releases/gcc-14.2.0/libstdc%2B%2B-v3/include/bits/std_function.h
---
The interviewer: "Implement `std::function<R(Args...)>`, without virtual
functions." Talk it through: what the object stores, how a call reaches
the target, and what moving and copying it do.
---
- [ ] Only the signature is in the type: a constructor template accepts any callable `F` invocable as `R(Args...)`, and nothing outside it knows `F` afterwards
- [ ] Per-`F` operations (a static table of function pointers, or one manager function) take the target as `void*` and are the only code that still knows `F`
- [ ] Small targets sit in an inline buffer and others on the heap, so that the wrapper's own move stays `noexcept`
- [ ] Copying the wrapper clones the target through the per-`F` operations, so `F` must be copy-constructible (C++23's `std::move_only_function` lifts this)
- [ ] The destructor runs the per-`F` destroy: `delete` for a heap target, `std::destroy_at` for an inline one
