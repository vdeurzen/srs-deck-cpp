---
id: ptr-trace-arithmetic
kind: trace
version: 1
level: 1
tags: [pointers, arrays, tracing]
requires:
  - ptr-arith-counts-elements
probes:
  1: { x: "30" }
  2: { gap: "2", y: "50" }
  3: { w: "0" }
refs:
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Additive_operators
  - https://en.cppreference.com/w/cpp/language/operator_member_access#Built-in_subscript_operator
---

```cpp
int v[5] = {10, 20, 30, 40, 50};
int* p = v;
p += 2;
int x = *p;              // @1
int* q = p + 2;
long gap = q - p;
int y = *q;              // @2
p[1] = 0;
int w = v[3];            // @3
```

---

`p += 2` moves from `v[0]` to `v[2]`, so `x` is 30. `q = p + 2` is
`&v[4]` (50), and `q - p` is 2: subtracting pointers into one array
counts the elements between them. `p[i]` means `*(p + i)`, so `p[1]` is
`v[3]` (measured from where `p` now is, not from `v[0]`), and `w` reads
the 0 just stored there.
