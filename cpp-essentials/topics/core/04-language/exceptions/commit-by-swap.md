---
id: exceptions-commit-by-swap
kind: chunk
version: 1
level: 3
tags: [exceptions, exception-safety, idioms]
expose_ms: 8000
compile:
  harness: |
    #include <utility>
    static_assert(noexcept(std::declval<Names&>().swap(std::declval<Names&>())));
    int main() {
      Names d{"a"};
      assign_names(d, Names{"x", "y"});
    }
requires:
  - exceptions-which-guarantee
  - move-semantics-noexcept-move
refs:
  - https://en.cppreference.com/w/cpp/language/exceptions
  - https://en.cppreference.com/w/cpp/container/vector/swap
---

```cpp
#include <string>
#include <vector>
using Names = std::vector<std::string>;
void assign_names(Names& dst, const Names& src) {
  Names tmp = src;
  dst.swap(tmp);
}
```

---

Do the work on the side, then commit with a non-throwing swap. Every
operation that can throw (allocating, copying each string) happens on `tmp`
while `dst` is untouched; `swap` only exchanges pointers and is `noexcept`.
That gives the strong guarantee. A plain `dst = src;` may reuse `dst`'s
storage and fail halfway, leaving it partly overwritten: the basic one only.
