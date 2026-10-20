---
id: initialization-magic-statics
kind: basic
version: 1
level: 3
tags: [initialization, concurrency]
requires:
  - life-function-local-static
  - conc-thread-shares-memory
refs:
  - https://en.cppreference.com/w/cpp/language/storage_duration#Static_local_variables
  - https://timsong-cpp.github.io/cppwp/n4950/stmt.dcl#3
elaborate: Where in your own code is a shared object built lazily on first use, and what would two threads racing to build it have cost before C++11?
---

`Widget& instance()` returns a reference: the caller gets the object
itself, not a copy.

```cpp
Widget& instance() {
    static Widget w;
    return w;
}
```

## Two threads call `instance()` for the first time at once. How many `Widget`s get constructed?

---

**Exactly one; the second thread blocks until it is built.** Since C++11,
if control enters a function-local `static`'s declaration while it is
being initialized, the other thread waits for completion ([stmt.dcl]/3,
informally "magic statics"). So one lazily built shared instance (the
"Meyers singleton") needs no locking code of your own.
