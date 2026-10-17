# Review: cpp-essentials basics 01-07 (basics-a)

All trace values, constexpr-graded distractors (delete[]/delete/leak, const vs value return, make_unique of an aggregate, NULL ambiguity, brace narrowing, `Size();`, non-explicit conversion) were compiled with g++ 16.2 -std=c++23 under /tmp/basics-a/ and behave as the Cards claim. No factual errors found.

## life-misconception-shared-to-be-safe  (06-object-lifetime/life-misconception-shared-to-be-safe.md)
- **confusing**: "What does that choice cost or hide?" has several defensible answers (refcount cost, hidden sharing on copy, cycles, unclear ownership); the back picks one. **Fix:** ask "After `Parser q = p; q.step();`, what is `p`'s `lexer->pos`, and what would the same line do with `std::unique_ptr<Lexer>`?" and keep the cost remark as the elaborate.

## life-ctor-dtor-count  (06-object-lifetime/life-ctor-dtor-count.md)
- **confusing**: first use of `~Cell()`; no Card in the chain (life-scope-automatic, class-constructor-intro) defines a destructor (name `~T`, runs at end of lifetime). life-destructor-frees later fills one in without introducing it. **Fix:** add a basic "destructor-intro" Card (`~Car()`, no params/return, runs automatically when the object dies) and require it here and from life-destructor-frees.

## class-default-ctor-restore  (05-classes/default-ctor-restore.md)
- **weak**: the front explains `= default` and `= delete`, so the answer is nearly stated. **Fix:** drop the first sentence (the earlier-met mechanism belongs in a requires Card) and say only "`Size s;` stopped compiling when the two-argument constructor was added. Restore it."

## life-destructor-frees  (06-object-lifetime/life-destructor-frees.md)
- **weak**: `data[0] = 0;` is a strawman distractor. **Fix:** replace with `std::free(data);` (a real mixed-allocator mistake, fails in constexpr) and keep `data = nullptr;`.

## fn-return-by-value  (04-functions/return-by-value.md)
- **weak**: back is ~85 words, leans on C++23 simpler-implicit-move trivia to explain one distractor, and requires ptr-bump-by-reference needlessly. **Fix:** cut to answer + dangling reason; drop the `std::string&` sentence; requires ptr-dangling-local only.

## ptr-dangling-local  (02-references-and-pointers/ptr-dangling-local.md)
- **weak**: "GCC 16.2 at -O0 returned a null pointer" is compiler-version trivia in a misconception answer. **Fix:** replace with "the compiler may also replace the pointer with null, so the read can crash".

## class-constructor-intro  (05-classes/constructor-intro.md)
- **weak**: asks for the definition ("what two features") rather than recognition. **Fix:** show `struct A { A(int); int A2(int); void A(int); };`-style three declarations and ask "which is a constructor, and what tells you?"

## types-overflow-rules  (01-types-and-values/types-overflow-rules.md)
- **weak**: `2ᴺ` leaves N undefined and there is no concrete example. **Fix:** add `unsigned char c = 255; ++c;` giving 0, and write "modulo 2ᴺ (N = bits of the type)".

## class-invariant-who-checks  (05-classes/invariant-who-checks.md)
- **weak**: "only the constructor and the member functions that write" omits friends and copy/assignment (which must also preserve it). **Fix:** "Only `Range`'s own members and friends (including its copy operations)".

## ptr-explain-parameter-forms  (02-references-and-pointers/ptr-explain-parameter-forms.md)
- **weak**: rubric item 2 (`T&`, writes reach caller) comes from ptr-bump-by-reference, which is not in requires. **Fix:** add `ptr-bump-by-reference` to requires.

## const-loop-chunk  (03-const/const-loop-chunk.md)
- **weak**: back ends with grader-internal text ("Graded by text: without its #include lines...") that means nothing to the learner. **Fix:** delete that sentence.

## Verified-by lines in backs  (life-copy-which-runs, life-new-outlives-scope, life-reverse-order-trace, life-shared-ptr-owners, life-temporary-full-expression, life-unique-ptr-owns-trace, class-const-object-call, class-init-list-vs-body, life-ctor-dtor-count)
- **weak**: each back ends "Verified by compiling and running ... GCC 16.2 / ASan", which is author provenance, not teaching, and eats the 40-word budget. **Fix:** delete those sentences.

## Batch notes
- Ids spell out several blanks (class-explicit-blocks-conversion, life-make-unique, ptr-nullptr-overload, class-delete-copy, fn-return-by-value); ids cannot change, so only matters if the app shows them.
- 04-functions has just 3 Cards (no pass-by-value vs reference contrast, default args); topic is thin for interviews.
- Misconception Cards are mostly good; no destructor or copy-ctor concept Card precedes their use.

Reviewed 67 cards: 0 wrong, 2 confusing, 17 weak; OK: 48.

## Applied
- life-misconception-shared-to-be-safe: fixed. Front now asks one question, "what does `p.pos()` return after `Parser q = p; q.step();`" (added a `pos()` accessor because `lexer` is private). Answer 1 (checked with g++ 16.2); the unique_ptr contrast and refcount cost stay in the back.
- life-ctor-dtor-count: fixed. New Card life-destructor-intro (requires class-constructor-intro) now replaces class-constructor-intro in its requires, so fan-in stays 2.
- class-default-ctor-restore: fixed. Dropped the sentence explaining `= default`/`= delete`; the back still explains both.
- life-destructor-frees: fixed. `data[0] = 0;` became `std::free(data);` (added `#include <cstdlib>` so it fails for the real reason: free is not constexpr). Back updated; now also requires life-destructor-intro.
- fn-return-by-value: fixed. Back cut to about 50 words and requires only ptr-dangling-local. Kept a short reason for the `std::string&` chip so that choosing it is still explained.
- ptr-dangling-local: fixed. The GCC 16.2 trivia became "may replace the returned pointer with null, so the read can crash".
- class-constructor-intro: fixed. It is now a recognition question with three declarations (`Car make(int)`, `Car(int)`, `int car(int)`): which one is the constructor?
- types-overflow-rules: fixed, with a better example. `unsigned char c=255; ++c;` promotes to int, so it is a conversion, not unsigned wrap. Used `unsigned u = UINT_MAX; ++u;` → {{c1::0}} plus "N = the type's width in bits".
- class-invariant-who-checks: fixed, adjusted. "Range's own members (plus any friends it declares)". The back now says `size()` is const and the implicit copies copy a valid pair.
- ptr-explain-parameter-forms: fixed. Added ptr-bump-by-reference (fan-in 3: each of the three Cards supplies rubric items, as PEDAGOGY §3 asks for explain capstones).
- const-loop-chunk: fixed. Deleted the grader-internal sentence.
- Verified-by lines: skipped, because FIX-BRIEF says to keep the provenance lines (a FORMAT.md convention).
