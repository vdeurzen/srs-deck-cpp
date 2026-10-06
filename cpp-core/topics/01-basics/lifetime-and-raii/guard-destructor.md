---
id: raii-guard-destructor
kind: code
version: 1
level: 2
tags: [raii, lifetime]
requires:
  - raii-owner-in-destructor
input: chips
choices:
  c1:
    - "FileGuard file{std::fopen(path, \"w\")};"
    - "FileGuard{std::fopen(path, \"w\")};"
    - "std::FILE* file = std::fopen(path, \"w\");"
    - "auto* file = new FileGuard{std::fopen(path, \"w\")};"
compile:
  harness: |
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/raii
  - https://en.cppreference.com/w/cpp/language/storage_duration
---

`save` must close the file on every path out of the function, including
the early `return`. Complete the line that takes charge of the freshly
opened file.

```cpp
#include <cstdio>
struct FileGuard {
  explicit FileGuard(std::FILE* f) : f_(f) {}
  ~FileGuard() { if (f_) std::fclose(f_); }
  std::FILE* f_;
};
bool write_header(std::FILE*) { return true; }
void save(const char* path) {
  {{c1::FileGuard file{std\::fopen(path, "w")};}}
  if (!write_header(file.f_)) return;
  std::fputs("body\n", file.f_);
}
```

---

The guard only does its job as a **named object with automatic storage
duration**: its destructor then runs when `save`'s scope ends, by any
route. The three alternatives each break that in a different way. An
unnamed `FileGuard{...};` is a temporary, destroyed at the end of its own
statement — the file is closed before the first write. A raw
`std::FILE*` owns nothing, so the early `return` leaks it. A guard made
with `new` lives until someone `delete`s it, which nobody does. The
harness catches all three cheaply (nothing named `file` with an `f_`
exists), but the lesson is the storage duration, not the spelling.
