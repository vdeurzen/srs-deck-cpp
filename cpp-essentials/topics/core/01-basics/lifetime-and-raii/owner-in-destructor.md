---
id: raii-owner-in-destructor
kind: basic
version: 1
level: 1
tags: [lifetime, raii]
elaborate: Where in your Go code do you `defer` a close or an unlock, and what would the C++ owner type for it be?
requires:
  - raii-storage-durations
  - life-destructor-intro
  - string-literal-is-char-array
  - ptr-null-pointer
refs:
  - https://en.cppreference.com/w/cpp/language/raii
  - https://en.cppreference.com/w/cpp/language/destructor
---

`std::FILE*` is the C library's handle to an open file: `std::fopen`
opens one, `std::fclose` releases it.

## This function leaks `f` on its second `return`. In the idiomatic C++ fix, what guarantees the `fclose` runs on every exit path?

```cpp
void save(const char* path) {
  std::FILE* f = std::fopen(path, "w");
  if (f == nullptr) return;
  if (!write_header(f)) return;   // f is never closed
  write_body(f);
  std::fclose(f);
}
```

---

**The destructor of a local object that owns `f`.** This is RAII: acquire
in a constructor, hold in an automatic-storage object, release in the
destructor: the language runs it when the scope ends on *every* path
(`return`, `break`, a caught exception). Written once, forgotten nowhere.

```cpp
struct File {
  std::FILE* f;
  ~File() { if (f != nullptr) std::fclose(f); }
};
File file{std::fopen(path, "w")};   // closed when `file` dies
```
