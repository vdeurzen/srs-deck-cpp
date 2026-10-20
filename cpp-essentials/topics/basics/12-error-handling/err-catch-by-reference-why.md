---
id: err-catch-by-reference-why
kind: basic
version: 1
level: 1
tags: [exceptions, references]
requires:
  - err-throw-catch-intro
  - virtual-function-intro
  - fn-param-change-intro
refs:
  - https://en.cppreference.com/w/cpp/language/catch
  - https://en.cppreference.com/w/cpp/error/exception/what
elaborate: Where else have you seen a base-class copy lose the derived part, and how would a reference have avoided it?
---

Standard exception types such as `std::runtime_error` derive from `std::exception`, and `what()` returns the message.

## `throw std::runtime_error("disk full");` is caught by `catch (std::exception e)`, and `e.what()` does not return `"disk full"`. Why not?

---

**Catching by value copies only the `std::exception` part of the thrown
object (slicing).** The copy is a plain `std::exception`, whose `what()`
text is a fixed one the library picks (libstdc++: `"std::exception"`). Write
`catch (const std::exception& e)`: the reference binds to the thrown
`runtime_error` itself, nothing is copied, and its own `what()` runs.
