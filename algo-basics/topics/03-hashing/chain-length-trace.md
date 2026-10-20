---
id: hashing-chain-length-trace
kind: trace
version: 1
level: 2
tags: [foundations, chaining, load-factor, tracing]
requires:
  - interview-essentials/hashing-pigeonhole
probes:
  1: { "len[0]": "3", "len[3]": "3" }
  2: { "len[0]": "2", "len[7]": "1" }
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §11.2
---

Each bucket keeps a chain (list) of the keys that land in it.
`len[b]` is the length of bucket `b`'s chain. Keys `0 … n−1`, with
`h(k) = k`.

```cpp
#include <vector>

std::vector<int> len;

void fill(int n, int m) {
  len.assign(m, 0);
  for (int k = 0; k < n; ++k) ++len[k % m];
}

int main() {
  fill(12, 4);   // @1
  fill(12, 8);   // @2
}
```

---

These keys spread perfectly, so every chain is close to **n / m long:
3, then 1.5 on average.** That ratio is the *load factor* α. A
lookup scans one chain, so it costs O(1 + α) on average: constant as
long as m grows with n.

(Values from running it under GCC 16.2.)
