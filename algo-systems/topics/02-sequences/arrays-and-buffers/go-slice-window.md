---
id: seq-go-slice-window
kind: code
version: 1
level: 3
requires:
  - seq-go-subslice-capacity
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

`s[low:high:max]` gives capacity `max − low`, so with `max == high` the
window is full: the caller's first `append` must copy to a new array and
`buf` is untouched. Any larger `max` lets `append` overwrite the bytes
after the window in place. The window still aliases `buf`, so recycling
`buf` early remains the caller's hazard.

Go, so graded by text rather than compiled.
