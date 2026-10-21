---
id: seq-go-slice-aliasing
kind: basic
version: 2
level: 3
tags: [buffers, views, aliasing, misconception]
elaborate: Where in your code is a scratch vector cleared and refilled while something still holds a view or pointer into it?
requires:
  - seq-go-slice-header
  - cpp-essentials/vector-reserve-basics
refs:
  - https://en.cppreference.com/w/cpp/container/vector/clear
  - https://en.cppreference.com/w/cpp/container#Iterator_invalidation
---

Many expect `clear()` to give a `std::vector` up, so a view into it
either keeps the old bytes or crashes.

```cpp
std::vector<char> buf;
buf.reserve(64);
append_msg(buf);                        // 10 bytes, starts "alice..."
std::string_view v(buf.data(), 5);
buf.clear();
append_msg(buf);                        // 10 bytes, starts "bobby..."
```

## What does `v` show after the second `append_msg`?

---

**`"bobby"`: `clear()` keeps the capacity, so the refill reuses the same array.**

Tempting because `clear` sounds like freeing. Had the refill outgrown
the capacity, the vector would have reallocated and `v` would dangle:
which one happens depends on a capacity the code holding `v` cannot see.
