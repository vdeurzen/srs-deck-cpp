---
id: trivia-mi-sizeof
kind: code
version: 1
level: 3
tags: [hft-trivia, inheritance, virtual, layout, abi]
requires:
  - cpp-essentials/virtual-vptr-sizeof
input: chips
choices:
  c1: ["2 * sizeof(void*)", "sizeof(void*)", "3 * sizeof(void*)"]
compile:
  harness: |
    static_assert(std::is_polymorphic_v<Gateway>);
    int main() {}
refs:
  - https://itanium-cxx-abi.github.io/cxx-abi/abi.html#class-types
  - https://itanium-cxx-abi.github.io/cxx-abi/abi.html#vtable
---

`Gateway` implements two interfaces and adds a virtual function of its
own. No class has data members. State its size under GCC on x86-64.

```cpp
#include <type_traits>
struct Logger  { virtual ~Logger() = default;  virtual void log() {} };
struct Session { virtual ~Session() = default; virtual void on_fill() {} };
struct Gateway : Logger, Session {
    void on_fill() override {}
    virtual void reconnect() {}
};
static_assert(sizeof(Gateway) == {{c1::2 * sizeof(void*)}});
```

---

**One vptr per polymorphic base subobject: 16 bytes.** `Logger` sits at
offset 0 and `Session` at offset 8, each with its own vptr, because a
`Session*` into a `Gateway` must find a `Session`-shaped vtable. `Gateway`
gets no third vptr: it shares the one of its *primary base* (`Logger`, the
first non-virtual polymorphic base), and `reconnect` becomes one more slot in that
vtable. One vptr is the single-inheritance picture.

This layout is the Itanium C++ ABI (GCC, Clang on Linux); the standard
specifies only behaviour, and MSVC has its own ABI.
