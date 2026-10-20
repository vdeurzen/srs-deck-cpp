---
id: vec-reserve-in-loop
kind: basic
version: 1
level: 3
tags: [vector, reserve, complexity, implement-std, misconception]
elaborate: Where does your own code call `reserve` with a size that grows by one each time?
requires:
  - vec-reserve-contract
  - linear-dynamic-array-growth
  - complexity-count-loop-steps
  - cpp-essentials/iter-range-for-const-auto-ref
refs:
  - https://en.cppreference.com/w/cpp/container/vector/reserve
  - https://timsong-cpp.github.io/cppwp/n4950/vector.capacity#3
---

Many expect a `reserve` before each push to avoid reallocations. `Order`
is any small struct; `book` is a `std::vector<Order>`.

## What does this loop cost for `n` orders?

```cpp
for (const Order& o : incoming) {
    book.reserve(book.size() + 1);
    book.push_back(o);
}
```

---

**O(n²): each `reserve` allocates exactly `size() + 1`, so every push reallocates and moves everything.**
"Exactly" is what all three major standard libraries do; the standard says at
least `n`. With libstdc++, 1000 pushes reallocate 1000 times. The intent needs one call before the loop:
`book.reserve(book.size() + incoming.size())`.
