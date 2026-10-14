---
id: pool-pmr-no-reuse
kind: basic
version: 1
level: 4
tags: [pools, pmr, allocators, low-latency]
requires:
  - pool-pmr-arena
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/mem.res.monotonic.buffer.mem#7
  - https://timsong-cpp.github.io/cppwp/n4950/mem.res.monotonic.buffer.mem#1
  - https://en.cppreference.com/w/cpp/memory/monotonic_buffer_resource/release
elaborate: Which of your per-message buffers would suit an arena that is reset after each message?
---

```cpp
std::array<std::byte, 4096> buf;
std::pmr::monotonic_buffer_resource arena(buf.data(), buf.size(),
                                          std::pmr::null_memory_resource());
for (const Msg& m : feed) {
    std::pmr::vector<Level> levels(&arena);   // 20 levels; sizeof(Level) == 16
    decode(m, levels);
}
```

## Each message's `levels` fits in `buf` with room to spare, yet within a few messages the loop throws `std::bad_alloc`. Why?

---

**`deallocate` does nothing, so no buffer is reused: not each finished
vector's, nor the smaller ones it outgrew.** Growing by doubling
(libstdc++'s choice) to 20 allocates 1, 2, 4, …, 32 levels: 63 × 16 ≈
1 KB per message, so 4 KB runs out in the fifth. Call `arena.release()`
at the top of each iteration.
