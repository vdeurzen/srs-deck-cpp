---
id: trace-vector-growth
kind: trace
version: 2
level: 2
tags: [tracing, sequences, amortised]
probes:
  1: { "v.size()": "1", "v[0]": "1" }
  2: { "v.size()": "2", "v[0]": "1" }
  3: { "v.size()": "3", "v[0]": "1" }
  4: { "v.size()": "4", "v[0]": "0", "v[1]": "1" }
requires:
  - foundations-growth-factor
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
  - https://en.cppreference.com/w/cpp/container/vector/reserve
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc++-v3/include/bits/stl_vector.h
  - https://github.com/llvm/llvm-project/blob/main/libcxx/include/__vector/vector.h
  - https://github.com/microsoft/STL/blob/main/stl/inc/vector
---

```cpp
#include <vector>

int main() {
  std::vector<int> v;
  v.reserve(2);
  v.push_back(1);           // @1
  v.push_back(2);           // @2
  v.push_back(3);           // @3
  v.insert(v.begin(), 0);   // @4
}
```

---

The values are mandated; what happens underneath is the lesson.
`reserve(2)` guarantees room for two, so the first two pushes touch no
existing element. The third may exceed the capacity: the vector then
allocates a bigger block, **moves every element**, frees the old one —
an O(n) push that invalidates every iterator, pointer and reference.
The front `insert` shifts every element up one slot: `v[0]` becomes 0
and the old first element is now `v[1]`.

Capacity is implementation-defined, so it is not probed: libstdc++ and
libc++ give 2 then 4 (doubling), MSVC grows by 1.5×. The standard asks
only for amortised O(1) `push_back`.

Verified by compiling and running this program under GCC 16.2.
