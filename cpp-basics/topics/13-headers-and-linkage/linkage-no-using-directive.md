---
id: linkage-no-using-directive
kind: code
version: 1
level: 2
tags: [headers, namespaces]
requires:
  - linkage-include-is-paste
input: chips
choices:
  c1:
    - "int tally(const std::string& s, char c);"
    - "using namespace std; int tally(const string& s, char c);"
    - "int tally(const string& s, char c);"
    - "int tally(const std::vector<char>& s, char c);"
compile:
  harness: |
    // main.cpp: tally.h is pasted above
    int count = 0;
    int main() { return count; }
refs:
  - https://en.cppreference.com/w/cpp/language/namespace#Using-directives
  - https://eel.is/c++draft/namespace.udir
---

`tally(s, c)` counts how often `c` occurs in `s`. Complete its
declaration in `tally.h`, which `main.cpp` includes.

```cpp
// tally.h
#include <algorithm>
#include <string>
{{c1::int tally(const std\::string& s, char c);}}
```

---

Qualify names in a header; never write `using namespace std;` there.
The header's text is pasted into every includer, so the directive pulls
all of `std` into *their* global scope. In `main.cpp`, `count` then means
both `::count` and the algorithm `std::count`: `reference to 'count' is
ambiguous` (the harness's `main.cpp` has a global `int count`). Without
the directive or a `std::` prefix, `string` is unknown; `std::vector` is
unknown too, because this header never includes `<vector>`.
