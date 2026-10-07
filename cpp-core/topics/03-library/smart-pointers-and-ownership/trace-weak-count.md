---
id: smart-pointers-trace-weak-count
kind: trace
version: 1
level: 3
tags: [smart-pointers, ownership, tracing]
requires:
  - smart-pointers-weak-ptr-breaks-cycles
probes:
  1: { n: "2", e: "false" }
  2: { n: "1", e: "false" }
  3: { n: "0", e: "true" }
refs:
  - https://en.cppreference.com/w/cpp/memory/weak_ptr/use_count
  - https://en.cppreference.com/w/cpp/memory/weak_ptr/expired
---

```cpp
std::weak_ptr<int> w;
long n; bool e;
{
    auto a = std::make_shared<int>(1);
    w = a;
    auto b = a;
    n = w.use_count(); e = w.expired();   // @1
    a.reset();
    n = w.use_count(); e = w.expired();   // @2
}
n = w.use_count(); e = w.expired();       // @3
```

---

`w` reports the strong count without being part of it. Two owners, `a`
and `b`, give `2`; assigning `w` changed nothing. `a.reset()` drops one
owner: `1`, still alive. When the block ends `b` goes too, the count hits
zero and the `int` is destroyed — `w` now says `0` and `expired()` is
`true`, yet `w` is still safe to ask: the control block it points at
outlives the object, kept by the weak count until `w` itself is
destroyed. Verified by compiling and running this program under GCC 16.2
(`g++ -std=c++23`), including a clean run under `-fsanitize=address`.
