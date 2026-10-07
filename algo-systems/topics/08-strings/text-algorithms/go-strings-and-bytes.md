---
id: str-go-strings-and-bytes
kind: basic
version: 2
level: 3
tags: [go, strings, memory]
elaborate: A lookup's key aliases `tok`; a sub-slice kept as a value pins the whole input (see `ll-go-substring-retention`). Which of your hot-path conversions is a lookup, and which a store?
requires:
  - seq-go-slice-aliasing
refs:
  - https://go.dev/blog/strings
  - https://pkg.go.dev/testing#AllocsPerRun
---

## A Go tokenizer holds `tok`, a 64-byte `[]byte`, and `kw`, `counts` of type `map[string]int`, with `tok`'s key already present in both. Which line allocates on every call?

```go
if id, ok := kw[string(tok)]; ok { use(id) }   // A
counts[string(tok)]++                          // B
```

---

**Only B: it may store the key, so it must build a real string.**

A read never keeps its key, so the compiler lets `string(tok)` alias
the bytes. `++` may insert, so it copies even when the key exists.
Hot path: map to `*int` and do `*p++` after a lookup. Measured with
`testing.AllocsPerRun`, Go 1.27: A 0, B 1.
