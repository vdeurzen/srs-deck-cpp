---
id: seq-go-slice-header
kind: basic
version: 1
level: 2
tags: [go, slices]
refs:
  - https://go.dev/blog/slices-intro
  - https://go.dev/ref/spec#Appending_and_copying_slices
elaborate: Where does your code keep a slice returned by a function that may still append to it?
---

## What does `t` hold after this `append`?

```go
s := make([]int, 2, 8)   // len 2, cap 8
t := append(s, 7)
```

---

**Same backing array as `s`, `len 3`, `cap 8`: `7` went into slot 2 in place.**

A slice is a header `(ptr, len, cap)` over an array. While `len < cap`,
`append` writes the next slot and returns a header with a larger `len`;
only when full does it allocate and copy. `s` is
unchanged: still `len 2`.
