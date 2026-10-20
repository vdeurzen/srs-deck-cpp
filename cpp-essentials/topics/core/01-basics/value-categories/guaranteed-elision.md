---
id: value-categories-guaranteed-elision
kind: code
version: 1
level: 3
tags: [value-categories, copy-elision]
input: chips
choices:
  c1: ["return Pinned{};", "Pinned local; return local;", "return std::move(Pinned{});"]
compile:
  harness: |
    constexpr Pinned p = make();
    static_assert(p.id == 7);
    int main() {}
requires:
  - class-default-delete-where
  - value-categories-std-move-cloze
  - constexpr-fn-static-assert
elaborate: Say aloud which types in your code cannot be copied or moved, and how a factory function can still return one.
refs:
  - https://en.cppreference.com/w/cpp/language/copy_elision
  - https://timsong-cpp.github.io/cppwp/n4950/dcl.init.general#16.6.1
---

`Pinned` can be neither copied nor moved. Complete `make` so that
`make()` can still initialize a `Pinned` by value.

```cpp
#include <utility>
struct Pinned {
    int id = 7;
    constexpr Pinned() = default;
    Pinned(const Pinned&) = delete;
    Pinned(Pinned&&) = delete;
};
constexpr Pinned make() {
    {{c1::return Pinned{};}}
}
```

---

`Pinned{}` is a prvalue, and since C++17 a prvalue initializes its
result object directly: through the `return` and into `p`, no temporary
is ever created, so no copy or move constructor is needed, not even an
accessible one. `std::move(Pinned{})` is an xvalue: a temporary must
exist for it to name, and the return must move from it. A named local is
an object already; returning it needs a move (or copy) constructor, even
where the compiler would skip the call.
