---
id: seq-go-slice-window
kind: code
version: 1
level: 3
tags: [go, slices, aliasing]
input: chips
compile: null
choices:
  c1: ["off + n", "cap(buf)", "len(buf)", "off + n + 1"]
refs:
  - https://go.dev/ref/spec#Slice_expressions
  - https://go.dev/blog/slices-intro
---

`buf` is a scratch buffer reused for every message. Complete the full
slice expression so the window handed to the caller cannot grow into the
bytes that follow it.

```go
// Window returns the message body at [off, off+n) of the shared buffer.
// Callers may append to it; that must never clobber the rest of buf.
func Window(buf []byte, off, n int) []byte {
    return buf[off : off+n : {{c1::off + n}}]
}
```

---

`s[low:high:max]` sets the result's capacity to `max − low`, so with
`max == high` the window has `len == cap`. The caller's first `append`
finds no spare capacity, allocates a fresh array, and copies — the
shared buffer is untouched. Any larger `max` (`cap(buf)`, `len(buf)`,
`off+n+1`) leaves the window capacity extending into bytes that belong to
someone else, and an `append` overwrites them in place, with no error and
no copy.

This is the standard way to hand out a read-only-ish view of a pooled
buffer in Go. The two alternatives are copying the bytes (simple, but
that is the allocation you were avoiding) and documenting "do not
append", which is not a mechanism.

Note the asymmetry the three-index form does *not* fix: the window still
points into `buf`, so if the pool recycles `buf` while the caller holds
the window, the caller sees the next message's bytes. Capacity capping
protects the buffer from the caller; only lifetime discipline — or a
copy — protects the caller from the buffer.

This Card is not compile-checked: the Deck's compile service builds C++
(SPEC §9), so Go snippets are graded by whitespace-normalised equality
(SPEC §4.5).
