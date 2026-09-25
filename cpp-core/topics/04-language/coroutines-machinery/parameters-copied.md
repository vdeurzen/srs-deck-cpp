---
id: coroutines-parameters-copied
kind: basic
version: 1
level: 4
tags: [coroutines, lifetimes]
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
---

## A coroutine's parameters are copied into its frame. Why does that not save a `const std::string&` parameter from dangling?

---

Because what gets copied into the frame is **the parameter**, and the
parameter *is* the reference. Copying a `const std::string&` copies the
reference, not the string; the frame ends up pointing at whatever the
caller passed. The same goes for a `std::string_view`, a pointer, or a
`std::span` — the frame owns the handle, never the data behind it.

That is harmless for an eager coroutine that finishes inside the call,
and fatal for a lazy one:

```cpp
Generator<char> chars(const std::string& s);   // lazy: body runs later
auto g = chars(std::string{"hello"});          // temporary dies here
for (char c : g) { /* reads freed memory */ }
```

The temporary is destroyed at the end of the full-expression that
created the coroutine — which is *before* the body ever runs, because
`initial_suspend()` suspended first. Taking the parameter **by value**
fixes it: then the frame really does own a `std::string`, constructed
from the argument while it is still alive.

The rule of thumb: a coroutine that outlives its call expression should
take everything it needs by value, and treat every reference parameter
as a promise the caller has to keep.
