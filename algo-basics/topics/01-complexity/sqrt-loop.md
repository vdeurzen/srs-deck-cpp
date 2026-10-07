---
id: complexity-sqrt-loop
kind: trace
version: 1
level: 2
tags: [complexity, tracing]
requires:
  - complexity-count-loop-steps
probes:
  1: { tries: "99" }
  2: { tries: "999" }
refs:
  - https://en.wikipedia.org/wiki/Trial_division
---

Trial division tests divisors `d` while `d * d <= n`. Both inputs
are prime, so no early exit. Each probe reads `tries` after the call.

```cpp
int tries = 0;
bool is_prime(int n) {
  tries = 0;
  for (int d = 2; d * d <= n; ++d) {
    ++tries;
    if (n % d == 0) return false;
  }
  return n >= 2;
}

int main() {
  is_prime(10'007);     // @1
  is_prime(1'000'003);  // @2
}
```

---

The loop stops at d = ⌊√n⌋, so it runs about √n − 1 times: 99 (d = 2..100)
and 999 (d = 2..1000). That is O(√n): input ×100, work
×10. A composite stops early (91 = 7·13 quits at d = 7), so √n is the
worst case.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
