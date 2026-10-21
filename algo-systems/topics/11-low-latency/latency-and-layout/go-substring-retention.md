---
id: ll-go-substring-retention
kind: basic
version: 2
level: 3
tags: [memory, ownership, zero-copy]
requires:
  - cpp-essentials/smart-shared-ptr-intro
  - cpp-essentials/strings-string-view-intro
elaborate: Where in a zero-copy design you know does a small, long-lived piece point into a large buffer, and where would you copy it out?
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr
  - https://en.cppreference.com/w/cpp/string/basic_string_view
---

Each response arrives in its own 1 MB buffer owned by a
`std::shared_ptr`. To avoid copies, a session keeps its 16-byte id as a
slice of that buffer, for hours:

```cpp
struct IdSlice {
    std::shared_ptr<const std::vector<char>> buf;
    std::string_view id;            // points into *buf
};
```

## Memory grows by about 1 MB per live session, not 16 bytes. Why?

---

**Each slice's `shared_ptr` keeps its whole 1 MB buffer alive.**

The buffer is freed only when its last owner goes, and every session is
an owner. Zero-copy is right for short-lived pieces; anything kept long
should copy its 16 bytes into an owning `std::string`.
