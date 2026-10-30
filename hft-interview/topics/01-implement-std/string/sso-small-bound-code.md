---
id: sso-small-bound-code
kind: code
version: 1
level: 4
tags: [strings, sso, implement-std]
input: chips
choices:
  c1:
    - "len < sizeof buf"
    - "len <= sizeof buf"
    - "len < sizeof buf - 1"
    - "len < sizeof(Str)"
compile:
  harness: |
    consteval bool test() {
      Str a("fifteen chars!!", 15), b("sixteen chars!!!", 16);
      return a.p == a.buf && a.p[15] == '\0' && b.p != b.buf && b.p[16] == '\0';
    }
    static_assert(test());
    int main() {}
requires:
  - sso-null-terminator-capacity
  - sso-layout
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/string.accessors#1
  - https://github.com/gcc-mirror/gcc/blob/releases/gcc-14.2.0/libstdc%2B%2B-v3/include/bits/basic_string.h#L207-L213
elaborate: Your buffer grows to 24 bytes to fill the padding. Which number in your code has to change, and which stays a derived expression?
---

The interviewer: "Write the constructor of a small-string type." `p`
always holds the data pointer and aims at `buf` for a short string.
Complete the test that decides when `buf` is used.

```cpp
#include <algorithm>
#include <cstddef>
struct Str {
  char* p;  std::size_t n;  char buf[16];
  constexpr Str(const char* s, std::size_t len)
      : p({{c1::len < sizeof buf}} ? buf : new char[len + 1]), n(len) {
    std::copy_n(s, len, p);  p[len] = '\0';
  }
  Str(const Str&) = delete;                      // p may point into *this
  constexpr ~Str() { if (p != buf) delete[] p; }
};
```

---

**`len < sizeof buf`: the terminator needs the last byte, so 16 bytes
hold 15 characters.** The constructor writes `len + 1` chars.

- `len <= sizeof buf` puts a 16-char string inline and writes its `'\0'`
  at `buf[16]`, one past the end.
- `len < sizeof buf - 1` is safe but wastes a byte: a 15-char string
  goes to the heap.
- `sizeof(Str)` is the whole object, 32 bytes on x86-64, not the
  buffer: a 16-char string overflows `buf`.

libstdc++'s `std::string` makes the same choice with a 16-byte buffer,
so its short capacity is 15 (implementation behaviour, not the
standard's).
