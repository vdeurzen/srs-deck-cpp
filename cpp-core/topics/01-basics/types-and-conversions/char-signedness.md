---
id: types-char-signedness
kind: basic
version: 1
level: 3
tags: [types, integers, undefined-behaviour]
requires:
  - types-integral-promotion
refs:
  - https://en.cppreference.com/w/cpp/language/types#Character_types
  - https://en.cppreference.com/w/cpp/string/byte/isalpha
---

## On x86-64 Linux, `char c` holds the Latin-1 byte `0xE9` (é). Why is `std::isalpha(c)` undefined behaviour?

---

**Plain `char` is signed there, so `c` is `-23`, and `<cctype>` functions
accept only `unsigned char` values or `EOF`.** Write
`std::isalpha(static_cast<unsigned char>(c))`. Whether `char` is signed
is implementation-defined (unsigned on ARM Linux); it is a distinct type
from both `signed char` and `unsigned char`.
