---
id: raii-owner-in-destructor
kind: basic
version: 1
level: 1
tags: [lifetime, raii]
elaborate: "`std::string`, `std::unique_ptr` and `std::lock_guard` are this same idiom: for each, whose destructor releases what?"
requires:
  - raii-storage-durations
  - life-destructor-frees
refs:
  - https://en.cppreference.com/w/cpp/language/raii
  - https://en.cppreference.com/w/cpp/language/destructor
---

## This function leaks `f` on its second `return`. In the RAII fix, what guarantees the `fclose` runs on every exit path?

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
