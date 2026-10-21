---
id: trap-go-gc-and-leaks
kind: basic
version: 2
level: 4
tags: [transfer, misconception, memory]
elaborate: Which map or vector in your service only ever grows? What removes entries from it, and who would notice if nothing did?
requires:
  - cpp-essentials/smart-unique-ptr-intro
  - cpp-essentials/map-unordered-map-intro
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map
  - https://en.cppreference.com/w/cpp/language/raii
---

Many expect that with RAII and smart pointers, modern C++ cannot leak
memory. `handle` runs once per request, for a week; nothing reads `seen`
after a request finishes.

```cpp
std::unordered_map<std::string, long> seen;   // request id -> arrival time

void handle(const std::string& req_id, long now) {
    seen[req_id] = now;
}
```

## What happens to the process's memory over the week?

---

**It grows without bound: `seen` still owns every entry.**

RAII frees what nothing owns any more; it cannot know that an owned
entry is no longer needed. Leaks in modern C++ are ownership that never
ends: caches nobody evicts, maps that only grow, threads never joined.
