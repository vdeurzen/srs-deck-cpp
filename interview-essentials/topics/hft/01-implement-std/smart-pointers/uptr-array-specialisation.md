---
id: uptr-array-specialisation
kind: basic
version: 1
level: 2
tags: [smart-pointers, new-delete, implement-std, misconception]
elaborate: Which type for `buf` makes its deleter match `new Tick[1024]`, and would `std::vector<Tick>` serve you better?
requires:
  - cpp-essentials/smart-unique-ptr-intro
  - cpp-essentials/life-delete-matches-new
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/unique.ptr.runtime#1
  - https://en.cppreference.com/w/cpp/memory/unique_ptr
---

Many expect a `std::unique_ptr` to free whatever `new` handed it.

## `Tick` is a struct, and `std::unique_ptr<Tick> buf(new Tick[1024]);` compiles. What happens when `buf` is destroyed?

---

**Undefined behaviour: its default deleter runs `delete`, not `delete[]`,
on an array.** `unique_ptr<Tick>` uses `default_delete<Tick>`, which
assumes one object, and the pointer type `Tick*` can't say whether it
came from `new` or `new[]`. The mismatch compiles silently; only the
template argument can carry "array".
