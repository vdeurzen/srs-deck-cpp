---
id: str-go-range-runes
kind: basic
version: 1
level: 2
tags: [go, strings, unicode]
requires:
  - str-go-strings-and-bytes
refs:
  - https://go.dev/blog/strings
  - https://go.dev/ref/spec#For_range
elaborate: Where does your code index a string by `s[i]` and assume it got a character?
---

## In Go, `s := "héllo"`. What are `len(s)` and the number of iterations of `for range s`?

---

**6 and 5: `len` counts UTF-8 bytes, `range` decodes runes.**

`é` is two bytes in UTF-8. `s[i]` indexes bytes and `range` steps rune
by rune, so mixing the two is the classic text off-by-one. Checked
with Go 1.27.
