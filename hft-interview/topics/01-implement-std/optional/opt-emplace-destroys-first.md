---
id: opt-emplace-destroys-first
kind: trace
version: 1
level: 4
tags: [optional, exceptions, lifetime, tracing, implement-std]
probes:
  1: { trail: "+1-1+2" }
  2: { trail: "+1-1+2-2", has: "false" }
requires:
  - interview-essentials/opt-union-storage
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/optional.assign#34
  - https://en.cppreference.com/w/cpp/utility/optional/emplace
---

```cpp
// Tok(int i) throws if i < 0, else appends "+i" to trail;
// ~Tok() appends "-id". trail starts empty.
std::optional<Tok> o;
o.emplace(1);
o.emplace(2);                              // @1
try { o.emplace(-3); } catch (int) {}
bool has = o.has_value();                  // @2
```

---

**`emplace` destroys the old value before constructing the new one.**
There is only one slot, and the new `T` is built in place, so the old
one must end first: the standard specifies `*this = nullopt`, then
construction. If that construction throws, the optional is left
*empty*; the old 2 is already gone. Your own `Opt::emplace` runs the
same three steps: destroy the old value and clear `engaged`,
`construct_at` the new one, and only then set `engaged`.

Values from compiling and running an instrumented copy with GCC 16.2
(libstdc++, `-fsanitize=address,undefined`, clean) and Clang 22 with
libc++; both agree, as the standard requires.
