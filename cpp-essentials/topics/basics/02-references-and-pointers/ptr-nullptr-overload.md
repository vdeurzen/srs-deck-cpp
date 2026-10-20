---
id: ptr-nullptr-overload
kind: code
version: 1
level: 1
tags: [pointers, nullptr, overload-resolution]
requires:
  - ptr-holds-an-address
  - fn-overload-ranking
  - constexpr-fn-static-assert
  - std-names-and-headers
elaborate: Where in older code have you seen `0` or `NULL` passed as "no pointer", and which overload would that call pick?
input: chips
choices:
  c1: ["nullptr", "0", "NULL", "'\\0'"]
compile:
  harness: |
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/nullptr
  - https://en.cppreference.com/w/cpp/types/NULL
---

`pick` has one overload for a number and one for a C string (a
`const char*`, pointing at characters). Pass "no string at all" so that
the pointer overload is chosen.

```cpp
#include <cstddef>
constexpr int pick(int) { return 1; }
constexpr int pick(const char*) { return 2; }
static_assert(pick({{c1::nullptr}}) == 2);
```

---

**`nullptr`, the null pointer: its type converts to every pointer type and to no integer.**

So only `pick(const char*)` is viable. `0` is an `int`: an exact match
for `pick(int)`. `'\0'` is a `char`, promoted to `int`. `NULL` comes from
C; with GCC it is an integer constant, so the call is ambiguous.
