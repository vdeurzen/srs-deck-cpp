---
id: life-shared-ptr-pick-member
kind: code
version: 1
level: 2
tags: [lifetime, ownership]
requires:
  - cpp-essentials/life-shared-ptr-owners
  - cpp-essentials/life-unique-ptr-member-no-copy
input: chips
choices:
  c1:
    - "std::shared_ptr<Texture>"
    - "std::unique_ptr<Texture>"
    - "Texture*"
    - "Texture"
compile:
  harness: |
    #include <type_traits>
    static_assert(std::is_copy_constructible_v<Sprite>);       // copies allowed
    static_assert(!std::is_trivially_destructible_v<Sprite>);  // dying releases something
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#rr-unique
---

Many `Sprite`s draw one heap-allocated `Texture`, and any of them may be
destroyed first. Complete the member so that copying a `Sprite` gives a
second `Sprite` using the *same* `Texture`, and the `Texture` is never
leaked.

```cpp
#include <memory>
struct Texture { int id; };
struct Sprite {
  {{c1::std\::shared_ptr<Texture>}} tex;
};
```

---

**`std::shared_ptr<Texture>`**: each copy of a `Sprite` becomes one more
owner, and whichever `Sprite` dies last frees the `Texture`. No single
`Sprite` outlives the rest, so no one owner can be chosen. A
`unique_ptr` member makes `Sprite` non-copyable. `Texture*` copies but
owns nothing, so nothing frees it; a plain `Texture` gives every copy
its own texture.
