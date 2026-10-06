---
id: staticpoly-concept-dispatch
kind: code
version: 1
level: 3
tags: [polymorphism, templates, concepts]
requires:
  - staticpoly-iterator-category
  - templates-requires-clause
  - const-constexpr-if-constexpr-discard
input: chips
choices:
  c1:
    - "std::random_access_iterator<It>"
    - "std::bidirectional_iterator<It>"
    - "std::forward_iterator<It>"
    - "std::input_iterator<It>"
compile:
  harness: |
    #include <list>
    constexpr bool on_array() {
      int a[] = {1, 2, 3, 4};
      int* p = a;
      advance_by(p, 3);
      return *p == 4;
    }
    static_assert(on_array());
    void on_list(std::list<int>& l) {
      auto it = l.begin();
      advance_by(it, 1);
    }
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/iterator/random_access_iterator
  - https://en.cppreference.com/w/cpp/iterator/iterator_tags
---

This replaces a pair of overloads selected by `std::random_access_iterator_tag`
and `std::input_iterator_tag`. Complete the condition so `advance_by`
also compiles for a `std::list` iterator.

```cpp
#include <iterator>
template<std::input_iterator It>
constexpr void advance_by(It& it, int n) {
    if constexpr ({{c1::std\::random_access_iterator<It>}}) it += n;
    else while (n-- > 0) ++it;
}
```

---

**Tag dispatch** picked an overload by passing an iterator-category tag
object; `if constexpr` on a concept does the same in one function, and
the discarded branch is never instantiated. Only random-access iterators
have `+=`: a list iterator is bidirectional, so every weaker concept
sends it into `it += n`.
