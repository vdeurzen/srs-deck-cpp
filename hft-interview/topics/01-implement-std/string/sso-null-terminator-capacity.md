---
id: sso-null-terminator-capacity
kind: basic
version: 1
level: 3
tags: [strings, sso, implement-std]
elaborate: How does this explain why libstdc++'s 16-byte in-object buffer holds only 15 chars?
requires:
  - cpp-core/strings-sso
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/string.accessors#1
  - https://timsong-cpp.github.io/cppwp/n4950/string.access#2
  - https://github.com/gcc-mirror/gcc/blob/releases/gcc-14.2.0/libstdc%2B%2B-v3/include/bits/basic_string.h#L207-L213
---

## `c_str()` is `noexcept` and runs in constant time. What must a libstdc++ `std::string` therefore keep true after every mutation, short or long?

---

**A `'\0'` is already written right after the last character.**
`c_str()` can neither allocate nor do work proportional to the length,
and `s[s.size()]` must also read `'\0'`. So every mutation (`push_back`,
`resize`, `append`) writes the terminator itself; `c_str()` only
returns the pointer.
