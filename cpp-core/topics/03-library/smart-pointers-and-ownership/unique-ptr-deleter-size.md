---
id: smart-pointers-unique-ptr-deleter-size
kind: code
version: 1
level: 3
tags: [smart-pointers, layout]
input: chips
choices:
  c1: ["Closer", "CountingCloser", "decltype(&close_file)", "std::function<void(std::FILE*)>"]
compile:
  harness: |
    static_assert(sizeof(File) == sizeof(std::FILE*),
                  "the deleter is stored inside the unique_ptr");
    int main() {}
requires:
  - smart-pointers-unique-ptr-ownership
  - staticpoly-no-unique-address
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

The deleter is a member of the `unique_ptr`, so its size is your size.
An empty class costs nothing: every major implementation stores it
through the empty base optimisation, so `File` is one pointer wide and
the close is a direct, inlinable call (a captureless lambda type works
the same way). `CountingCloser` carries state, a pointer, so every
`File` carries it too: a second word. A function pointer,
`decltype(&close_file)`, is a second word and an indirect call;
`std::function` is several words and may allocate. "Zero overhead over a
raw pointer" holds only for a stateless deleter, which is what the
default `std::default_delete` is. The one-pointer size is what the
implementations do, not a standard guarantee; GCC's libstdc++, which the
app compiles against, does it. (`&std::fclose` itself is not written:
taking the address of a standard library function is unspecified.)
