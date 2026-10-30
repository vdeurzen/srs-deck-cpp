---
id: vec-push-back-fast-path
kind: chunk
version: 1
level: 4
tags: [vector, low-latency, inlining, implement-std]
expose_ms: 9000
compile: null # two members out of a class: graded by text, see below
requires:
  - vec-realloc-order
refs:
  - https://en.cppreference.com/w/cpp/language/attributes/likely
  - https://gcc.gnu.org/onlinedocs/gcc/Common-Function-Attributes.html
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/stl_vector.h
---

```cpp
[[gnu::cold, gnu::noinline]] void realloc_append(const T& x);
void push_back(const T& x) {
    if (n != cap) [[likely]] {
        std::construct_at(b + n, x);
        ++n;
    } else realloc_append(x);
}
```
---

**Hot/cold splitting.** The common case, spare capacity, is a compare,
one construction and an increment: small enough to inline at every call
site. Growth (allocate, relocate, free) is rare and large, so it lives
out of line: `noinline` keeps it from bloating each caller, `cold` moves
it away from hot code, and `[[likely]]` lays the fast branch out as the
fall-through.

libstdc++ has the same shape: an inline fast path and an out-of-line
growth member. The GCC attributes are an implementation choice, not
the standard's. The snippet is two members of a `Vec<T>` class (`b`,
`n`, `cap`).
