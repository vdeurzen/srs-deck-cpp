---
id: initialization-magic-statics
kind: basic
version: 1
level: 3
tags: [initialization, concurrency]
requires:
  - raii-storage-durations
refs:
  - https://en.cppreference.com/w/cpp/language/storage_duration#Static_local_variables
  - https://timsong-cpp.github.io/cppwp/n4950/stmt.dcl#3
---

## Two threads call `instance()` for the first time at once. How many `Widget`s get constructed?

```cpp
Widget& instance() {
    static Widget w;
    return w;
}
```

---

**Exactly one; the second thread blocks until it is built.** Since C++11,
if control enters a function-local `static`'s declaration while it is
being initialized, the other thread waits for completion ([stmt.dcl]/3,
informally "magic statics"). That makes the lazy Meyers singleton
race-free without a mutex.
