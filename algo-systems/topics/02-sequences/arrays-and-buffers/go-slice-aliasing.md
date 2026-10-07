---
id: seq-go-slice-aliasing
kind: basic
version: 1
level: 3
tags: [go, slices, aliasing, misconception]
elaborate: Where in your own code does a function take a slice and append to it? What would happen if the caller had spare capacity?
requires:
  - seq-go-slice-header
refs:
  - https://go.dev/blog/slices-intro
  - https://go.dev/ref/spec#Appending_and_copying_slices
---

## "`append` returns a new slice, so appending to two copies of the same slice gives two independent results." What does this print?

```go
s := make([]int, 0, 8)   // len 0, cap 8
a := append(s, 1)
b := append(s, 2)
fmt.Println(a[0], b[0])
```

---

**`2 2`: both appends wrote slot 0 of the same backing array.** A slice
is a `(ptr, len, cap)` header; `append` writes in place while capacity
remains. With `s` full, each would allocate and print `1 2`, so the
aliasing depends on a capacity the call site cannot see.
