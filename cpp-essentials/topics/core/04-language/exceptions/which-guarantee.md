---
id: exceptions-which-guarantee
kind: trace
version: 1
level: 2
tags: [exceptions, exception-safety, tracing]
requires:
  - exceptions-strong-vs-basic
probes:
  1: { n: "3" }
  2: { last: "2" }
refs:
  - https://en.cppreference.com/w/cpp/language/exceptions
---

```cpp
void add_all(std::vector<int>& v, const std::vector<int>& extra) {
    for (int x : extra) {
        if (x < 0) throw std::invalid_argument("negative");
        v.push_back(x);
    }
}
std::vector<int> v{7};
try { add_all(v, {1, 2, -3, 4}); } catch (const std::invalid_argument&) {}
auto n = v.size();      // @1
int last = v.back();    // @2
```

---

`add_all` gives only the **basic** guarantee: `v` is valid and nothing
leaked, but the `1` and `2` appended before the throw stay. Each
`push_back` is strong on its own; the loop never rolls the earlier ones
back. For the strong guarantee, build into a copy and commit with a swap.
Verified with GCC 16.2 (`g++ -std=c++23`).
