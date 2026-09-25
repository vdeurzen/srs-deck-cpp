---
id: str-go-strings-and-bytes
kind: basic
version: 1
level: 3
tags: [go, strings, memory]
elaborate: In a Go service you know, where does a `[]byte`→`string` conversion sit on the hot path — and could the value be used as a map key instead?
refs:
  - https://go.dev/blog/strings
  - https://pkg.go.dev/strings#Builder
---

## In Go, which of these copy: `string(b)`, `b[2:5]`, `s[2:5]`, `m[string(b)]`? What does that imply for a parser?

---

- **`string(b)` copies.** A Go `string` is immutable, a `[]byte` is
  not, so converting must snapshot the bytes. Same for `[]byte(s)` in
  the other direction.
- **`b[2:5]` does not copy** — it is a new slice header over the same
  backing array, exactly like every other slice expression.
- **`s[2:5]` does not copy** either: a substring shares the original
  string's bytes, which is safe precisely because strings are
  immutable. Note the consequence — a 10-byte substring of a 10 MB
  response keeps the whole 10 MB alive, the classic Go memory leak.
- **`m[string(b)]` does not copy**, and this one is a deliberate
  compiler optimisation: in a map index expression (and in comparisons,
  and in `switch`), `string(b)` is recognised and no allocation is
  made. Writing `key := string(b); m[key]` *does* allocate. Knowing
  this is what lets a parser count occurrences of byte slices with zero
  allocations per lookup.

For a parser the rules that follow are: work in `[]byte` end to end,
slice rather than convert, use `m[string(b)]` for lookups, and convert
to `string` only at the boundary where a value escapes and must become
immutable — interning it there if it will be stored many times.

Two more things worth holding. **`strings.Builder` avoids the copy** of
repeated concatenation by growing a `[]byte` and handing it over
without the final copy (its `String()` uses an unsafe conversion
internally, sound because the builder promises never to touch the
buffer again). And **`range` over a string iterates runes, not bytes**,
decoding UTF-8 as it goes, while `s[i]` indexes bytes — the most common
source of off-by-one bugs in text handling.

The C++ comparison is close but not identical: `std::string_view` is Go's
substring without the safety, since the underlying `std::string` is
mutable and may be destroyed — sharing bytes is opt-in and dangerous
rather than automatic and safe.
