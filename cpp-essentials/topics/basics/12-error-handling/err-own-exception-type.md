---
id: err-own-exception-type
kind: code
version: 1
level: 2
tags: [exceptions, inheritance]
requires:
  - err-catch-by-reference-why
  - virtual-is-a
input: chips
choices:
  c1: ["std::runtime_error", "std::exception", "std::string"]
compile:
  harness: |
    #include <type_traits>
    static_assert(std::is_base_of_v<std::exception, ConfigError>);
    void load_config() { throw ConfigError("port is missing"); }
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/error/runtime_error
  - https://en.cppreference.com/w/cpp/error/exception
---

`load_config` must be able to `throw ConfigError("port is missing");`, and
a handler far up the stack, `catch (const std::exception& e)`, must print
that text through `e.what()`. Choose the base class.

```cpp
#include <stdexcept>
using Base = {{c1::std\::runtime_error}};
struct ConfigError : Base {
    using Base::Base;   // inherit Base's constructors
};
```

---

`std::runtime_error` derives from `std::exception`, takes the message in
its constructor and returns it from `what()`; inheriting its constructors
is all a custom exception needs. `std::exception` itself has no
constructor taking a message, so `ConfigError("...")` does not compile.
`std::string` can be thrown, but it is no `std::exception`, so that
handler would never see it.
