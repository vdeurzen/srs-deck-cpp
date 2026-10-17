# core-b review: cpp-essentials/topics/core/02-types

## virtual-destructor  (core/02-types/inheritance-and-virtual/virtual-destructor.md)
- **wrong**: Back says without `virtual` "`path`'s heap buffer leaks", but `"/var/log/app"` (12 chars) lives in the SSO buffer (checked with GCC 16), so nothing leaks. The front claim "path must be destroyed" is also untrue in practice. **Fix:** make `path` a `std::vector<int> data(1000);` (or a 40-char string) and say "its heap buffer leaks".

## operators-hidden-friend-symmetric  (core/02-types/operator-overloading/hidden-friend-symmetric.md)
- **confusing**: Back says "unlike `Meters` from `double`"; `Meters` exists only in another Card (rule 13). **Fix:** replace with "unlike `Meters` from `double` (a unit-less number posing as a unit)", or drop the contrast.

## staticpoly-static-vs-dynamic  (core/02-types/static-polymorphism/static-vs-dynamic.md)
- **confusing**: "Why can't the compiler inline" overclaims: it can devirtualise when the dynamic type is visible (inlining `total` into a caller, LTO, `final`). The back says "vtable", which is not a prerequisite. **Fix:** "Compiled on its own, why can't `total` inline `s.area()`...?"; add "the dynamic type is unknown at this call site"; move the vector remark to another Card.

## move-semantics-const-member-copies  (core/02-types/move-semantics/const-member-copies.md)
- **confusing**: "the only way a `const` member can ever be 'moved'" is garbled (a const member is never moved). `a` is undeclared and might be const. **Fix:** show `Row a{...}; Row b = std::move(a);` and end with "a `const` member is therefore always copied".

## staticpoly-crtp-base  (core/02-types/static-polymorphism/crtp-base.md)
- **confusing**: Parenthetical about `virtual` base blocking the `constexpr` constructor (true only before C++26) is noise and a second idea. No "what it buys" line. **Fix:** delete the parenthetical; add "The base calls `compute_area` without a vtable, so it can inline."

## move-semantics-rule-of-five  (core/02-types/move-semantics/rule-of-five.md)
- **weak**: The card name leaks the answer (five minus the destructor). "One question, five answers" is garbled. Pure name recall, no bug. **Fix:** ask "`Buffer` has a `delete[]` destructor and nothing else; what happens on `Buffer b2 = b1;`?" (double free), or fold into implicit-move-suppressed.

## move-semantics-explain-lost-moves  (core/02-types/move-semantics/explain-lost-moves.md)
- **weak**: Rubric item 2 holds several claims (P1825/P2266 versions, subobject case, forwarding reference). The prompt asks for three costs; the rubric spends two items on `return std::move`. **Fix:** item 2 becomes "returning a by-value parameter by name is already moved"; drop paper numbers; one item each for the move, forward and vector causes plus fixes.

## move-semantics-explain-mechanism  (core/02-types/move-semantics/explain-mechanism.md)
- **weak**: Items 2 and 4 each bundle 2-3 claims, so ticking is subjective. **Fix:** split item 2 (cast vs. selected move operation); trim item 4 to "valid but unspecified: only precondition-free calls are safe".

## virtual-vptr-sizeof  (core/02-types/inheritance-and-virtual/vptr-sizeof.md)
- **weak**: `sizeof(void*)` is the only non-numeric chip, so it is a surface cue. It is an ABI lookup fact. **Fix:** make chips `sizeof(void*)`, `sizeof(void*) + sizeof(double)`, `2 * sizeof(void*)`, `sizeof(double)`, or ask what a second virtual function adds to `sizeof`.

## staticpoly-type-erasure  (core/02-types/static-polymorphism/type-erasure.md)
- **weak**: No concrete example; "type erasure" is only glimpsed in the lambda Card. **Fix:** add a 5-line sketch (`struct AnyShape { struct Concept{virtual double area() const=0;}; template<class T> struct Model... }`).

## operators-chunk-arithmetic-pair  (core/02-types/operator-overloading/chunk-arithmetic-pair.md)
- **weak**: Two ~100-character lines in 10 s; `constexpr` is harness noise, not the idiom. **Fix:** drop `constexpr`, use a runtime harness, or raise expose_ms to 14000.

## templates-instantiation  (core/02-types/templates-and-concepts/instantiation.md)
- **weak**: "What makes the compiler generate `twice<int>`?" also has the defensible answer "explicit instantiation `template int twice<int>(int);`". **Fix:** "...when the program only calls `twice(3)`?" or "Without an explicit instantiation, what triggers...".

## templates-concepts-vs-sfinae  (core/02-types/templates-and-concepts/concepts-vs-sfinae.md)
- **weak**: Largely repeats tmpl-concept-error (same `half`, same `std::integral<double>` message). Only the enable_if contrast is new. **Fix:** ask for the deciding property (constraints take part in overload ordering and are readable) or merge.

## virtual-slicing  (core/02-types/inheritance-and-virtual/slicing.md)
- **weak**: Near-duplicate of virtual-slice-parameter (also a trace; by-ref vs. by-value slicing); `requires` it. **Fix:** make it a misconception `basic` ("`vector<Animal>` push_back(Dog)") or a `code` Card on `std::vector<std::unique_ptr<Animal>>`.

## virtual-static-dispatch  (core/02-types/inheritance-and-virtual/static-dispatch.md)
- **weak**: Duplicates virtual-dispatch-which-runs, the trace it requires (static type picks the non-virtual call). **Fix:** add a deciding-property angle ("a `Base*` calls `f()`: which two things must hold for Derived::f to run?") or drop.

## class-pimpl  (core/02-types/classes/pimpl.md)
- **weak**: No code beyond one line. Omits the classic trap that the destructor must be defined where `Impl` is complete. **Fix:** add a 4-line `widget.cpp` snippet and "`~Widget() = default;` goes in the .cpp, else incomplete-type error".

## virtual-final  (core/02-types/inheritance-and-virtual/final.md)
- **weak**: `requires` only virtual-vptr-sizeof, not dispatch. Front states the devirtualisation purpose. **Fix:** require virtual-static-dispatch and virtual-dispatch-dynamic-type; front: "No class may derive from `Circle`."

## templates-typename-disambiguator  (core/02-types/templates-and-concepts/typename-disambiguator.md)
- **weak**: Front nearly gives the answer ("what `C::value_type` names" is unknown). `auto`/`class` chips are ungrammatical, so little discrimination. **Fix:** drop the last sentence of the front; replace `auto` with `decltype` or `using`.

Reviewed 45 cards: 1 wrong, 4 confusing, 13 weak; OK: 27.

## Applied
- virtual-destructor: fixed. `path` is now a 32-char string (heap-allocated in libstdc++), and the back says why it leaks.
- operators-hidden-friend-symmetric: fixed. `Meters` reference replaced with an inline description of a length type built from a bare `double`.
- staticpoly-static-vs-dynamic: fixed. Front says "Compiled on its own"; answer is "the dynamic type is unknown at this call site"; vtable and vector remarks dropped.
- move-semantics-const-member-copies: fixed. Front now declares `Row a{...}`; ends with "a `const` member is never moved, only copied" (checked with GCC 16.2).
- staticpoly-crtp-base: fixed. constexpr parenthetical removed; added a line on what it buys (direct call, can inline).
- move-semantics-rule-of-five: fixed, with a different angle. `b = a;` on a Buffer that has a deep copy constructor and a destructor: copy assignment leaks and double-frees (ASan-confirmed). The suggested `Buffer b2 = b1;` would duplicate raii-copy-double-close.
- move-semantics-explain-lost-moves: fixed. Five items: cost/fix for return std::move, cost/fix for forwarding, and one for the vector cause plus fix. Paper numbers dropped. Item 2 is "`return local;`", not the by-value parameter, because the prompt is about a local.
- move-semantics-explain-mechanism: fixed. Cast and selected operation split; moved-from item trimmed; still 5 items.
- virtual-vptr-sizeof: fixed. Chips are `sizeof(void*)`, `2 * sizeof(void*)`, `sizeof(void*) + 1`, `1`; the back says why there is no extra byte.
- staticpoly-type-erasure: fixed. Added a compiled AnyShape Concept/Model sketch.
- operators-chunk-arithmetic-pair: fixed. Dropped `constexpr`; the harness now pins the return types of `+=` and `+`.
- templates-instantiation: fixed. Front adds "With no explicit instantiation anywhere".
- templates-concepts-vs-sfinae: fixed. Re-angled to subsumption ordering (integral vs signed_integral; the enable_if version is ambiguous, checked with GCC 16.2).
- virtual-slicing: fixed. Now a trace of `vector<Animal>` vs `vector<unique_ptr<Animal>>`, re-run under GCC 16.2.
- virtual-static-dispatch: fixed, with a different angle. Qualified call `s.Shape::name()` suppresses virtual dispatch ([class.virtual]/16). The suggested "two conditions" angle would duplicate virtual-override-mismatch.
- class-pimpl: fixed. Header snippet on the front; widget.cpp snippet on the back with `~Widget() = default;` and the reason it goes there (checked that omitting it fails to compile).
- virtual-final: fixed. Requires virtual-dispatch-dynamic-type (which already reaches static-dispatch) instead of vptr-sizeof; devirtualisation sentence removed from the front.
- templates-typename-disambiguator: fixed. Front no longer hints; `auto` replaced by `const`, which encodes the "C++20 dropped typename" misconception (P0634).
