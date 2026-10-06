---
id: raii-copy-double-close
kind: code
version: 1
level: 2
tags: [raii, lifetime, special-members]
requires:
  - raii-owner-in-destructor
input: chips
choices:
  c1:
    - "FileGuard(const FileGuard&) = delete;"
    - "FileGuard(const FileGuard&) = default;"
    - "FileGuard& operator=(const FileGuard&) = delete;"
    - "explicit FileGuard(const FileGuard&) = default;"
compile:
  harness: |
    #include <type_traits>
    static_assert(!std::is_copy_constructible_v<FileGuard>,
                  "two guards holding one FILE* would both fclose it");
    static_assert(std::is_destructible_v<FileGuard>);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/copy_constructor#Deleted_copy_constructor
  - https://en.cppreference.com/w/cpp/language/rule_of_three
---

`FileGuard` closes its file in the destructor. As written, `FileGuard b =
a;` compiles and leaves two guards over one `std::FILE*`. Add the
declaration that turns that line into a compile error.

```cpp
#include <cstdio>
struct FileGuard {
  explicit FileGuard(std::FILE* f) : f_(f) {}
  ~FileGuard() { if (f_) std::fclose(f_); }
  {{c1::FileGuard(const FileGuard&) = delete;}}
  std::FILE* f_;
};
```

---

The compiler-generated copy constructor copies the pointer, so two
destructors would `fclose` the same `FILE*`, and the second call is
undefined behaviour. Deleting the copy constructor makes the mistake
unrepresentable: the bug becomes a compile error at the line that would
have introduced it. Deleting only copy *assignment* leaves copy
construction available, and `explicit` restricts how a copy may be
spelled, not whether one exists. Handing the file to another owner on
purpose is a different operation — a move constructor that leaves the
source owning nothing — and is the next Card.
