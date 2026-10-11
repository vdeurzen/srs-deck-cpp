---
id: ptr-nullptr-overload
kind: code
version: 1
level: 1
tags: [pointers, nullptr, overload-resolution]
requires:
  - ptr-holds-an-address
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

`pick` has one overload for a number and one for a C string. The
compiler calls the overload whose parameter type best matches the
argument (an exact type match beats a conversion). Pass "no string at
all" so that the pointer overload is chosen.

```cpp
#include <cstddef>
constexpr int pick(int) { return 1; }
constexpr int pick(const char*) { return 2; }
static_assert(pick({{c1::nullptr}}) == 2);
```

---

`nullptr` has its own type, `std::nullptr_t`, which converts to any
pointer type and to no integer type, so only `pick(const char*)` is
viable. `0` is an `int` first: an exact match for `pick(int)`. `'\0'` is
a `char`, promoted to `int`. `NULL` is an implementation-defined null
pointer constant; in libstdc++ it is an integer (`__null`), so GCC
reports the call as ambiguous. Write `nullptr` whenever you mean "points
nowhere".
