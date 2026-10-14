---
id: sso-layout
kind: basic
version: 1
level: 4
tags: [strings, sso, layout, implement-std]
elaborate: Your own small-buffer type must decide the same thing. Would you rather pay a branch on every access or bytes in every object?
requires:
  - cpp-core/strings-sso
refs:
  - https://github.com/gcc-mirror/gcc/blob/releases/gcc-14.2.0/libstdc%2B%2B-v3/include/bits/basic_string.h#L201-L213
  - https://github.com/llvm/llvm-project/blob/llvmorg-19.1.0/libcxx/include/string#L891-L909
  - https://github.com/llvm/llvm-project/blob/llvmorg-19.1.0/libcxx/include/string#L2004-L2009
  - https://en.cppreference.com/w/cpp/string/basic_string/data
---

## On x86-64, libstdc++'s `std::string` is 32 bytes against libc++'s 24. What do libstdc++'s extra 8 bytes buy?

---

**`data()` is a single load of a stored pointer, with no short/long branch.**
libstdc++ always stores a data pointer and a size; a short string's
pointer aims at the buffer inside the object. libc++ packs a short
string into all 24 bytes, so a flag bit marks short or long, and
`data()` tests it first. Implementation behaviour, not the standard's.
