---
id: smf-grid-one-declaration
kind: code
version: 1
level: 3
tags: [classes, special-members, move-semantics]
input: chips
choices:
  c1:
    - "Grid(Grid&&) = default;"
    - "Grid(const Grid&) = delete;"
    - "Grid& operator=(Grid&&) = default;"
    - "Grid(Grid&&) = delete;"
    - "Grid(const Grid&) = default;"
compile:
  harness: |
    #include <type_traits>
    #include <utility>
    // Moving a Grid compiles, and actually moves:
    static_assert(std::is_constructible_v<Grid, Grid&&>);
    static_assert(std::is_nothrow_constructible_v<Grid, Grid&&>);
    // Copying a Grid does not compile:
    static_assert(!std::is_constructible_v<Grid, const Grid&>);
    static_assert(!std::is_constructible_v<Grid, Grid&>);
    int main() {}
requires:
  - smf-socket-copy-line
  - smf-token-move-line
elaborate: Say aloud, as to an interviewer, why this single line makes `Grid` move-only rather than "copyable and movable".
refs:
  - https://eel.is/c++draft/class.copy.ctor#6
  - https://eel.is/c++draft/class.copy.ctor#8
  - https://en.cppreference.com/w/cpp/language/move_constructor
---

`Grid` logs in its destructor. Add one declaration so that, for an
existing `Grid a`, `Grid b = std::move(a);` compiles and moves `cells`,
while `Grid b = a;` does not compile.

```cpp
#include <vector>
struct Grid {
    std::vector<int> cells;
    ~Grid() { /* log */ }
    {{c1::Grid(Grid&&) = default;}}
};
```

---

**A defaulted move constructor: it restores the move, and deletes the implicit copy constructor.**
The destructor suppressed the implicit move, so moves were copying.
`Grid(const Grid&) = delete;` leaves no move constructor, so `std::move(a)`
hits the deleted copy. A defaulted move *assignment* deletes the copy
constructor but declares no move constructor. `Grid(Grid&&) = delete;` is
chosen, then rejected. `Grid(const Grid&) = default;` keeps copying legal.
