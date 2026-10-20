---
id: virtual-destructor
kind: code
version: 1
level: 2
tags: [inheritance, virtual, lifetime]
input: chips
choices:
  c1: ["virtual ~Logger() = default;", "~Logger() = default;", "~Logger() {}", "virtual ~Logger() = delete;"]
compile:
  harness: |
    #include <type_traits>
    static_assert(std::has_virtual_destructor_v<Logger>);
    int main() {
        std::unique_ptr<Logger> p = std::make_unique<FileLogger>();
    }
requires:
  - virtual-delete-through-base
  - smart-unique-ptr-intro
refs:
  - https://en.cppreference.com/w/cpp/language/virtual#Virtual_destructor
  - https://eel.is/c++draft/expr.delete#3
elaborate: Say aloud which base classes in your own code are deleted through a base pointer, and which ones should forbid that instead.
---

`p` owns a `FileLogger` through a `Logger` pointer. When `p` goes out of
scope, `FileLogger`'s `buffer` must be freed too. Complete `Logger`.

```cpp
#include <memory>
struct Logger {
    {{c1::virtual ~Logger() = default;}}
    virtual void write(int) {}
};
struct FileLogger : Logger {
    std::unique_ptr<int> buffer = std::make_unique<int>(64);
};
```

---

`delete` through a `Logger*` (what `unique_ptr<Logger>` does) calls the
destructor of the **static** type. Without `virtual`, the behaviour is
undefined; in practice only `~Logger` runs, so `buffer`'s `int` leaks.
A virtual destructor dispatches to `~FileLogger` first, then `~Logger`.
Rule: a base class meant for deletion through a base pointer gets a public
virtual destructor (or a protected non-virtual one to forbid that use).
