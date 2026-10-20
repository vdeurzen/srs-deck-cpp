---
id: chunks-coroutine-frame-owner
kind: chunk
version: 1
level: 4
tags: [idioms, coroutines, raii]
requires:
  - coroutines-handle-operations
  - cpp-essentials/move-semantics-rule-of-five
expose_ms: 12000
compile: null
elaborate: What one member would make this owner movable, and what must it do to the source?
refs:
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle/destroy
---

```cpp
struct FrameOwner {
  explicit FrameOwner(std::coroutine_handle<> h) noexcept : handle(h) {}
  FrameOwner(const FrameOwner&) = delete;
  FrameOwner& operator=(const FrameOwner&) = delete;
  ~FrameOwner() { if (handle) handle.destroy(); }
  std::coroutine_handle<> handle;
};
```

---

RAII for a coroutine frame. `std::coroutine_handle` is deliberately a
raw, trivially copyable pointer with no ownership of its own, so
*something* has to decide who calls `destroy()` — and a coroutine return
type that does not is a frame leak on every call.

The two deleted members are the point, not boilerplate: copying a
handle is legal and cheap, so two owners would each destroy the same
frame. This is the rule of five applied to a resource the language
hands you unwrapped. This minimal owner is not movable either; a real
task or generator type adds a move constructor that nulls the source's
handle — same rule, one more member — and is therefore move-only.
