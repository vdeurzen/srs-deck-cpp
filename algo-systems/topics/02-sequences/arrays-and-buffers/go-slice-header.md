---
id: seq-go-slice-header
kind: basic
version: 2
level: 2
requires:
  - cpp-essentials/strings-string-view-intro
  - cpp-essentials/iter-array-fixed-size
tags: [buffers, views, zero-copy]
refs:
  - https://en.cppreference.com/w/cpp/string/basic_string_view
  - https://en.cppreference.com/w/cpp/container/array
elaborate: In a parser you know, which views into the read buffer are still in use when the next message is read into it?
---

A parser reads every message into one reused buffer and hands out
views into it, copying nothing.

```cpp
std::array<char, 64> buf;
read_msg(buf);                          // buf now starts "alice..."
std::string_view name(buf.data(), 5);
read_msg(buf);                          // buf now starts "bobby..."
```

## What does `name` hold after the second `read_msg`?

---

**`"bobby"`: the view holds only a pointer and length into `buf`.**

The second read overwrote the same five bytes, and the view reads
whatever is there now. Zero-copy views are valid only until their
buffer is refilled; anything kept longer must be copied out first.
