---
id: smart-pointers-unique-ptr-deleter-size
kind: code
version: 1
level: 3
tags: [smart-pointers, layout]
requires:
  - smart-pointers-unique-ptr-ownership
input: chips
choices:
  c1: ["Closer", "CountingCloser", "decltype(&close_file)", "std::function<void(std::FILE*)>"]
compile:
  harness: |
    static_assert(sizeof(File) == sizeof(std::FILE*),
                  "the deleter is stored inside the unique_ptr");
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/memory/unique_ptr
  - https://en.cppreference.com/w/cpp/language/ebo
---

`std::unique_ptr<T, D>` stores its deleter, a `D`, next to the pointer.
`File` must own a `std::FILE*`, close it on destruction, and cost
exactly what a raw pointer costs. Choose the deleter type.

```cpp
#include <cstdio>
#include <functional>
#include <memory>
int close_file(std::FILE* f) { return std::fclose(f); }
struct Closer { void operator()(std::FILE* f) const { close_file(f); } };
struct CountingCloser {
    int* closed;
    void operator()(std::FILE* f) const { close_file(f); ++*closed; }
};
using File = std::unique_ptr<std::FILE, {{c1::Closer}}>;
```

---

**Only a stateless deleter is free: an empty `Closer` makes `File` one
pointer wide.** The deleter is a member of the `unique_ptr`, so its size
is your size; libstdc++ stores an empty one via the empty base
optimisation (an implementation choice, not a standard guarantee).
`CountingCloser` carries a pointer, so every `File` carries a second word.
