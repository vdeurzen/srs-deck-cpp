---
id: db-columnar-encodings
kind: basic
version: 2
level: 4
tags: [databases, compression, layout]
requires:
  - foundations-aos-vs-soa
refs:
  - https://www.cidrdb.org/cidr2005/papers/P19.pdf
  - https://parquet.apache.org/docs/file-format/data-pages/encodings/
elaborate: A single-row update to a bit-packed, run-length-encoded block means rewriting the block. How do column stores absorb updates, and which other structure has the same shape?
---

## A column scan is memory-bandwidth-bound. Why does compressing the column make it faster, not slower?

---

**The scan is waiting on bytes, not instructions: 4× fewer bytes is ~4× fewer misses.**

Decoding a dictionary code or a bit-packed integer costs a few
vectorised instructions per value, which a bandwidth-bound loop has to
spare. Better still, many predicates run on the encoded values directly.
