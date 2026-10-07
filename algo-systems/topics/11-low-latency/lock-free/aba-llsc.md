---
id: ll-aba-llsc
kind: basic
version: 1
level: 5
tags: [low-latency, lock-free, concurrency, arm, misconception]
requires:
  - ll-aba-problem
elaborate: If you ship the same lock-free code to x86-64 and AArch64 servers, which of your correctness arguments depend on the instruction set rather than on the C++ memory model?
refs:
  - https://en.cppreference.com/w/cpp/atomic/atomic/compare_exchange
  - https://gcc.gnu.org/onlinedocs/gcc/AArch64-Options.html
---

## On AArch64 a store-conditional fails if the line was written at all since the load-linked. So C++ `compare_exchange` on ARM is immune to ABA. What actually happens?

---

**It is just as ABA-prone as on x86.** The algorithm's read of `head`
happened long before the CAS; `compare_exchange` issues its own
load-linked inside the call, so intervening writes are invisible to it.
And under `-moutline-atomics` (GCC's AArch64 default) a CPU with LSE
runs a plain `CAS` instruction anyway. Only hand-written LL/SC loops
spanning the original read are protected.
