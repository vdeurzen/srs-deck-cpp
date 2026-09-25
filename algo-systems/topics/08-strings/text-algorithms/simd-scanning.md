---
id: str-simd-scanning
kind: basic
version: 1
level: 5
tags: [strings, simd, parsing, low-latency]
refs:
  - https://arxiv.org/abs/1902.08318
  - https://en.algorithmica.org/hpc/simd/
---

## A parser spends its time looking for delimiters. What does the SIMD version of that loop look like, and what is the general pattern?

---

Load 32 or 64 bytes at a time, compare all of them against the
delimiter in one instruction, and turn the result into a **bitmask** of
matching positions. Then process the mask with bit tricks:
`countr_zero` gives the offset of the next match, `mask &= mask - 1`
clears it, and `popcount` counts them all — so a chunk with no
delimiters costs a load, a compare and a branch, and a chunk with ten
costs ten cheap iterations instead of 64 character comparisons.

The general pattern is **bytes in, bitmask out, then arithmetic on the
mask**. simdjson is the canonical demonstration:

- classify all 64 bytes at once into quotes, backslashes, structural
  characters and whitespace, producing one bitmask each;
- resolve escaped quotes by a carry-less multiply that propagates the
  effect of backslash runs across the mask;
- turn the quote mask into an "inside a string" mask with a prefix-XOR
  (again a carry-less multiply), so string contents can be excluded
  from structural detection *branchlessly*;
- the surviving mask indexes the structural characters, and only those
  positions are visited by the actual parser.

The result is a parser bound by memory bandwidth rather than by
branches — gigabytes per second — and the technique transfers directly
to CSV, log formats, protocol framing and column scanning in a
database.

Two engineering notes that matter more than the intrinsics. **The tail
is where the bugs are**: a 64-byte loop needs a safe way to handle the
last partial chunk, either by padding the buffer (simdjson requires
padding for exactly this reason) or by a scalar epilogue. And
**dispatch**: the fast path needs AVX2 or AVX-512 at run time, so the
same code is compiled several times and selected by CPUID — via
function multiversioning, or explicitly.

For the single-character case, do not write any of this: `memchr` and
`std::find` on bytes are already vectorised in libc, and beating them
by hand is unlikely.
