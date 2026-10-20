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
is any small struct; `book` is a `std::vector<Order>` that starts empty.

## What does this loop cost for `n` orders?

```cpp
for (const Order& o : incoming) {
    book.reserve(book.size() + 1);
    book.push_back(o);
}
```

---

**O(n²): `reserve(size() + 1)` allocates exactly one more slot, so every push reallocates.**
Each reallocation moves every element so far: 1 + 2 + … + n moves.
Measured with libstdc++: 1000 pushes, 1000 reallocations. The intent needs one
call before the loop: `book.reserve(incoming.size())`.
