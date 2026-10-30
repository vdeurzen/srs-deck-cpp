---
id: ptr-array-decay
kind: cloze
version: 1
level: 1
tags: [pointers, arrays]
requires:
  - cpp-basics/ptr-pass-whole-array
refs:
  - https://en.cppreference.com/w/cpp/language/implicit_conversion#Array-to-pointer_conversion
  - https://en.cppreference.com/w/cpp/container/span
---

`int samples[8]` names eight `int`s stored contiguously, and with a 4-byte
`int` `sizeof(samples)` is {{c1::32::in bytes}}.
Pass it to `void f(int* p)` and it undergoes array-to-pointer conversion:
`f` receives {{c2::a pointer to the first element::what `f` sees}} and
nothing else. A `std::span<int>` over the same storage holds
{{c3::a pointer and a length::what does it store?}}, and copies none of
the elements.
