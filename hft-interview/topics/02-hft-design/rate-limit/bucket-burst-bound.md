---
id: bucket-burst-bound
kind: basic
version: 1
level: 3
tags: [hft, rate-limit, token-bucket]
refs:
  - https://www.rfc-editor.org/rfc/rfc2697
elaborate: A venue allows 100 orders in any 1 s. Which capacity and rate keep you inside it?
---

## A token bucket refills 100 tokens per second and holds at most 20; each order spends one token. It is full. At most how many orders can go out from now until 1 s from now?

---

**120: the 20 stored, plus the 100 refilled during that second.** The
capacity bounds the burst and the rate bounds the long-run average, so
any span of length T admits at most capacity + rate × T. RFC 2697 names
the same two parameters CBS and CIR.
