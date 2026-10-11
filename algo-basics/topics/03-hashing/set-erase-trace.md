---
id: hashing-set-erase-trace
kind: trace
version: 1
level: 1
tags: [foundations, sets, tracing]
probes:
  1: { gone: "1", "s.size()": "2" }
  2: { gone: "0", "s.size()": "2" }
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_set/erase
---

`erase(key)` returns how many keys it removed.

```cpp
#include <string>
#include <unordered_set>

int main() {
  std::unordered_set<std::string> s{"ann", "bob", "cy"};
  auto gone = s.erase("bob");   // @1
  gone = s.erase("zed");        // @2
}
```

---

Erasing removes the key if present. **Erasing a missing key is not an
error: it removes nothing and returns 0.** Since a key appears at most
once, the result is always 0 or 1.

(Values from running it under GCC 16.2.)
