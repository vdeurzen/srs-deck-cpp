---
id: life-scope-automatic
kind: basic
version: 1
level: 1
tags: [lifetime, scope, storage-duration]
refs:
  - https://en.cppreference.com/w/cpp/language/storage_duration
  - https://eel.is/c++draft/stmt.jump#general-2
---

## Each time the loop finds a positive `x`, it creates a `std::string` named `label`. At which marked brace is that `label` destroyed?

```cpp
int count_positive(const std::vector<int>& v) {
  int count = 0;
  for (int x : v) {
    if (x > 0) {
      std::string label = std::to_string(x);
      ++count;
    }              // A
  }                // B
  return count;
}                  // C
```

---

**At `A`: the closing brace of the block that declared it.** A local has
*automatic storage duration*: it lives from its declaration to the end of
its enclosing block, and leaving that block (by `}`, `return`, `break` or
an exception) runs its destructor. Each positive `x` gets a fresh `label`
that dies at `A`.
