---
id: seq-go-slice-aliasing
kind: basic
version: 1
level: 3
tags: [go, slices, aliasing, misconception]
requires:
  - cpp-core/ptr-array-decay
elaborate: Where in your own code does a function take a slice and append to it? What would happen if the caller had spare capacity?
refs:
  - https://go.dev/blog/slices-intro
  - https://go.dev/ref/spec#Slice_expressions
---

## Is this true? "`append` returns a new slice, so appending to two copies of the same slice gives two independent results."

---

**False, and the bug is silent.** A slice is a `(pointer, len, cap)`
header over a backing array. `append` writes into the backing array
*when there is spare capacity* and only allocates a fresh array when
there is not.

```go
s := make([]int, 0, 8)   // len 0, cap 8
a := append(s, 1)        // writes backing[0] = 1
b := append(s, 2)        // writes backing[0] = 2 — same slot!
fmt.Println(a[0], b[0])  // 2 2
```

Both appends saw `len == 0` and wrote index 0 of the same array. Had
`s` been full, each `append` would have allocated, and the same code
would have printed `1 2`. **Whether `append` aliases depends on
capacity, which is invisible at the call site** — so behaviour that
works in a test with a freshly grown slice breaks in production with a
pooled one.

The same trap appears through function boundaries (`func add(xs []T)`
that appends may or may not mutate the caller's array beyond `len`) and
through sub-slicing: `head := log[:10]` inherits the *whole* capacity of
`log`, so appending to `head` overwrites `log[10]`.

The fix is the **three-index slice**, `s[low:high:max]`, which caps
capacity at `max − low`. With `head := log[0:10:10]`, capacity equals
length, so the first `append` must allocate and the original is safe.
Use it whenever you hand a window of your own buffer to code you do not
control — or copy, if the buffer is small and you would rather not think
about it.

The C++ analogue is a `std::span` over a `vector`, with one mercy: a
`span` has no `append`, so it can dangle but it cannot silently
overwrite the elements past its end.
