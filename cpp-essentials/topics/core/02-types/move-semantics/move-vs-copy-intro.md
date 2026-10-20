---
id: move-vs-copy-intro
kind: basic
version: 1
level: 1
tags: [move-semantics, lifetime]
requires:
  - life-shallow-copy-pointer
  - life-stack-vs-heap
  - ptr-null-pointer
refs:
  - https://en.cppreference.com/w/cpp/language/move_constructor
  - https://en.cppreference.com/w/cpp/language/delete
elaborate: Say in one sentence why a move is O(1) however many ints the buffer holds.
---

`Buf(Buf&& from)` is the move constructor: it runs when `from` is about
to be thrown away.

```cpp
struct Buf {
    int* data;           // a million ints on the heap
    Buf(Buf&& from);
    ~Buf() { delete[] data; }
};
```

## Copying a `Buf` allocates a new array and copies all million ints. What does the move constructor do instead?

---

**Takes `from`'s pointer, then sets `from.data` to `nullptr`.**

```cpp
Buf(Buf&& from) { data = from.data; from.data = nullptr; }
```

No int is copied: the new `Buf` now owns the array. Without the second
statement both destructors would `delete[]` it; `delete[]` of `nullptr`
does nothing, so `from` dies safely, empty.
