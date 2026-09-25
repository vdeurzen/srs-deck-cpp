---
id: foundations-amortised-vs-average
kind: basic
version: 1
level: 2
tags: [complexity, amortised, sequences]
refs:
  - https://epubs.siam.org/doi/10.1137/0606031
  - https://en.cppreference.com/w/cpp/container/vector/push_back
---

## `push_back` is *amortised* O(1). How is that different from *average-case* O(1), and what does it promise about any single call?

---

**Amortised** is a worst-case statement about a *sequence*: any run of
`n` `push_back`s costs O(n) in total, so the cost per operation averages
to a constant no matter which sequence you pick. There is no randomness
and no assumption about the input — the guarantee is unconditional.

**Average-case** is a statement about a *distribution*: cost averaged
over inputs, or over the random choices an algorithm makes (quicksort
with a random pivot, a hash table under simple uniform hashing). An
adversary who knows your input distribution can still hurt you;
an adversary cannot defeat an amortised bound.

Neither says anything about one call. The doubling `push_back` that
triggers a reallocation copies or moves all `n` elements and is
straightforwardly O(n); the amortisation argument is that it is paid for
by the `n/2` cheap pushes that preceded it. The accounting is the point:
each push deposits a constant amount of credit, and the reallocation
spends it.

That distinction is exactly what makes amortised bounds unsuitable for
hard real-time and for tail-latency work. A p99.9 budget measured in
microseconds is a statement about *single* operations, so a hot path
either reserves capacity up front, or uses a structure with a real
worst-case bound per operation (a fixed ring buffer, a chunked deque)
instead of one that is merely amortised.
