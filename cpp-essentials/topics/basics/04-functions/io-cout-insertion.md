---
id: io-cout-insertion
kind: basic
version: 1
level: 1
tags: [io, standard-library]
requires:
  - std-names-and-headers
refs:
  - https://en.cppreference.com/w/cpp/io/cout
  - https://en.cppreference.com/w/cpp/io/basic_ostream/operator_ltlt
elaborate: Which separator would you add to print `4 8`, and which to end the line?
---

```cpp
#include <iostream>
int main() {
    int n = 4;
    std::cout << n << n * 2;
}
```

## What exactly appears on the screen?

---

**`48`: each `<<` writes the next value as text, adding no separator.**
`std::cout`, declared in `<iostream>`, is the standard output stream.
`<<` on a stream writes one value and returns the stream, so a chain
runs left to right. Spaces and line breaks are yours to write:
`std::cout << n << ' ' << n * 2;` prints `4 8`.
