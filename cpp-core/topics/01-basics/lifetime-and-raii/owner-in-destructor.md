---
id: raii-owner-in-destructor
kind: basic
version: 1
level: 1
tags: [lifetime, raii]
requires:
  - raii-storage-durations
refs:
  - https://en.cppreference.com/w/cpp/language/raii
  - https://en.cppreference.com/w/cpp/language/destructor
---

## This function leaks `f` on its second `return`. What does the RAII fix tie the `fclose` call to, so that no exit path can skip it?

```cpp
void save(const char* path) {
  std::FILE* f = std::fopen(path, "w");
  if (!f) return;
  if (!write_header(f)) return;   // f is never closed
  write_body(f);
  std::fclose(f);
}
```

---

**The destructor of a local object that owns `f`.** Acquire in a
constructor, hold in an automatic-storage object, release in the
destructor: the language runs it when the scope ends on *every* path
(`return`, `break`, a caught exception). Written once, forgotten nowhere.

```cpp
struct File {
  std::FILE* f;
  ~File() { if (f) std::fclose(f); }
};
File file{std::fopen(path, "w")};   // closed when `file` dies
```

`std::string`, `std::unique_ptr` and `std::lock_guard` are this idiom:
"who owns this?" means "whose destructor releases it?".
