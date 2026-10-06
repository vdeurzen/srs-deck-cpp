---
id: db-columnar-encodings
kind: basic
version: 1
level: 5
tags: [databases, compression, layout, simd]
requires:
  - foundations-aos-vs-soa
refs:
  - https://www.cidrdb.org/cidr2005/papers/P19.pdf
  - https://parquet.apache.org/docs/file-format/data-pages/encodings/
---

## Name the four encodings a column store leans on, and explain why compression makes scans *faster* rather than slower.

---

- **Dictionary encoding**: distinct values in a small table, the column
  becomes codes. Perfect for low-cardinality strings (country,
  currency, status), and the codes are integers, so everything below
  applies to them too.
- **Run-length encoding**: (value, count) pairs. Excellent on a sorted
  or clustered column — and the reason a column store cares deeply
  about *which* column the data is sorted by.
- **Frame of reference / delta**: store values as offsets from a base
  (per block), so timestamps or ids near each other need few bits.
- **Bit packing**: if the range needs 11 bits, store 11 bits, not 32.
  Combined with FOR, this is how a timestamp column becomes a byte or
  two per row.

Compression speeds scans up because analytical scans are **memory-**
or **I/O-bound**, not CPU-bound: 4× fewer bytes is 4× fewer cache
misses and 4× less I/O, and modern decoders are vectorised to a few
instructions per value. The stronger form of the argument is
**operating on the encoded data directly**:

- A predicate on a dictionary-encoded column becomes a comparison
  against one or two *codes*, evaluated over packed integers with SIMD.
- A predicate on an RLE run is evaluated **once per run**, not once per
  row.
- Min/max **zone maps** per block skip entire blocks without decoding
  anything, and this is where most of the speedup in a selective scan
  actually comes from.
- Aggregates like `COUNT`/`SUM` can be computed from run lengths and
  dictionaries without materialising rows at all.

The companion technique is **late materialisation**: carry selection
vectors or bitmaps of qualifying row ids through the plan, and only
stitch the actual column values together at the top. Materialising
rows early throws away every advantage listed above.

The trade is on the other side of the workload: all of this assumes
bulk-appended, rarely-updated data. A single-row update to an
RLE-encoded, bit-packed block means rewriting the block, which is why
column stores batch updates into a delta store and merge in the
background — the same "immutable base plus delta, merged later" shape
as an LSM tree.
