---
id: view-intro
kind: basic
version: 1
level: 1
tags: [ranges, views]
requires:
  - iter-range-for-intro
  - lambda-syntax-intro
elaborate: Say, as to a reviewer, who owns the elements a view shows you, and what that means for returning one from a function.
refs:
  - https://en.cppreference.com/w/cpp/ranges/filter_view
  - https://en.cppreference.com/w/cpp/ranges/view
  - https://eel.is/c++draft/range.filter
---

```cpp
std::vector<int> v{1, 2, 3, 4, 5};
auto is_odd = [](int x) { return x % 2 == 1; };
auto odd = v | std::views::filter(is_odd);
int s = 0;
for (int x : odd) s += x;
```

## `v | std::views::filter(pred)` gives something a range-`for` can loop over, visiting only the elements of `v` for which `pred` returns `true`. How many `int`s does `odd` itself store?

---

**None: `odd` is a view; it refers to `v`'s elements, so `v` must outlive it.**

A view holds only a pointer to `v` and the test. Each loop pass reads the
next match straight out of `v` (here `s` becomes 9). Looping over `odd`
after `v` is destroyed reads elements that no longer exist.
