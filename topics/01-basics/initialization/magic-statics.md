---
id: initialization-magic-statics
kind: basic
version: 1
level: 3
tags: [initialization, concurrency]
refs:
  - https://en.cppreference.com/w/cpp/language/storage_duration#Static_local_variables
---

## Is initializing a function-local `static` thread-safe, and what does the standard call this guarantee?

Yes, since C++11: if control enters the declaration of a function-local
`static` concurrently while it is being initialized, the other threads
**block** until initialization completes. This is informally called
"magic statics".

It makes the classic lazy Meyers' singleton safe without a hand-written
mutex:

```cpp
Widget& instance() {
    static Widget w; // initialized exactly once, race-free
    return w;
}
```

The one-time initialization itself is still not free — the compiler emits
a guard variable checked on every call — so a hot path that does not need
laziness may prefer initializing at namespace scope instead.
