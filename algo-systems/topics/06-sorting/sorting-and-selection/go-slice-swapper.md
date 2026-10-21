---
id: sort-go-slice-swapper
kind: basic
version: 2
level: 4
tags: [sorting, move-semantics, memory]
requires:
  - cpp-essentials/move-vs-copy-intro
  - sort-introsort
elaborate: Which element type you sort is large and has no cheap move, and what would you sort instead of the elements themselves?
refs:
  - https://en.cppreference.com/w/cpp/algorithm/sort
  - https://en.cppreference.com/w/cpp/string/basic_string/basic_string
---

## `std::sort` reorders a `std::vector<std::string>` of 10⁶ strings, each 1 KB long. With libstdc++, what does moving one element during the sort copy?

---

**The 32-byte `std::string` object; its 1 KB of characters never move.**

`std::sort` moves elements, and a long string's move takes over the
heap pointer, size and capacity. A type with no cheap move, such as a
1 KB array inside a struct, copies all its bytes on every move.
