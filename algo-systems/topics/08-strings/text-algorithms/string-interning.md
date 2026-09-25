---
id: str-string-interning
kind: basic
version: 1
level: 4
tags: [strings, compilers, databases, memory]
refs:
  - https://llvm.org/docs/ProgrammersManual.html#the-stringmap-class
  - https://pkg.go.dev/unique
---

## Why does every compiler intern its identifiers, and what exactly does interning buy?

---

Interning maps each distinct string to a single canonical object — a
pointer, a 32-bit symbol id — through a hash table that owns the
storage. After interning, four things change:

1. **Equality becomes pointer comparison.** A compiler compares
   identifiers constantly (symbol lookup, type names, overload
   resolution); `a == b` as one integer compare instead of a `memcmp`
   is the single biggest win, and it makes identifiers usable as hash
   keys with a trivial hash.
2. **Memory collapses.** A source file mentioning `std::vector` 400
   times stores it once. In a database, a dictionary-encoded column of
   country names is the same idea at the storage layer.
3. **Attributes attach to the id.** The symbol table becomes an array
   indexed by symbol id rather than a hash keyed by string — dense,
   cache-friendly, and trivially serialisable.
4. **Lifetime becomes uniform.** Interned strings live in an arena that
   outlives every reference to them, so no ownership question arises at
   any use site.

The costs: interning itself is a hash lookup per string (so it pays only
if strings are compared or stored more than once), the table never
shrinks unless you add reference counting, and in a long-running
multi-tenant process an unbounded intern table is a memory leak with
extra steps. Concurrency needs care too — the usual designs are a
sharded table with per-shard locks, or a lock-free table with
publish-by-CAS.

The implementations worth knowing: LLVM's `StringMap` (open addressing
with the string stored inline after the entry, so the key and value
share one cache line) and `IdentifierTable`/`Symbol` in most front
ends; Java's `String.intern`; Go 1.23's `unique.Make`, which returns a
comparable canonical handle and — importantly — lets the collector
reclaim entries nothing references any more.

The adjacent technique is **hash-consing**: interning applied to whole
*structures* rather than strings, so structurally equal trees become
pointer-equal. That is how a compiler can make common-subexpression
elimination a hash lookup, and how e-graphs and persistent data
structures stay small.
