---
id: db-bloom-fpr
kind: code
version: 1
level: 4
tags: [databases, sketches, probabilistic]
input: chips
choices:
  c1: ["pow_int(1.0 - zero, k)", "pow_int(zero, k)", "1.0 - zero", "pow_int(1.0 - zero, n)"]
compile:
  harness: |
    constexpr double sized = fpr(10'000, 1'000, 7);    // 10 bits per key
    constexpr double over  = fpr(10'000, 2'000, 7);    // twice the keys it was sized for
    static_assert(sized > 0.0081 && sized < 0.0083);
    static_assert(over > 0.13 && over < 0.14);
    int main() {}
requires:
  - db-bloom-filter
refs:
  - https://dl.acm.org/doi/10.1145/362686.362692
  - https://www.eecs.harvard.edu/~michaelm/postscripts/im2005b.pdf
elaborate: Your filter was sized for last year's key count, and the table has since doubled. Would anything in your metrics tell you?
---

`n` keys have each set `k` of `m` bits. A query for an absent key
answers "maybe" when every bit it probes is set. Complete its
false-positive rate.

```cpp
constexpr double pow_int(double b, int e) { double r = 1; while (e-- > 0) r *= b; return r; }

constexpr double fpr(int m, int n, int k) {
  double zero = 1.0;                    // P(a given bit is still 0)
  for (int i = 0; i < k * n; ++i) zero *= 1.0 - 1.0 / m;
  return {{c1::pow_int(1.0 - zero, k)}};
}
```

---

**Each of the `k` probes must land on a set bit: `(1 − zero)^k`.** At 10
bits per key and `k = 7` that is 0.82 %. Insert twice the keys the filter
was sized for and it is 13.8 %, at four times 64 %: a Bloom filter
degrades silently and superlinearly, never with an error. `zero^k`
comes close at the sized load (0.74 % against 0.82 %) only because the optimum leaves
`zero ≈ ½`; the overloaded case exposes it. Values computed by this
code under GCC 16.2.
