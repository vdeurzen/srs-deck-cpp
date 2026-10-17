# core-c review: core/03-library and core/10-concurrency

All 12 compile-graded Cards here pass `scripts/check-code --remote` (GCC 14.2). Trace values re-derived by hand: `n = 10` and `c_str = "report.txt.bak"`; `seen = 42` and `was = true`; `old = 2000` and `now = 2005`.

## storage-destroy-at-pop  (cpp-essentials/topics/core/03-library/raw-storage/destroy-at-pop.md)
- **confusing**: `data_[size_].~T();` also ends the last element's lifetime and is the equally correct answer. The snippet also uses `data_`, `size_` and `cap_`, which are declared only on another Card. **Fix:** Ask "which `<memory>` function ends just that element's lifetime?" and put the three members in the snippet as a comment or struct.

## vocab-variant-closed-set  (cpp-essentials/topics/core/03-library/vocabulary-types/variant-closed-set.md)
- **confusing**: "Why variant rather than a base class?" has several defensible answers (value semantics, no heap allocation, no vtable, exhaustive visit). The card grades only "closed set". **Fix:** Ask "What does `std::visit` give you when a fourth alternative is added that a base class cannot?", or make the front the code change and ask what happens to the existing visitors.

## smart-pointers-shared-ptr-control-block  (cpp-essentials/topics/core/03-library/smart-pointers-and-ownership/shared-ptr-control-block.md)
- **confusing**: "Which three things" is not unique. The control block also holds the allocator and, via `make_shared`, the object, and a learner may answer "pointer to the object". "No single shared_ptr could hold for itself" is also opaque. **Fix:** Reword to "Why does a `shared_ptr` keep its reference count in a separate heap control block instead of inside each `shared_ptr`?" and answer "so all copies share one count; it also holds the weak count and deleter".

## smart-pointers-explain-shared-ptr  (cpp-essentials/topics/core/03-library/smart-pointers-and-ownership/explain-shared-ptr.md)
- **confusing**: Rubric item 5 (the deleter captured at construction makes `shared_ptr<Base>` delete a `Derived` without a virtual destructor) is taught by no Card in its `requires` chain. The control-block Card says only "type-erased deleter". **Fix:** Add a short `basic` or `trace` Card on that consequence and require it, or drop the `Base`/`Derived` clause and item 5.

## threads-cv-wait-needs-predicate  (cpp-essentials/topics/core/10-concurrency/threads-and-locks/cv-wait-needs-predicate.md)
- **confusing**: There is no code. The front uses `cv`, `lk`, `pred`, "spurious" and "notify" with no example, and the chain does not introduce condition variables. **Fix:** Add a 3-line consumer snippet (`unique_lock lk(m); cv.wait(lk); use(queue.front());`) and one line saying what `notify_one` does.

## storage-construct-at  (cpp-essentials/topics/core/03-library/raw-storage/construct-at.md)
- **weak**: There is no `requires` for `allocate-vs-construct`, which this Card assumes. Placement new is the idiom interviewers expect (vector internals) and appears only as a constexpr-rejected distractor. **Fix:** Add `requires: [storage-allocate-vs-construct]` and add a sibling Card on placement new with `<new>`.

## atomics-lock-free-is-per-type  (cpp-essentials/topics/core/10-concurrency/atomics-and-memory-model/lock-free-is-per-type.md)
- **weak**: The back is about 150 words and mixes the 16-byte, `-mcx16` and `libatomic` details, against the 40-word limit in PEDAGOGY §2 rule 2. **Fix:** Keep the property and the `is_always_lock_free` versus `is_lock_free()` split; drop the `-mcx16` and `libatomic` detail.

## smart-pointers-unique-ptr-deleter-size  (cpp-essentials/topics/core/03-library/smart-pointers-and-ownership/unique-ptr-deleter-size.md)
- **weak**: It has no `requires`, so it unlocks at depth 0 although it needs `unique_ptr` ownership. The back is about 170 words. **Fix:** Add `requires: [smart-pointers-unique-ptr-ownership]` and trim the back to the stateless-deleter rule plus one example distractor.

## vocab-visit-missing-handler  (cpp-essentials/topics/core/03-library/vocabulary-types/visit-missing-handler.md)
- **weak**: The answer is inferable from `struct Square` and `s.side` in the snippet, so it never tests the exhaustiveness idea. **Fix:** Show `Shape` with three alternatives and an overload set missing one, or ask what the compiler does when the third handler is deleted.

## vocab-expected-carries-error  (cpp-essentials/topics/core/03-library/vocabulary-types/expected-carries-error.md)
- **weak**: The front does not say `std::expected` is C++23, and there is no signature example. **Fix:** Add "(C++23)" to the front and a one-line `std::expected<int, PortError> parse_port(std::string_view)` to the back.

## strings-string-view-not-null-terminated  (cpp-essentials/topics/core/03-library/strings-and-format/string-view-not-null-terminated.md)
- **weak**: Probe 1 (`n = 10`) is trivial and not a decision point. **Fix:** Drop probe 1 and keep the `c_str` probe, or make probe 1 `name.data() == all.data()` with value `true`.

## containers-explain-choosing  (cpp-essentials/topics/core/03-library/containers/explain-choosing.md)
- **weak**: Rubric item 5 (never use `operator[]` for lookup) is not about choosing a container. Items 1 and 3 overlap. **Fix:** Replace item 5 with "Names `deque` for stable references plus O(1) indexing, `list` only when stable references are needed without indexing", and fold item 3 into it.

## smart-pointers-sink-parameter  (cpp-essentials/topics/core/03-library/smart-pointers-and-ownership/sink-parameter.md)
- **weak**: The back adds `unique_ptr&` and `Node*` semantics, a second idea. **Fix:** Cut the last sentence, or move it to a separate contrast Card for `unique_ptr&` versus `Node*`.

## atomics-chunk-cas-loop  (cpp-essentials/topics/core/10-concurrency/atomics-and-memory-model/chunk-cas-loop.md)
- **weak**: The back is about 90 words and covers weak versus strong, `relaxed`, and the refreshed `old`. No Card in the chain teaches `compare_exchange` itself, so the chunk is the first meeting. **Fix:** Trim the back to the CAS-loop idiom and the refreshed-`old` point. Add a short `basic` Card on `compare_exchange` failure semantics and require it.

Reviewed 46 cards: 0 wrong, 5 confusing, 9 weak; OK: 32.

## Applied
- storage-destroy-at-pop: fixed. Front now asks which `<memory>` function ends only the last element's lifetime; snippet declares `Vec`'s three members; the back names `data_[size_].~T()` as the equivalent.
- vocab-variant-closed-set: fixed. Front is now the code change: `Hexagon` added, and the question is what the compiler does with the existing visitors. The back contrasts this with the open set of a base class.
- smart-pointers-shared-ptr-control-block: fixed. Front reworded as suggested ("why a separate heap block"); the back keeps the weak count, the type-erased deleter, and the two-pointer size.
- smart-pointers-explain-shared-ptr: fixed. New Card `smart-pointers-shared-ptr-deleter-captured` (basic; `make_shared<Derived>` held as `shared_ptr<Base>` runs `~Derived ~Base`, checked with GCC 16.2) requires control-block + virtual-delete-through-base. The explain Card requires it in place of control-block, which it still reaches transitively, so fan-in stays at 3.
- threads-cv-wait-needs-predicate: fixed. Added a 3-line consumer snippet with a comment on what `wait` does, and a line on what `notify_one` does plus the producer.
- storage-construct-at: requires `storage-allocate-vs-construct` added. Skipped the placement-new sibling: it is not a missing prerequisite, and the brief allows new Cards only for prerequisites. The back already names placement new as right at run time.
- atomics-lock-free-is-per-type: fixed. Back trimmed to the property plus the `is_always_lock_free`/`is_lock_free()` split; `-mcx16`/libatomic detail dropped.
- smart-pointers-unique-ptr-deleter-size: fixed. Requires `smart-pointers-unique-ptr-ownership`; back trimmed to the stateless-deleter rule, the `CountingCloser` distractor, and the not-guaranteed caveat (the harness depends on it).
- vocab-visit-missing-handler: fixed. Three empty alternatives; the visitor handles two of them, out of order; bodies return layer numbers that don't cue the type. Choices are Square/Circle/Triangle/const Circle& (each distractor fails on local and remote). `Shape` was dropped as a distractor because, with empty structs, it would compile and pass via conversion.
- vocab-expected-carries-error: fixed. Front says "In C++23"; back shows the `parse_port` signature.
- strings-string-view-not-null-terminated: fixed. Probe 1 is now `same = name.data() == all.data()` → `true` (rerun on GCC 16.2).
- containers-explain-choosing: fixed. The old item 5 (`operator[]`) is gone and its `iter-map-subscript-inserts` require is dropped (fan-in 4 → 3). Item 3 is folded into item 1, and `deque` and `list` are now two separate checkable items, so there are still exactly 5.
- smart-pointers-sink-parameter: fixed. Cut the `unique_ptr&`/`Node*` sentence.
- atomics-chunk-cas-loop: fixed. Back trimmed to the idiom and the refreshed `old` (weak kept as one parenthesis). New Card `atomics-compare-exchange-failure` (basic; `ok=false, expected=7, v=7`, checked with GCC 16.2) requires modification-order + conc-check-then-act; the chunk now requires it.
