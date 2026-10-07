---
id: seq-inline-capacity-self-pointer
kind: basic
version: 1
level: 4
requires:
  - seq-inline-capacity
tags: [containers, lifetime]
refs:
  - https://llvm.org/docs/ProgrammersManual.html#llvm-adt-smallvector-h
  - https://en.cppreference.com/w/cpp/language/move_constructor
---

## A hand-rolled small vector moves by copying the source's `begin_` pointer, then clearing the source. When does that leave the new object broken?

```cpp
SmallVec(SmallVec&& o) : begin_(o.begin_), size_(o.size_) { o.size_ = 0; }
```

---

**When `o` is in inline mode: `begin_` points into `o`'s own buffer.**
The new object reads and writes the source's storage and dangles once
`o` is destroyed. An inline move must copy the elements and point at its
own buffer.
