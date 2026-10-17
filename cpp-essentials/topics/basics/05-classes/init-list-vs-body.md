---
id: class-init-list-vs-body
kind: trace
version: 1
level: 2
tags: [classes, constructors, initialization, tracing, misconception]
probes:
  1: { trail: "d=" }
  2: { trail: "d=c" }
requires:
  - class-init-list-required
refs:
  - https://en.cppreference.com/w/cpp/language/constructor#Member_initializer_list
elaborate: Find a constructor in your code that assigns its members in the body. Which of those members are built twice, and does it matter for their types?
---

```cpp
#include <string>
std::string trail;

struct Name {
    Name()                        { trail += 'd'; }
    Name(const char*)             { trail += 'c'; }
    Name& operator=(const char*)  { trail += '='; return *this; }
};
struct InBody { Name n; InBody() { n = "ann"; } };
struct InList { Name n; InList() : n("bob") {} };

int main() {
    InBody a;       // @1
    InList b;       // @2
}
```

---

A tempting belief: "assigning a member in the constructor body initialises
it." It doesn't. Every member is constructed **before** the body runs: with
no list entry, `InBody::n` is default-constructed (`d`), and the body's
`n = "ann"` is a second write (`=`). `InList` constructs `n` once, from
`"bob"` (`c`). Verified by running an instrumented copy under GCC 16.2
(`g++ -std=c++23`).
