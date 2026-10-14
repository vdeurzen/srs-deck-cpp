---
id: bucket-truncation
kind: basic
version: 1
level: 4
tags: [hft, rate-limit, token-bucket, integers, misconception]
requires:
  - bucket-refill
refs:
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Multiplicative_operators
elaborate: At what check interval does this version start refilling, and does it then refill at the full rate?
---

## A limiter keeps whole tokens and refills on every check, as below. It allows 100 orders/s and is checked every 1 ms. What does it do?

```cpp
tokens = std::min(cap, tokens + (now_ns - last_ns) * rate / 1'000'000'000);
last_ns = now_ns;
```

---

**It never refills: each check earns 0.1 token, which truncates to 0,
and `last_ns = now_ns` throws the elapsed time away.** Integer division
rounds toward zero, so checks under 1/rate apart earn nothing. Fix:
count nano-tokens and never divide, or move `last_ns` only when a whole
token was earned (that still drops fractions).
