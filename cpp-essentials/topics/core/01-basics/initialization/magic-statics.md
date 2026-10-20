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

## In C++23, two threads call `instance()` for the first time at once. How many `Widget`s get constructed?

---

**Exactly one; the second thread blocks until it is built.** If a thread
reaches a function-local `static` while another is initializing it, it
waits for completion ([stmt.dcl]/3, guaranteed since C++11). A lazily
built shared instance needs no locking code of your own.
