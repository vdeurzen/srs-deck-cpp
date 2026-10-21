---
id: seq-go-subslice-capacity
kind: basic
version: 2
level: 3
tags: [buffers, views, hashing, lifetime]
requires:
  - seq-go-slice-header
  - cpp-essentials/map-unordered-map-intro
elaborate: If copying every key were too slow, what would you make own the key bytes instead, and how long would it live?
refs:
  - https://en.cppreference.com/w/cpp/string/basic_string_view
  - https://en.cppreference.com/w/cpp/container/unordered_map
---

A zero-copy parser counts symbols across many messages. Each message's
buffer is freed once that message is parsed.

```cpp
std::unordered_map<std::string_view, int> counts;   // lives all day
void on_message(std::string_view sym) {             // sym points into the buffer
    ++counts[sym];
}
```

## What goes wrong after the first buffer is freed?

---

**The stored keys dangle: later lookups hash and compare freed memory.**

A map stores its keys by value, and a `string_view`'s value is only a
pointer and a length. Keys that outlive their buffer must own their
bytes: `std::string`, or views into storage that lives as long as the map.
