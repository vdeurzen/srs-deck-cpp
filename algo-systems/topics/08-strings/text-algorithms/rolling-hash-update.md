---
id: str-rolling-hash-update
kind: code
version: 1
level: 4
tags: [strings, hashing, invariants]
input: chips
choices:
  c1: ["out * top", "out", "out * B", "in * top"]
compile:
  harness: |
    #include <string_view>
    constexpr std::uint64_t hash_of(std::string_view w) {
      std::uint64_t h = 0;
      for (unsigned char c : w) h = h * B + c;
      return h;
    }
    constexpr bool rolls(std::string_view s, std::size_t k) {
      std::uint64_t top = 1;
      for (std::size_t i = 1; i < k; ++i) top *= B;
      std::uint64_t h = hash_of(s.substr(0, k));
      for (std::size_t i = k; i < s.size(); ++i) {
        h = roll(h, s[i - k], s[i], top);
        if (h != hash_of(s.substr(i - k + 1, k))) return false;
      }
      return true;
    }
    static_assert(rolls("abracadabra", 4));
    static_assert(rolls("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", 9));
    static_assert(rolls("the quick brown fox jumps over the lazy dog", 13));
    int main() {}
requires:
  - str-rolling-hash
refs:
  - https://doi.org/10.1147/rd.312.0249
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Overflows
---

A k-character polynomial hash slides one position right. `top` is
`B` to the power k − 1. Complete the term that removes the character
leaving the window.

```cpp
#include <cstdint>
constexpr std::uint64_t B = 131;
// unsigned arithmetic wraps: everything is mod 2^64
constexpr std::uint64_t roll(std::uint64_t h, unsigned char out,
                             unsigned char in, std::uint64_t top) {
  return (h - {{c1::out * top}}) * B + in;
}
```

---

The outgoing character entered as the window's first term, so by now
it carries weight B^(k−1). Subtract exactly that term, shift the rest
up one power, add the newcomer. `out` alone and `out * B` subtract the
wrong weight; `in * top` removes the wrong character.

The type is load-bearing: unsigned overflow wraps (mod 2^64), signed
overflow is undefined behaviour. Mod 2^64 is fine for chunking but weak
against adversarial input (Thue–Morse strings collide for any base), so
untrusted text needs a prime modulus and a base chosen at random.
