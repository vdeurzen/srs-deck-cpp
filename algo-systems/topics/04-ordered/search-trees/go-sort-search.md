---
id: ordered-go-sort-search
kind: code
version: 1
level: 3
tags: [go, binary-search, invariants]
input: chips
compile: null
choices:
  c1: ["a[i] >= key", "a[i] > key", "a[i] == key", "a[i] < key"]
refs:
  - https://pkg.go.dev/sort#Search
  - https://pkg.go.dev/slices#BinarySearch
---

`sort.Search(n, f)` returns the smallest `i` in `[0, n)` for which
`f(i)` is true, assuming `f` is false then true. Complete the predicate
so `LowerBound` matches C++'s `std::lower_bound`.

```go
// LowerBound returns the first index at which key could be inserted
// while keeping a sorted, i.e. the first index with a[i] >= key.
func LowerBound(a []int, key int) int {
    return sort.Search(len(a), func(i int) bool { return {{c1::a[i] >= key}} })
}
```

---

Go inverts the usual interface: instead of handing the algorithm a
comparator and letting it drive, you hand it a **monotone predicate**
and it finds the boundary. The precondition is exactly that monotonicity
— false for a prefix, true for the rest — and it is the caller's job.
`a[i] == key` is not monotone, so it is not merely wrong on some inputs,
it is outside the contract and the result is meaningless. `a[i] > key`
is monotone and gives `upper_bound` instead, and `a[i] < key` is
monotone the wrong way round (true then false), so the result is
whatever the halving happens to land on: 0 only in the degenerate case
where `key` exceeds every element, and otherwise something unrelated to
the answer — `LowerBound([]int{1, 10, 20, 30}, 5)` returns 4.

The predicate form is more general than it looks: the array need not be
in memory at all. `sort.Search(1e9, func(i int) bool { return cost(i) >=
budget })` binary-searches an abstract answer space — the "binary search
on the answer" idiom — which is awkward to express with a comparator.

Since Go 1.21 the direct equivalents exist in the `slices` package:
`slices.BinarySearch(a, key)` returns `(index, found)` where `index` is
exactly this lower bound, and `slices.BinarySearchFunc` takes a
comparison function. Prefer those for the common case, and keep
`sort.Search` for the abstract-space searches.

This Card is not compile-checked: the Deck's compile service builds C++
(SPEC §9), so Go snippets are graded by whitespace-normalised equality
(SPEC §4.5).
