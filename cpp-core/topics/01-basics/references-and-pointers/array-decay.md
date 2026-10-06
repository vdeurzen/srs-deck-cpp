---
id: ptr-array-decay
kind: cloze
version: 1
level: 1
tags: [pointers, arrays]
refs:
  - https://en.cppreference.com/w/cpp/language/implicit_conversion#Array-to-pointer_conversion
  - https://en.cppreference.com/w/cpp/container/span
---

`int samples[8]` names eight `int`s stored contiguously, and with a 4-byte
`int` `sizeof(samples)` is {{c1::32::all the elements, not a pointer}}.
Pass it to `void f(int* p)` and it undergoes array-to-pointer conversion:
`f` receives {{c2::a pointer to the first element::what `f` sees}} and
nothing else, so the length has to travel separately. That is why C APIs
take `(ptr, count)`, and why `std::span<int>` is
{{c3::a pointer and a length::two words, no copy of the elements}} over
the same storage — a Go slice is the same header with a capacity added.
