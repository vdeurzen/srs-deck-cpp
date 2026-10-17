---
id: virtual-destructor
kind: code
version: 1
level: 2
tags: [inheritance, virtual, lifetime]
input: chips
choices:
  c1: ["virtual ~Logger() = default;", "~Logger() = default;", "~Logger() override = default;", "virtual ~Logger() = delete;"]
compile:
  harness: |
    static_assert(std::has_virtual_destructor_v<Logger>);
    int main() {
        std::unique_ptr<Logger> p = std::make_unique<FileLogger>();
    }
requires:
  - virtual-static-dispatch
  - virtual-delete-through-base
refs:
  - https://en.cppreference.com/w/cpp/language/virtual#Virtual_destructor
  - https://eel.is/c++draft/expr.delete#3
---

`p` owns a `FileLogger` through a `Logger` pointer. When `p` goes out of
scope, `FileLogger`'s `path` must be destroyed too. Complete `Logger`.

```cpp
#include <memory>
#include <string>
#include <type_traits>
struct Logger {
    {{c1::virtual ~Logger() = default;}}
    virtual void write(int) {}
};
struct FileLogger : Logger {
    std::string path = "/var/log/payments/service-01.log";
};
```

---

`delete` through a `Logger*` (what `unique_ptr<Logger>` does) calls the
destructor of the **static** type. Without `virtual`, the behaviour is
undefined; in practice only `~Logger` runs, so `path`'s heap buffer leaks
(32 characters: more than libstdc++'s 15-character small-string buffer).
A virtual destructor dispatches to `~FileLogger` first, then `~Logger`.
Rule: a base class meant for deletion through a base pointer gets a public
virtual destructor (or a protected non-virtual one to forbid that use).
