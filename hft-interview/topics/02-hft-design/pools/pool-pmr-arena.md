---
id: pool-pmr-arena
kind: basic
version: 1
level: 4
tags: [pools, pmr, allocators, low-latency]
requires:
  - algo-systems/ll-arena-vs-pool
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/mem.res.monotonic.buffer.mem#4
  - https://timsong-cpp.github.io/cppwp/n4950/mem.res.global#2
  - https://timsong-cpp.github.io/cppwp/n4950/mem.res.global#3
  - https://en.cppreference.com/w/cpp/memory/monotonic_buffer_resource/monotonic_buffer_resource
elaborate: In your tests, how would you find out that the arena had quietly overflowed?
---

```cpp
std::array<std::byte, 4096> buf;
std::pmr::monotonic_buffer_resource arena(buf.data(), buf.size());
std::pmr::vector<Fill> fills(&arena);        // per-burst scratch
```

## A burst produces more fills than `buf` can hold. What does `arena` do when `buf` runs out?

---

**It allocates the next buffer from its upstream: `get_default_resource()`,
which is `new_delete_resource()`, the heap, unless `set_default_resource`
replaced it.** Nothing fails; the hot path silently calls `operator new`.
Pass `std::pmr::null_memory_resource()` as the third argument and overflow
throws `std::bad_alloc` instead: a sizing bug you see in testing.
