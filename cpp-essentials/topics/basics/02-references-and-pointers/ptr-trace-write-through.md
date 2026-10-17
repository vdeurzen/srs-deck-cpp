---
id: ptr-trace-write-through
kind: trace
version: 1
level: 1
tags: [pointers, tracing]
requires:
  - ptr-amp-and-star-cloze
probes:
  1: { a: "10", b: "2" }
  2: { a: "10", b: "7" }
  3: { a: "10", b: "14" }
refs:
  - https://en.cppreference.com/w/cpp/language/operator_member_access#Built-in_indirection_operator
  - https://en.cppreference.com/w/cpp/language/pointer#Pointers_to_objects
---

```cpp
int a = 1, b = 2;
int* p = &a;
*p = 10;        // @1
p = &b;
*p += 5;        // @2
int* q = p;
*q = *p * 2;    // @3
```

---

`*p = 10` writes through `p` into `a`. `p = &b` has no `*`: it changes
the pointer itself, which now leads to `b`, and `a` keeps its `10`. So
`*p += 5` lands in `b` (7). `int* q = p` copies the address, not the
number: `q` and `p` now both lead to `b`, so `*q = *p * 2` reads 7 and
stores 14 into `b`. Rule of thumb: with a `*` you touch the pointee,
without one you touch the pointer.
