---
id: spaceship-basics
kind: basic
version: 2
level: 2
tags: [comparisons]
requires:
  - types-auto-deduces
elaborate: Say in one sentence where getting less, equal and greater from one comparison saves work over calling `<` and then `==`, for example when comparing two long strings.
refs:
  - https://en.cppreference.com/w/cpp/language/operator_comparison#Three-way_comparison
  - https://en.cppreference.com/w/cpp/utility/compare/strong_ordering
---

`<=>` is C++20's three-way comparison operator: one call tells less,
equal and greater apart.

```cpp
auto r = 3 <=> 5;
```

## Which test on `r` asks "was 3 less than 5"?

---

**`r < 0`: `r` is compared with the literal `0`, never with -1.**

`r` is not a `bool` or an `int` but a comparison-category value (here
`std::strong_ordering::less`). `r < 0` means less, `r == 0` equal,
`r > 0` greater. Comparing it with any other number is undefined, and
GCC rejects it.
