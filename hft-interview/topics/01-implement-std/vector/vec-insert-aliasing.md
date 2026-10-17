---
id: vec-insert-aliasing
kind: basic
version: 1
level: 4
tags: [vector, aliasing, implement-std]
elaborate: Why doesn't constructing the new element first, the `push_back` fix, help here?
requires:
  - interview-essentials/vec-push-back-self-alias
refs:
  - https://cplusplus.github.io/LWG/issue526
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/vector.tcc
---

## A candidate's `insert(pos, const T& x)` has spare capacity, so it shifts in place. `v` is `{1, 2, 3}`. What does `v.insert(v.begin(), v.back())` leave?

```cpp
// members: T* b; std::size_t n, cap;  n < cap;  T* pos points into [b, b + n)
std::construct_at(b + n, std::move(b[n - 1]));   // grow the tail by one
std::move_backward(pos, b + n - 1, b + n);       // shift [pos, b + n - 1) right
*pos = x;
++n;
```

---

**`{2, 1, 2, 3}`: the shift moved `2` into the slot `x` refers to before `*pos = x` read it.**
LWG 526 requires this call to work. The fix is to copy `x` into a local
before shifting; libstdc++ does that with `_Temporary_value`.
