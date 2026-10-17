# Review: interview-essentials systems/ and hft/

## foundations-bits-lowest-set-bit  (interview-essentials/topics/systems/01-foundations/cost-models/bits-lowest-set-bit.md)
- **wrong**: The back says to use unsigned or wider because a `uint8_t` promotes to `int` before `-`. Verified: `uint8_t y=104; y & -y` still gives 8. The real hazard is signed `x == INT_MIN` (`-x` overflows, UB). **Fix:** replace the last sentence with "Use an unsigned type: for a signed `x`, `-x` overflows when `x` is `INT_MIN`."

## ll-spsc-orders  (interview-essentials/topics/systems/11-low-latency/lock-free/spsc-orders.md)
- **confusing**: "The producer's load of `head` is not about seeing space" is misleading. The load is how the producer sees free space, and its acquire also orders the consumer's slot read before the overwrite. The c2 blank "read of the slot" has several equivalent phrasings. **Fix:** say "The producer's `acquire` load of `head` does two jobs: it shows free space, and it orders the consumer's earlier ___ of the slot before the overwrite". Give c2 the hint "which access of the consumer's?" and accept "read/load".

## foundations-growth-below-two  (interview-essentials/topics/systems/01-foundations/cost-models/growth-below-two.md)
- **confusing**: `elaborate` asks "which of these questions", but no questions are listed. The back's sum (freed blocks 1..2^(k-1) against a request of 2^k) also counts the block still live during the copy. **Fix:** elaborate: "If you know `n` in advance, which cost does `reserve(n)` remove: copying, or fragmentation?" Back: "freed blocks 1+…+2^(k-2) < live 2^(k-1) < next 2^k".

## db-lru-recency-bet  (interview-essentials/topics/systems/10-databases/storage-and-indexes/lru-recency-bet.md)
- **confusing**: "0 % hit rate however long it runs" is also met by a scan of never-repeating keys. "Sequential flooding" is undefined jargon. **Fix:** front: "A loop repeatedly cycles over K+1 distinct keys through an LRU cache of K entries. What hit rate does it get?" Back: "0 %: each access evicts the key needed next." Drop "sequential flooding" or define it.

## vec-reserve-contract  (interview-essentials/topics/hft/01-implement-std/vector/vec-reserve-contract.md)
- **confusing**: c1 is a multi-token expression (`n > capacity()`), so grading is ambiguous. c2 is implied by "iff" in c1, and its hint ("effect on the buffer") nearly gives the answer. **Fix:** make it one blank: "`reserve(n)` reallocates only when `n` is ___ `capacity()`" with answer "greater than", and drop c2. Or make c2 "`reserve(n)` never ___ `size()`" with answer "changes".

## seq-ring-buffer-mask  (interview-essentials/topics/systems/02-sequences/arrays-and-buffers/ring-buffer-mask.md)
- **confusing**: The back's last sentence of paragraph 2 ("the comparison that makes naive index-based rings need an extra 'full' flag or a wasted slot") is garbled. The front also gives away "one AND". **Fix:** rewrite as "so `tail − head` is the size and `tail == head` is empty, where wrapped indices would need a flag or a wasted slot". Front: "Complete the wrap for a power-of-two capacity."

## lru-evict-map  (interview-essentials/topics/hft/02-hft-design/lru/lru-evict-map.md)
- **confusing**: The front says "The three-entry LRU from `lru-touch`" and `elaborate` says "`trace-lru-order`'s `touch`". Card ids mean nothing to the learner (PEDAGOGY §2.13). **Fix:** front: "A three-entry LRU stores each slot's key". Elaborate: "In the `std::list` + `unordered_map` LRU, which line makes the same choice, and what breaks if you pop the list first?"

## lru-touch  (interview-essentials/topics/hft/02-hft-design/lru/lru-touch.md)
- **confusing**: `elaborate` names `trace-lru-order`. **Fix:** "Which `splice` call in the `std::list` LRU does this body replace, and what does that version allocate that this one doesn't?"

## spsc-try-pop-parsons  (interview-essentials/topics/hft/02-hft-design/spsc/spsc-try-pop-parsons.md)
- **confusing**: "the mirror image of `try_push`" points to another Card the learner may not have in mind. **Fix:** "Now the consumer's side of a single-producer single-consumer ring: it pops from `head_` and reads the producer's `tail_`." Drop the `try_push` mention.

## foundations-cache-cost-model  (interview-essentials/topics/systems/01-foundations/cost-models/cache-cost-model.md)
- **weak**: Three ideas in one cloze (miss as the unit, 64-byte line, prefetching). The c1 hint "a trip to a slower level" restates the answer. c2 duplicates `ll-hardware-numbers`. **Fix:** drop the c2 blank (leave the line size to `ll-hardware-numbers`) and change the c1 hint to "a hardware event".

## ll-hardware-numbers  (interview-essentials/topics/systems/11-low-latency/latency-and-layout/hardware-numbers.md)
- **weak**: Near-duplicate of `foundations-cache-cost-model` c2 ("64 bytes"), and `ll-false-sharing` tests 64 again. It is also a pure lookup, and 128 is defensible on Apple silicon. **Fix:** delete it, or re-angle it as "two counters 8 bytes apart, written by two cores: what unit does the hardware move?" (answer: the 64-byte line).

## foundations-latency-scale  (interview-essentials/topics/systems/01-foundations/cost-models/latency-scale.md)
- **weak**: The answer says "about 100×" but quotes 1 ns vs 80 ns (80×) and 4 vs 300 cycles (75×). A learner answering 50× or 80× argues. **Fix:** ask "to the nearest power of ten" and answer "~100× (two orders of magnitude): ~1 ns vs ~80 ns".

## trap-linked-list-insertion  (interview-essentials/topics/systems/14-transfer/intuition-traps/linked-list-insertion.md)
- **weak**: Outcome verified (list 75 ms vs vector 5 ms here). But 10 000 nodes fit in L2, so "list nodes miss cache" is not the main cause. **Fix:** "The vector, typically ~10× sooner: the search dominates; a list walk is a chain of dependent loads, while the vector scans contiguously (prefetched, vectorisable)."

## ll-memory-orders  (interview-essentials/topics/systems/11-low-latency/lock-free/memory-orders.md)
- **weak**: Verified (GCC 16.2 -O2: `seq_cst` store gives `xchg`, the rest give `mov`). But it is an asm-lookup fact at level 5. The blank "plain MOVs" could be answered several ways, and the hint says only "an instruction class". **Fix:** hint "an x86 instruction, not a fence"; accept "mov". Or re-angle it as "why does a passing x86 stress test not validate `relaxed`?".

## book-trade-price  (interview-essentials/topics/hft/02-hft-design/order-book/book-trade-price.md)
- **weak**: The front omits the venue context, and auctions and some venues price differently. **Fix:** "On a continuous price-time venue, your limit buy at 6 hits a resting ask at 4. At what price do you trade?"

## chunks-cache-padded-counter  (interview-essentials/topics/systems/12-idioms/chunks/cache-padded-counter.md)
- **weak**: The back is ~110 words. It is the third Card on `alignas(64)` after `ll-false-sharing` and `spsc-layout-chunk`. **Fix:** cut the back to the two lessons (alignas on the struct, one slot per thread) and move the 128-byte note to `ll-false-sharing`.

## uptr-explain-implement  (interview-essentials/topics/hft/01-implement-std/smart-pointers/uptr-explain-implement.md)
- **weak**: Rubric item 1 bundles two claims (stateful deleter widens the pointer; empty deleter costs nothing). **Fix:** "Stores the deleter beside the `T*`, so a stateful deleter widens every `unique_ptr` (an empty one costs nothing via EBO)". Treat the parenthesis as non-gradable.

## vec-build-mini-vector  (interview-essentials/topics/hft/01-implement-std/vector/vec-build-mini-vector.md)
- **weak**: The front says relocation is "so that growth can roll back if a copy throws", but the code has no rollback. That leaks `move_if_noexcept` and misleads. **Fix:** "...and the relocation, so that a throwing move never leaves the old elements damaged."

## seq-invalidation-rules  (interview-essentials/topics/systems/02-sequences/arrays-and-buffers/invalidation-rules.md)
- **weak**: The c1 hint "how many of iterators, pointers and references?" gives "everything". c2 is a long phrase blank. The unordered_map ref is unused. **Fix:** c1 hint "which of the three handles?"; make c2 just "references and pointers"; drop the unused ref.

Reviewed 69 cards: 1 wrong, 8 confusing, 10 weak; OK: 50.

## Applied
- foundations-bits-lowest-set-bit: fixed (verified `uint8_t` 104 & -104 == 8; last sentence now names the signed `INT_MIN` overflow).
- ll-spsc-orders: fixed (head load "does two jobs"; c2 is the single word "read", hint "which access of the consumer's?", back notes "load" is equivalent; cloze has no accept-list syntax).
- foundations-growth-below-two: fixed (elaborate names the two costs; sum now freed `1+…+2^(k−2)` vs live and requested block; back trimmed to ≤ 60 words; 1.5 "after four reallocations" recomputed: s5 ≤ s0+…+s3).
- db-lru-recency-bet: fixed (front states the K+1 cycle and asks for the hit rate; "sequential flooding" replaced by plain words).
- vec-reserve-contract: fixed (c1 one token "greater than"; c2 re-angled to "never changes `size()`").
- seq-ring-buffer-mask: fixed (front no longer says "one AND"; garbled sentence rewritten; division cost softened to "tens of cycles").
- lru-evict-map: fixed (no Card ids in front or elaborate).
- lru-touch: fixed (elaborate names the `splice` call, not a Card id).
- spsc-try-pop-parsons: fixed (front states the consumer's role, no `try_push` mention).
- foundations-cache-cost-model: fixed (dropped the 64-byte blank, c3 renumbered c2, c1 hint "a hardware event").
- ll-hardware-numbers: fixed (re-angled: two cores' adjacent counters, blank is the 64-byte cache line; kept, since ll-false-sharing requires it).
- foundations-latency-scale: fixed ("to the nearest power of ten"; answer ~100×).
- trap-linked-list-insertion: fixed (bold answer: search dominates; dependent loads vs contiguous scan). Kept the card's own GCC 16.2 measurement.
- ll-memory-orders: fixed (blank is `mov`, hint "an x86 instruction, not a fence"; re-verified with GCC 16.2 -O2: seq_cst store = xchg, others mov).
- book-trade-price: fixed (continuous price-time-priority venue named).
- chunks-cache-padded-counter: fixed (back cut to the two lessons; 128-byte note already lives in ll-false-sharing).
- uptr-explain-implement: fixed (rubric item 1 has one gradable claim, EBO in parentheses).
- vec-build-mini-vector: fixed (front no longer promises a rollback).
- seq-invalidation-rules: fixed (intro names the three handles; c1 "all three"; c2 "references and pointers"; unused unordered_map ref dropped).
- Not a finding: spsc-try-pop-parsons is LOOSE in check-code (each distractor passes as an extra line somewhere in the body); this was so before these edits and is left as is.
