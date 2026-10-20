---
id: hashing-order-sensitive-hash
kind: code
version: 1
level: 2
tags: [hashing, hash-functions]
requires:
  - hashing-equal-keys-equal-hashes
input: chips
choices:
  c1: ["h * 31 + c", "h + c", "h ^ c", "c * 31 + h"]
compile:
  harness: |
    static_assert(hash("ab") != hash("ba"));
    static_assert(hash("stop") != hash("pots"));
    static_assert(hash("listen") != hash("silent"));
    static_assert(hash("ab") == hash("ab"));
    int main() {}
refs:
  - https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html#hashCode()
  - Knuth, The Art of Computer Programming, vol. 3, 2nd ed., §6.4
---

A string hash for a table of words. Many words are anagrams of each
other, and they must not all collide. Complete the update.

```cpp
#include <string_view>

constexpr unsigned hash(std::string_view s) {
  unsigned h = 0;
  for (char c : s) h = {{c1::h * 31 + c}};
  return h;
}
```

---

**Multiply the running hash before adding: each character's weight then
depends on its position.** `"ab"` is 97·31 + 98, `"ba"` is 98·31 + 97.

Adding or XOR-ing characters is order-blind, so every anagram collides;
`c * 31 + h` weights every character the same and fails the same way.
This polynomial form is the one Java's `String.hashCode` uses.
