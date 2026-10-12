---
id: vec-explain-hft-vector
kind: explain
version: 1
level: 5
tags: [vector, low-latency, hft, implement-std]
requires:
  - vec-reserve-in-loop
  - vec-push-back-fast-path
  - inplace-vector-overflow
refs:
  - https://en.cppreference.com/w/cpp/container/vector/reserve
  - https://en.cppreference.com/w/cpp/container/inplace_vector
  - https://wg21.link/P0843R14
---
The HFT interviewer: "Your order handler appends to your own vector on
the hot path. What would you change, and why?"
---
- [ ] `reserve` the worst case at startup: one growth on the hot path relocates every element, a spike that "amortised O(1)" hides
- [ ] Reserves the total once, never `reserve(size() + 1)` per push: an exact reserve defeats geometric growth and makes the loop O(n²)
- [ ] Keeps the fast path inline and the growth path out of line and cold, so the hot code stays small
- [ ] With a known bound, a fixed-capacity `std::inplace_vector` (C++26) keeps the elements in the object and never allocates
- [ ] Handles "full" explicitly: `push_back` would throw `bad_alloc`, so the hot path uses `try_push_back` and checks the empty optional
