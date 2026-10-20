---
id: std-names-and-headers
kind: basic
version: 1
level: 1
tags: [namespaces, headers, standard-library]
requires:
  - fn-namespace-clash
elaborate: Say in one sentence how `#include <vector>` plus `std::` compares with Go's `import` plus a package-qualified name.
refs:
  - https://en.cppreference.com/w/cpp/standard_library
  - https://eel.is/c++draft/contents
  - https://en.cppreference.com/w/cpp/preprocessor/include
---

## `std::vector<int>` is the library's growable array of `int`. After `#include <vector>`, why does the first line fail while the second compiles?

```cpp
#include <vector>

vector<int> a;
std::vector<int> b;
```

---

**The header declares `vector` inside namespace `std`, so only `std::vector` names it.**

`#include <vector>` copies the header's declarations into this file;
every standard library name in it lives in namespace `std`. Without the
include, even `std::vector` is unknown. Each standard facility has its
header: `<string>`, `<memory>`, `<algorithm>`.
