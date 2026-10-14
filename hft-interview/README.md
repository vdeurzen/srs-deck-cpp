# `hft-interview`

The questions low-latency C++ interviews ask, split into one decision per Card:
"implement `vector::push_back`", "write an SPSC queue", "design an order book",
plus the trivia round. It builds on all four other Decks and `require`s their
concept Cards instead of restating them; nothing requires this Deck, so it can
be paused or practised on its own. The plan is `PLAN.md`.

## Layout

```
topics/01-implement-std/<component>   vec-, storage via cpp-core, uptr-/sptr-, erasure-, opt-, sso-, flatmap-, inplace-
topics/02-hft-design/<problem>        spsc-, book-, lru-, bucket-, packet-, pool-
topics/03-trivia                      trivia-
```

Id prefixes keep qualified ids readable next to the algo-systems Cards on the
same subjects (`algo-systems/ll-spsc-ring` vs `hft-interview/spsc-try-push`).

## Conventions

The grammar is `docs/FORMAT.md`; `cpp-core/README.md` and `PEDAGOGY.md` hold
the shared conventions. Specific to this Deck:

- **Implement-it Cards run in the compiler.** A `consteval` test under
  `static_assert` executes the code during compilation, and constant
  evaluation rejects leaks, use after free, reads outside an object's lifetime
  and out-of-bounds writes. Containers use `std::allocator<T>` with
  `std::construct_at` / `std::destroy_at`, holding long (heap-allocating)
  `std::string`s or a live-object counter so a skipped destroy leaks.
- **Not constexpr in C++23 (g142):** placement new, `reinterpret_cast`,
  `memcpy`, `std::uninitialized_*`, `std::atomic`. Relocate with a
  `construct_at` loop; keep `memcpy` behind `if !consteval`.
- **Concurrent structures are templated on their atomic type.** The harness
  passes a constexpr `FakeAtomic` that records the last `memory_order`, so a
  wrong order fails a `static_assert`; layout is pinned with `offsetof % 64`.
- **Check with `scripts/check-code --remote`** before committing: constant
  evaluation differs between GCC versions, and the app grades with g142.
- **Implementation-specific facts are labelled** (libstdc++ grows by 2, its
  SSO holds 15 chars).
- **Trace values follow from the code.** A compiled run checks them, but no
  compiler is named on a Card as the source of truth.
