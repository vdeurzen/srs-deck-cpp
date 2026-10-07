---
id: foundations-queue-wait
kind: code
version: 1
level: 4
tags: [cost-model, throughput, low-latency]
requires:
  - foundations-utilisation-knee
input: chips
choices:
  c1:
    - "rho / (100 - rho)"
    - "rho / 100"
    - "100 / (100 - rho)"
    - "(100 - rho) / rho"
compile:
  harness: |
    static_assert(wait_in_services(50) == 1);
    static_assert(wait_in_services(75) == 3);
    static_assert(wait_in_services(90) == 9);
    static_assert(wait_in_services(99) == 99);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/M/M/1_queue
---

A single-server queue with random (Poisson) arrivals and service times
runs at utilisation `rho` percent. Complete the mean time a request
waits *before* service starts, in units of one service time.

```cpp
constexpr int wait_in_services(int rho) {   // 0 <= rho < 100
  return {{c1::rho / (100 - rho)}};
}
```

---

This is the M/M/1 queue's `W_q = ρ/(1−ρ) · service time`, with `ρ` in
percent so the values stay integers. `100 / (100 − rho)` is the time in
the *system* (waiting plus service), one more than the wait. The curve
is what matters: from 50 % to 90 % utilisation the work per request
does not change, and the wait grows ninefold.
