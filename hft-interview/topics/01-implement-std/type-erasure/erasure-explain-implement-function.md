---
id: erasure-explain-implement-function
kind: explain
version: 2
level: 4
tags: [type-erasure, callables, implement-std]
requires:
  - erasure-fnptr-vtable
  - erasure-sbo-nothrow-move
  - erasure-function-copy-trace
elaborate: When would you reach for C++23's `std::move_only_function` instead, and what does it stop requiring of the target?
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/func.wrap.func
  - https://en.cppreference.com/w/cpp/utility/functional/function
  - https://github.com/gcc-mirror/gcc/blob/releases/gcc-14.2.0/libstdc%2B%2B-v3/include/bits/std_function.h
---
The interviewer: "Implement `std::function<R(Args...)>`, without virtual
functions." Talk them through your design.
---
- [ ] Only the signature is in the type; a constructor template accepts any callable invocable as `R(Args...)`
- [ ] A per-`F` table of function pointers takes the target as `void*`; it is the only code still knowing `F`
- [ ] Small targets with a `noexcept` move sit in an inline buffer, others on the heap, so moving stays `noexcept`
- [ ] Copying the wrapper clones the target through that table, so the target must be copy-constructible
- [ ] The destructor calls the table's destroy: `delete` for a heap target, `std::destroy_at` for an inline one
