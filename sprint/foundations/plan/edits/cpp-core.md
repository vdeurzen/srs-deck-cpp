# Consolidated edits: cpp-core

Per Card staying in the essentials Decks (moved-in Cards included under the batch of their origin). Ids are qualified. `add requires` lists direct prerequisites only, after removing those already reachable; overflow past fan-in 3 became a `define`.

## cpp-essentials/atomics-chunk-cas-loop
- define: "relaxed = no ordering relative to other memory, only atomicity" for `std::memory_order_relaxed`
- define: "`compare_exchange_weak` may fail even when the values match, so it sits in a loop" for `compare_exchange_weak` spurious failure

## cpp-essentials/atomics-explain-publish-with-flag
- define: "sequenced before': earlier in the same thread's program order; spin: loop re-reading a flag until it changes" for "sequenced before", "spin"
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 5 ideas by design (explain) but needs the NEW memory_order card

## cpp-essentials/atomics-modification-order
- add requires: cpp-essentials/conc-single-counter-fix
- define: "torn value: a half-written value seen mid-update; read-modify-write: read, change and write back as one atomic step (`fetch_add`, `exchange`, `compare_exchange`)" for "torn value", "read-modify-write" (`fetch_add`, `exchange`, `compare_exchange`)
- define: "modification order: the single order in which all writes to one atomic happen, which every thread agrees on" for "modification order"
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: no requires at all, yet five new ideas — flag

## cpp-essentials/atomics-synchronizes-with
- add requires: cpp-essentials/atomics-memory-order-intro
- split / reshape: "release sequence", "sequenced" — cut or DEFINE
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 4 ideas — flag

## cpp-essentials/atomics-trace-message-passing
- define: "jthread = a thread that joins itself in its destructor" for `std::jthread c(consumer), p(producer)`, `join`
- define: "exchange stores a new value and returns the old" for `ready.exchange(false)`
- define: "a spin loop re-reads a flag in a loop until it changes" for spin loop
- trace: OK per the trace rebuild (2 one-value probes; reasoning about ordering, not bookkeeping); audit concern(s): Two lessons in one trace (@1 message passing, @2 exchange/join) — flag against §3.1 — optional SHRINK/CONVERT only if review agrees

## cpp-essentials/atomics-trace-relaxed-counter
- define: "`std::jthread` joins itself in its destructor; `fetch_add(n)` adds n atomically and returns the old value; `memory_order_relaxed` keeps the operation atomic but orders nothing else" for `std::jthread`, `fetch_add` returns the old value, `memory_order_relaxed`
- trace: OK per the trace rebuild (2 one-value probes; loop count is read off, not simulated); audit concern(s): Two threads × 1000 iterations and a formula answer (2000, then 2005) — flag against §3.1 (loops ≤ 4 iterations, formu... | Two threads × 1000 iterations and a formula answer (2000, then 2005) — rewrite as a basic or shrink to 2 iterations — optional SHRINK/CONVERT only if review agrees

## cpp-essentials/callables-explain-capture-lifetime
- add requires: cpp-essentials/lambda-store-std-function

## cpp-essentials/chunks-erase-remove
- define: "leftover elements with unspecified values" for "moved-from state"

## cpp-essentials/class-const-ref-not-immutable
- add requires: cpp-essentials/const-member-on-const-ref, cpp-essentials/class-default-member-initialiser
- define: "aliasing: two names (references or pointers) for one object" for aliasing ("two names for one object")
- define: "the compiler must re-read `c.value()` after any call that might write through another name for c" for "access path", "optimiser must reload"

## cpp-essentials/class-explicit-constructor
- add requires: cpp-essentials/class-init-list-required
- define: "a one-argument constructor lets the compiler convert that argument type silently" for "converting constructor", implicit conversion

## cpp-essentials/class-rule-of-zero
- add requires: cpp-essentials/move-semantics-rule-of-five, cpp-essentials/move-semantics-const-member-copies
- define: "the [] form calls delete[] and allows p[i]" for `std::unique_ptr<int[]>`, array form
- define: "`std::size_t` is the unsigned integer type used for sizes and indices" for `std::size_t`

## cpp-essentials/const-constexpr-const-vs-constexpr-cloze
- define: "std::rand() returns a random number, only known when the program runs" for `std::rand()`, `std::`

## cpp-essentials/const-constexpr-constexpr-function-dual-use-cloze
- add requires: cpp-essentials/constexpr-fn-static-assert
- define: "std::cin reads input while the program runs" for `std::cin`
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: constexpr function itself (first met here, 4 ideas: function, constant expression, array bound, static_assert) — flag: combines 3+ new ideas

## cpp-essentials/containers-default-to-vector
- define: "contiguous = elements sit next to each other in memory, like an array" for "contiguous"
- define: "a cache line is the 64-byte block the CPU moves between memory and its caches" for "caches and prefetchers"
- define: "list = linked nodes; deque = double-ended queue in blocks" for `std::list`, `std::deque`
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 4 ideas — flag

## cpp-essentials/containers-erase-while-iterating
- add requires: cpp-essentials/map-unordered-map-intro
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 4 ideas (map, iterators, invalidation, erase idiom) — flag

## cpp-essentials/containers-explain-choosing
- define: "`std::list` is a doubly linked list: O(1) insert/erase at a position, no indexing" for `std::list`
- define: "hash table: key hashed to a bucket" for `unordered_map`
- define: "O(1) = cost does not grow with n" for O(1), O(log n)

## cpp-essentials/containers-map-vs-unordered-map
- add requires: cpp-essentials/map-unordered-map-intro
- define: "O(1): the cost does not grow with n; O(log n): one more step each time n doubles" for O(1), O(log n)
- define: "a hash table keeps m buckets and puts key k in bucket h(k) % m" for "hash buckets"
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 3+ new ideas — flag

## cpp-essentials/containers-stable-references
- define: "O(1) indexing: reaching element i costs the same for every i" for O(1) indexing
- define: "`std::deque` stores elements in fixed-size blocks; `std::list` stores each element in its own node" for "blocks" / list

## cpp-essentials/exceptions-commit-by-swap
- remove requires: cpp-essentials/move-semantics-noexcept-move
- define: "using A = B gives B a second name" for `using Names = ...` alias
- split / reshape: requires move-semantics-noexcept-move is not a direct prerequisite; drops 16 cards into the closure — remove from requires

## cpp-essentials/exceptions-strong-vs-basic
- add requires: cpp-essentials/iter-growth-invalidates
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 3 new ideas — flag

## cpp-essentials/exceptions-unwinding-destroys-locals
- define: "an ofstream closes its file, a lock_guard unlocks its mutex, in their destructors" for `std::ofstream`, `std::lock_guard`
- define: "RAII: acquire a resource in a constructor and release it in the destructor" for RAII (never named)

## cpp-essentials/initialization-brace-prefers-initializer-list
- add requires: cpp-essentials/vector-basics, cpp-essentials/class-constructor-intro
- define: "the brace list {4, 9} seen as a sequence of ints" for `std::initializer_list<int>`

## cpp-essentials/initialization-default-value-zero
- define: "indeterminate: whatever bits were already in that memory" for "default-initialization" / "value-initialization" / "indeterminate"

## cpp-essentials/initialization-magic-statics
- add requires: cpp-essentials/life-function-local-static, cpp-essentials/conc-lost-update-trace
- define: "one shared instance created on first use" for "Meyers singleton"
- define: "`Widget& instance()` returns a reference: the caller gets that object itself, not a copy" for `Widget& instance()` returns a reference
- split / reshape: Combines 4 new ideas (static local, threads, races, singleton) — split or add the requires above

## cpp-essentials/initialization-most-vexing-parse
- add requires: cpp-essentials/class-constructor-intro, cpp-essentials/fn-declaration-vs-definition
- define: "Gadget() in a parameter list means 'a function taking nothing and returning Gadget'" for "function returning Widget taking a pointer to a function returning Gadget"

## cpp-essentials/initialization-user-ctor-no-zero
- add requires: cpp-essentials/class-default-delete-where, cpp-essentials/initialization-aggregate-braces
- define: "user-provided = you wrote its body yourself" for "user-provided"
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 3 new ideas (aggregate, user-provided constructor, value-init) — flag

## cpp-essentials/lambda-closure-type
- add requires: cpp-essentials/const-member-on-const-ref
- define: "f(x) on an object runs its operator()" for `operator()`
- define: "`mutable` lets the lambda body change its by-copy captures" for `mutable`
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 3 new ideas — flag

## cpp-essentials/lambda-dangling-reference
- add requires: cpp-essentials/ptr-dangling-local
- define: "`mutable` lets the lambda body change its by-copy captures" for `mutable` in the fix

## cpp-essentials/lambda-mutable
- split / reshape: `static`/`constexpr`/`noexcept` lambda specifiers in the back — cut (extraneous)

## cpp-essentials/lambda-store-std-function
- define: "int(int) = function type taking an int, returning an int; type erasure = one wrapper type that can hold different callables" for `std::function<int(int)>` signature syntax, "type-erases"
- define: "a function pointer holds the address of a function and can be called through" for function pointer
- define: "`std::vector<T>` is a growable array of T: `v[i]`, `push_back` appends, `size()` counts" for `std::vector<...>` and returning a braced list
- split / reshape: `decltype` — cut

## cpp-essentials/lambda-this-capture
- define: "`[=]` captures every used local by copy; `[*this]` copies the whole object; `[n = expr]` makes a new member n; `[name = expr]` declares a new closure member initialised from expr" for `[=]` default capture, `[*this]`, `[ticks = ticks]`

## cpp-essentials/layout-alignas-sizeof
- define: "alignas(N) forces the type's alignment up to N" for `alignas(64)`
- define: "a cache line is the 64-byte block the CPU moves between memory and its caches" for why 64
- split / reshape: `[dcl.align]`, "GCC 16 accepts it" — drop (trivia)

## cpp-essentials/layout-alignment
- add requires: cpp-essentials/ptr-holds-an-address, cpp-essentials/ub-definition
- define: "x86-64 = the usual 64-bit PC/server CPU" for x86-64
- define: "offset = bytes from the start of the struct" for offset
- define: "the CPU may need two loads, or fault" for "extra memory accesses or trap"

## cpp-essentials/layout-declaration-order
- define: "the optimiser = the compiler stage that rewrites code to run faster" for "optimiser"
- define: "C code compiled separately expects the same byte layout" for "struct shared with C"

## cpp-essentials/layout-explain-hot-struct
- define: "hot loop = the loop that dominates run time" for "hot loop"
- define: "a cache line is the 64-byte block the CPU moves between memory and its caches" for 64-byte boundary

## cpp-essentials/layout-offsets-trace
- add requires: cpp-essentials/layout-padding-worked
- define: "offsetof(S, m) = byte offset of member m; std::size_t = unsigned type used for sizes" for `offsetof`, `std::size_t`
- trace: WORKED FIRST: cpp-essentials/layout-padding-worked (new) is the worked example, wired by the add requires above

## cpp-essentials/layout-padding-sizeof
- add requires: cpp-essentials/constexpr-fn-static-assert
- define: "address is a multiple of the type's size" for "naturally aligned"
- define: "as above" for x86-64

## cpp-essentials/layout-pin-chunk
- define: "bytes sent over a network / written to disk in a fixed format" for "wire message", "file record"
- define: "`#include <x>` makes the library header x available" for `#include <cstddef>`

## cpp-essentials/layout-trailing-padding
- add requires: cpp-essentials/types-size-minimums
- define: "elements of an S[] sit sizeof(S) bytes apart" for `S[]` array of structs, `arr[1].d`

## cpp-essentials/linkage-inline-meaning
- define: "inlining = pasting the callee's body at the call site" for "optimiser", "inlining a call"

## cpp-essentials/linkage-odr-class-repeat
- define: "the linker only sees functions and variables, not types" for `struct Point` and "type, not an object the linker places"
- split / reshape: "variables and templates" — cut or REQUIRE cpp-essentials/templates-instantiation (not yet met)

## cpp-essentials/linkage-translation-unit
- add requires: cpp-essentials/linkage-build-pipeline
- define: "external linkage = visible to other .cpp files" for "external linkage"
- define: "a namespace-scope variable is one declared outside every function" for "namespace scope"

## cpp-essentials/move-semantics-const-member-copies
- add requires: cpp-essentials/raii-move-steals-handle, cpp-essentials/vector-basics
- define: "`std::move(x)` only casts x to an rvalue, which lets a move constructor be chosen" for `std::move(a)`

## cpp-essentials/move-semantics-explain-lost-moves
- define: "NRVO: the compiler may build a returned named local directly in the caller's variable, skipping the copy or move" for "NRVO"
- split / reshape: Three unrelated lessons (return std::move, forwarding reference, vector reallocation) in one explain — flag
- split / reshape: Three unrelated lessons (return std::move, forwarding reference, vector reallocation) in one explain — split into three explain cards and a capstone (FORMAT/PEDAGOGY §4)

## cpp-essentials/move-semantics-explain-mechanism
- add requires: cpp-essentials/vc-named-rvalue-ref-is-lvalue
- define: "move assignment: the same steal as the move constructor, into an object that already exists" for move assignment

## cpp-essentials/move-semantics-forwarding-reference
- add requires: cpp-essentials/tmpl-deduction-conflict
- define: "a reference to a reference collapses to a single reference; & wins" for reference collapsing `Widget& &&`
- split / reshape: `auto&&`, `const T&&`, `std::vector<T>&&` — cut from the back
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 4 ideas (template deduction, T&& vs X&&, collapsing, auto&&) with one require — flag

## cpp-essentials/move-semantics-implicit-move-suppressed
- define: "the compiler writes these members for you unless you declare certain others" for "user-declared", "implicitly declared"

## cpp-essentials/move-semantics-moved-from-state
- add requires: cpp-essentials/class-invariant-who-checks
- define: "what must hold before the call" for "precondition"
- define: "`std::vector<T>` is a growable array of T: `v[i]`, `push_back` appends, `size()` counts" for `front()`, `pop_back()`, `size()`, `empty()`, `clear()`

## cpp-essentials/move-semantics-noexcept-move
- add requires: cpp-essentials/raii-move-steals-handle
- split / reshape: `P1286R2`, "conditional spellings" — cut
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 4 ideas (noexcept, move ctor, vector growth, defaulted special members) — flag

## cpp-essentials/move-semantics-return-std-move
- add requires: cpp-essentials/vector-basics
- define: "NRVO = compiler builds the returned local directly in the caller; -W... = a GCC warning" for NRVO, `-Wpessimizing-move`
- define: "returning a local by name moves it automatically when no elision happens" for "implicitly moved"

## cpp-essentials/move-semantics-rule-of-five
- define: "`std::copy(first, last, out)` copies the range [first, last) to out" for `std::copy`
- define: "`std::size_t` is the unsigned integer type used for sizes and indices" for `std::size_t`

## cpp-essentials/move-semantics-vector-move-if-noexcept
- add requires: cpp-essentials/err-noexcept-broken-promise
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 4 ideas (reallocation, noexcept, strong guarantee, move vs copy) — flag

## cpp-essentials/operators-chunk-arithmetic-pair
- define: "ADL = the compiler also searches the namespaces of the argument types" for `friend`, "hidden friend", ADL ("found only by ADL")
- split / reshape: overruled TOO ADVANCED, audit said "consider TOO ADVANCED until OPS and friend exist"; both now exist as new Cards, and operator+ via += is a core idiom. Keep; DEFINE ADL.

## cpp-essentials/operators-compound-returns-ref
- add requires: cpp-essentials/operator-overloading-basics
- define: "a `constexpr` member function can run at compile time, so the harness can check it" for `constexpr` member
- define: "inside a member function, `this` points at the object the call was made on" for `*this`

## cpp-essentials/operators-hidden-friend-symmetric
- add requires: cpp-essentials/class-friend-basics, cpp-essentials/fn-default-argument
- split / reshape: explicit object parameter `this Rational l` and `static` in the back — cut (C++23 trivia)
- split / reshape: cut `std::complex` (back-only aside)
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 4 ideas — flag

## cpp-essentials/operators-member-vs-free
- add requires: cpp-essentials/operator-overloading-basics, cpp-essentials/const-member-on-const-ref

## cpp-essentials/ptr-auto-drops-ref
- add requires: cpp-essentials/tmpl-function-syntax
- define: "`for (T x : c)` runs the body once per element of c, with x initialised from that element" for range-for `for (auto s : names)`
- define: "`cfg.label()` calls a member function on cfg; `std::string` is a growable sequence of chars" for `std::string`, member function `label()`, `Config cfg{"prod"}`

## cpp-essentials/ptr-dangling
- add requires: cpp-essentials/life-delete-matches-new
- define: "after `delete p`, p holds an invalid pointer value: using it in any way other than reassigning is not allowed" for "invalid pointer value"
- define: "`p->m` is `(*p).m`: follow the pointer, then pick the member" for `p->m`
- define: "implementation-defined: the compiler documents what happens; unspecified: one of several outcomes; undefined: no requirements at all" for "implementation-defined"
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 3+ new ideas (delete, ->, dangling, impl-defined vs UB) — flag

## cpp-essentials/ptr-lifetime-extension
- add requires: cpp-essentials/class-init-list-required
- define: "`for (T x : c)` runs the body once per element of c, with x initialised from that element" for range-for over a call result
- define: "a function returning by value hands the caller its own object" for `Noisy make(char)` returns by value
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 4 ideas (temporary, direct binding, extension, exceptions to extension) — flag

## cpp-essentials/ptr-ref-extension-trap
- define: "front() = reference to first element; `std::vector<T>` is a growable array of T: `v[i]`, `push_back` appends, `size()` counts" for `std::vector<std::string>`, braced temporary `{"ada", "bob"}`, `v.front()`, `std::size_t`
- define: "a function returning by value hands the caller its own object" for returning a reference from a function (`const std::string& first(...)`)
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 4 ideas (reference-returning function, braced vector temporary, extension rule, dangling) — flag

## cpp-essentials/ptr-temporary-full-expression
- define: "guaranteed elision = no copy is made when a function returns a temporary" for "guaranteed elision"

## cpp-essentials/raii-copy-double-close
- add requires: cpp-essentials/class-delete-copy
- define: "FILE* = C library handle to an open file; fclose releases it" for `std::FILE*`, `std::fclose`
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 4 new ideas (FILE*, explicit, init list, = delete) — flag
- split / reshape: Combines 4 new ideas (FILE*, explicit, init list, = delete) — fix by the requires above

## cpp-essentials/raii-ctor-throw-unwinds-members
- add requires: cpp-essentials/class-default-member-initialiser
- trace: OK per the trace rebuild (one run, 2 probes, ~7 trail events; within budget); audit concern(s): Combines 4 ideas (member construction order, ctor throws so ~Whole never runs, unwinding order, skipped statement) in... | Combines 4 ideas (member construction order, ctor throws so ~Whole never runs, unwinding order, skipped statement) in... — optional SHRINK/CONVERT only if review agrees

## cpp-essentials/raii-explain-owning-type
- define: "move assignment = the same steal, into an object that already exists (free its old resource first)" for move assignment
- define: "`std::exchange(x, v)` sets x to v and returns the old x" for `std::exchange`
- define: "`std::FILE*` is the C library's handle to an open file; `std::fclose` releases it" for `std::FILE*`

## cpp-essentials/raii-guard-destructor
- add requires: cpp-essentials/const-constexpr-constexpr-function-dual-use-cloze, cpp-essentials/life-temporary-full-expression
- define: "Lock here is a flag that stands in for a mutex" for "lock" modelled as a bool
- split / reshape: back mentions `run` (the function is `update`) — fix text
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 4 new ideas — flag

## cpp-essentials/raii-move-steals-handle
- add requires: cpp-essentials/vc-rvalue-ref-binds-temporaries, cpp-essentials/err-noexcept-broken-promise
- define: "std::exchange(x, v) sets x to v and returns the old x" for `std::exchange`
- define: "`std::move(x)` only casts x to an rvalue, which lets a move constructor be chosen" for `std::move(o.h)`
- split / reshape: NEW: first card to introduce a move constructor: "a move constructor T(T&&) takes the resource from an expiring object and leaves it empty" (move-semantics-const-member-copies and value-categories-taxonomy also lean on this)
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 5 new ideas (rvalue-ref ctor, exchange, noexcept, constexpr, release counting) — flag

## cpp-essentials/raii-owner-in-destructor
- add requires: cpp-essentials/string-literal-is-char-array
- define: "`std::FILE*` is the C library's handle to an open file; `std::fopen` opens one and `std::fclose` releases it" for `std::FILE`, `fopen`
- define: "RAII = acquire in a constructor, release in the destructor" for name "RAII" never defined

## cpp-essentials/raii-storage-durations
- add requires: cpp-essentials/life-new-outlives-scope
- define: "a variable declared outside every function" for "namespace-scope variable"

## cpp-essentials/smart-pointers-explain-shared-ptr
- add requires: cpp-essentials/smart-pointers-weak-ptr-breaks-cycles
- define: "type-erased deleter: the control block stores the deleter so the shared_ptr's type does not mention it" for "type-erased deleter"

## cpp-essentials/smart-pointers-make-shared-one-allocation
- define: "a cache line is the 64-byte block the CPU moves between memory and its caches" for "cache"
- define: "a `weak_ptr` observes a shared object without owning it, and keeps only the control block alive" for `weak_ptr`

## cpp-essentials/smart-pointers-shared-ptr-control-block
- define: "weak count: how many weak_ptrs still observe the control block; type-erased: stored without appearing in the shared_ptr's type" for "weak count", "type-erased"
- define: "a pointer is 8 bytes on a 64-bit machine, so 'two pointers wide' is 16 bytes" for pointer width ("two pointers wide")

## cpp-essentials/smart-pointers-shared-ptr-deleter-captured
- define: "`std::puts(s)` prints the string s and a newline" for `std::puts`

## cpp-essentials/smart-pointers-sink-parameter
- add requires: cpp-essentials/value-categories-std-move-cloze, cpp-essentials/fn-by-value-vs-reference

## cpp-essentials/smart-pointers-unique-ptr-moved-from-null
- define: "get() returns the raw pointer without giving up ownership" for `a.get()`

## cpp-essentials/smart-pointers-weak-ptr-lock
- add requires: cpp-essentials/conc-thread-shares-memory, cpp-essentials/types-auto-deduces
- define: "an if can declare a variable; a shared_ptr is true when non-empty" for `if (auto p = pin(w))`
- define: "indivisible" for "atomic step"
- define: "`p->m` is `(*p).m`: follow the pointer, then pick the member" for `p->visit()`
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 4 ideas (weak_ptr, lock, threads, auto) — flag

## cpp-essentials/spaceship-basics
- add requires: cpp-essentials/types-auto-deduces
- define: "a <=> b yields an object saying less, equal or greater" for "three-way comparison", "comparison category"

## cpp-essentials/spaceship-hand-written-no-equality
- add requires: cpp-essentials/operator-overloading-basics, cpp-essentials/class-default-delete-where
- define: "`a <=> b` yields an ordering value saying less, equal or greater; `std::strong_ordering` is its type for ints" for `operator<=>`, `std::strong_ordering`
- define: "an if can declare a variable before the condition" for `if (auto c = ...; c != 0)`
- define: "the compiler declares this member for you unless you declare certain others yourself" for "implicitly declares"
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 4 ideas — flag

## cpp-essentials/spaceship-rewritten-not-equal
- add requires: cpp-essentials/operator-overloading-basics, cpp-essentials/fn-overload-ranking
- remove requires: cpp-essentials/spaceship-basics

## cpp-essentials/staticpoly-static-vs-dynamic
- add requires: cpp-essentials/virtual-pure-syntax
- define: "inlining = pasting the callee's body at the call site" for "inline"

## cpp-essentials/strings-sso
- add requires: cpp-essentials/iter-string-sequence, cpp-essentials/life-stack-vs-heap
- define: "libstdc++ = GCC's standard library" for "libstdc++"

## cpp-essentials/strings-string-view-dangling
- split / reshape: "a compile error in this constant-evaluated harness" — cut (harness leakage)

## cpp-essentials/strings-string-view-not-null-terminated
- define: "`s.substr(i, n)` copies n characters from i; `data()` is a pointer to the first character" for `substr`, `data()`

## cpp-essentials/strings-string-view-parameter
- add requires: cpp-essentials/string-literal-is-char-array, cpp-essentials/life-temporary-full-expression
- remove requires: cpp-essentials/value-categories-temporary-materialization
- define: "a view stores only a pointer to the first element and a length; it owns nothing" for "pointer and a length"
- split / reshape: requires value-categories-temporary-materialization is spurious — replace with cpp-essentials/life-temporary-full-expression

## cpp-essentials/templates-instantiation
- define: "object file = the compiler's output for one .cpp" for "object file", "explicit instantiation", "specialization"

## cpp-essentials/threads-chunk-cv-wait
- define: "`q.front()` reads the oldest element of a `std::deque`, `pop_front()` removes it" for `std::deque` `front/pop_front`
- define: "producer/consumer: one thread adds work items, another takes them out" for "producer/consumer"
- define: "`std::unique_lock lk(m);` deduces the template argument from m (no `<std::mutex>` needed)" for CTAD `std::unique_lock lk(m)`

## cpp-essentials/threads-cv-wait-lock-type
- split / reshape: `bool ready` global shared across threads (a data race as written) — fix the example (make it `std::atomic<bool>` or guard it)
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 4 ideas — flag

## cpp-essentials/threads-cv-wait-needs-predicate
- add requires: cpp-essentials/conc-condition-variable-intro
- define: "`queue.front()` reads the oldest element without removing it" for `queue.front()`
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 4 new ideas (cv, mutex, spurious wake-up, lost notify) with one require — flag

## cpp-essentials/threads-data-race-is-ub
- define: "one access is guaranteed to finish before the other starts" for "happening-before"
- define: "on a `std::atomic<int>`, `++x` is one indivisible step" for "atomic"

## cpp-essentials/threads-scoped-lock-two-mutexes
- add requires: cpp-essentials/conc-lock-the-counter, cpp-essentials/conc-deadlock-intro
- split / reshape: `std::lock`'s algorithm — cut
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 3 new ideas — flag

## cpp-essentials/threads-thread-destructor-joinable
- define: "joinable: a std::thread still attached to a running (or finished, unjoined) thread; `detach()` lets it run on alone" for "joinable", `detach`
- define: "jthread joins in its destructor; request_stop asks it to stop" for `std::jthread`, `request_stop()`

## cpp-essentials/trace-order-of-initialisation
- define: "a GCC warning when the init list order differs from declaration order" for `-Wreorder`

## cpp-essentials/trace-temporaries-in-range-for
- add requires: cpp-essentials/iter-end-one-past, cpp-essentials/ptr-trace-arithmetic
- define: "range-for calls begin() and end() on the range" for range-for desugaring, `auto&& __range`, `begin()`/`end()` returning `const int*`
- define: "`auto&&` binds to anything, lvalue or temporary, without copying" for `auto&&`
- split / reshape: P2718, C++23 extension in the back — cut
- trace: OK per the trace rebuild (3 iterations, 2 probes, ~7 trail events); audit concern(s): Two separate runs (the loop and `*Bag{}.begin()`) and custom begin/end machinery — flag against §3.1 | Two separate runs (the loop and `*Bag{}.begin()`) and custom begin/end machinery — split into two traces and use `std... — optional SHRINK/CONVERT only if review agrees

## cpp-essentials/types-signed-unsigned-trace
- add requires: cpp-essentials/types-overflow-rules, cpp-essentials/types-promotion-rule
- define: "`long` is 32 bits on Windows and 64 bits on Linux x86-64" for "long is 32 bits on Windows"
- trace: OK per the trace rebuild (3 one-value probes, no loops); audit concern(s): Three independent runs (@1, @2, @3) of three ideas (sign conversion, long vs unsigned, wrap) — flag against §3.1 one-... | Three independent runs (@1, @2, @3) of three ideas (sign conversion, long vs unsigned, wrap) — split into 2-3 traces — optional SHRINK/CONVERT only if review agrees

## cpp-essentials/types-usual-arithmetic-conversions
- define: "converting a negative number to unsigned wraps around: -1 becomes 2^32 - 1" for "-1 becomes 4294967295"
- define: "-Wall turns on compiler warnings" for "rank", `-Wsign-compare`, `-Wall`
- define: "unsigned = integer type with no negative values" for `unsigned` alone

## cpp-essentials/ub-null-check-after-use
- add requires: cpp-essentials/ptr-arrow-null-check
- define: "-O2 = GCC's optimisation level 2" for `-O2`
- define: "code that can never run, which the compiler removes" for "dead code"

## cpp-essentials/ub-three-behaviours
- add requires: cpp-essentials/types-size-minimums
- define: "C++ does not say which argument is evaluated first" for `f(g(), h())` evaluation order
- define: "`int a[8]` has valid indices 0..7; `a[8]` reads one past the end" for `int a[8]; a[8]` out of range

## cpp-essentials/value-categories-categories-cloze
- define: "T{} builds a temporary T" for `T{}`
- define: "an expression is a piece of code that yields a value" for "expression" vs "object"

## cpp-essentials/value-categories-guaranteed-elision
- add requires: cpp-essentials/class-delete-copy, cpp-essentials/vc-rvalue-ref-binds-temporaries, cpp-essentials/value-categories-std-move-cloze
- remove requires: cpp-essentials/value-categories-temporary-materialization
- define: "NRVO = building a named local directly in the caller's variable" for NRVO
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 4+ ideas (deleted ctors, prvalue, elision, NRVO) — flag

## cpp-essentials/value-categories-std-move-cloze
- add requires: cpp-essentials/types-static-cast-value, cpp-essentials/fn-overload-ranking

## cpp-essentials/value-categories-taxonomy
- add requires: cpp-essentials/move-vs-copy-intro

## cpp-essentials/variadic-forward-pack
- add requires: cpp-essentials/life-make-unique
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: combines 4 ideas (variadic, forwarding reference, std::forward, constructor call) — flag

## cpp-essentials/variadic-what-is-a-pack
- define: "sizeof...(Ts) = how many types are in the pack" for `sizeof...`

## cpp-essentials/virtual-call-in-constructor
- add requires: cpp-essentials/virtual-construct-order, cpp-essentials/virtual-vptr-sizeof

## cpp-essentials/virtual-destructor
- add requires: cpp-essentials/life-unique-ptr-frees
- define: "short strings live inside the `std::string` object itself, with no heap allocation (the small-string optimisation)" for "libstdc++'s 15-character small-string buffer"

## cpp-essentials/virtual-dispatch-dynamic-type
- add requires: cpp-essentials/virtual-override-mismatch
- remove requires: cpp-essentials/virtual-static-dispatch
- define: "needed when deleting through a base pointer (see virtual-delete-through-base)" for `virtual ~Shape() = default;`

## cpp-essentials/virtual-explain-dispatch
- define: "inlining = pasting the callee's body at the call site" for "inlined" / "cannot be inlined"

## cpp-essentials/virtual-final
- define: "devirtualise = replace a virtual call with a direct call" for `final`, "devirtualise", inline
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: `constexpr virtual`, `#include <type_traits>` — noise from the harness
- split / reshape: `constexpr virtual`, `#include <type_traits>` — hide or DEFINE

## cpp-essentials/virtual-name-hiding
- add requires: cpp-essentials/fn-overload-ranking
- define: "the compiler finds a name by searching the innermost scope first and stops at the first match" for name lookup / scope
- define: "`using Base::f;` brings the base class's overloads of f into the derived class's scope" for using-declaration
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 3 new ideas (hiding, overload resolution, using) — flag

## cpp-essentials/virtual-slicing
- add requires: cpp-essentials/life-make-unique
- define: "`std::vector<T>` is a growable array of T: `v[i]`, `push_back` appends, `size()` counts" for `std::vector<Animal> zoo;`, `push_back`
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 4 new ideas (slicing, vector, unique_ptr, ->) — flag

## cpp-essentials/virtual-static-dispatch
- define: "std::puts prints a string and a newline" for `std::puts`

## cpp-essentials/virtual-vptr-sizeof
- define: "void* = pointer to anything; 8 bytes on a 64-bit machine" for `sizeof(void*)`
- define: "ABI = binary-level rules a compiler follows" for vtable "array of function pointers", Itanium ABI
- define: "an empty class still has size 1, so two objects never share an address" for "an empty class gets 1 byte"

## cpp-essentials/vocab-expected-carries-error
- add requires: cpp-essentials/strings-string-view-parameter, cpp-essentials/err-throw-jumps-to-catch
- define: "a reference parameter the callee writes the result into" for "out-parameter"

## cpp-essentials/vocab-optional-maybe-value
- add requires: cpp-essentials/life-stack-vs-heap, cpp-essentials/ub-definition
- define: "`if (auto u = f())` declares u and tests that it holds a value; `opt.value_or(d)` gives the value or d" for `if (auto u = find_user(id))`, `value_or`
- define: "a special value such as -1 meaning 'none'" for "sentinel"

## cpp-essentials/vocab-span-parameter
- add requires: cpp-essentials/iter-array-fixed-size, cpp-essentials/iter-range-for-alias
- define: "a view stores only a pointer to the first element and a length; it owns nothing" for `std::span<const int>`, "pointer and a length"
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 4 ideas — flag

## cpp-essentials/vocab-variant-closed-set
- add requires: cpp-essentials/vocab-variant-intro
- define: "std::visit calls the right overload for whichever alternative is active" for `std::visit`, "handler"
- define: "closed set: every alternative is known when the type is written; open: anyone can add a new derived class later" for "open vs closed set"

## cpp-essentials/vocab-visit-missing-handler
- define: "a struct with operator() is callable like a function; one overload per type" for visitor struct with `operator()` overloads
- define: "`operator()(auto)` is a catch-all overload that accepts any alternative" for `operator()(auto)` catch-all
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: Combines 4 ideas — flag


## Applied (cpp-essentials core/01-basics, 04-language, 05-interview, 06-idioms, 07-tracing)

Every Card in these dirs now carries `elaborate` (except worked-example `layout-padding-worked`). Direct requires transitively reduced.

- atomics-*, threads-*, lambda-*, class-*, move-semantics-*, smart-pointers-*, containers-*, strings-*, templates-*, operators-*, staticpoly-*, variadic-*, virtual-*, vocab-*: outside this scope (other dirs), untouched.
- callables-explain-capture-lifetime: done; rubric rewritten to §4 talk order, ≤ 20 words each; front no longer lists topics.
- chunks-erase-remove: done; expose_ms 5000 → 4000 (§4 formula).
- const-constexpr-const-vs-constexpr-cloze: done.
- const-constexpr-constexpr-function-dual-use-cloze: done.
- exceptions-commit-by-swap: done (the requires to move-semantics-noexcept-move was already gone); `using` alias via require types-using-alias instead of a define (chunk has no prose front); + err-noexcept-broken-promise for `noexcept`; expose_ms 8000 → 12000.
- exceptions-strong-vs-basic: changed: + iter-growth-invalidates, + class-invariant-who-checks (vocab); dropped move-semantics-moved-from-state (not used once "nothrow-movable" was cut).
- exceptions-unwinding-destroys-locals: changed: ofstream/lock_guard replaced by two plain locals with destructors (no define needed); RAII name cut; + life-reverse-order-trace (reverse order).
- exceptions-which-guarantee (not in plan): invalid_argument → runtime_error; + vector-back-pop-back.
- exceptions-catch-by-value-slices (not in plan): misconception premise added to front.
- initialization-brace-prefers-initializer-list: changed: vector-sized-constructor already taught its old answer, so reshaped to the deciding rule (initializer_list ctor beats an exact-match ctor); requires vector-sized-constructor, fn-overload-ranking, class-constructor-intro. v2.
- initialization-default-value-zero: done (indeterminate already taught by types-uninit-local-read).
- initialization-magic-statics: done; raii-storage-durations replaced by life-function-local-static; reference define on front; Meyers singleton described, mutex mention cut.
- initialization-most-vexing-parse: done.
- initialization-user-ctor-no-zero: done; misconception premise reworded.
- initialization-aggregate-braces (new, not in plan): + const-vs-constexpr-initializer for `constexpr`.
- layout-alignas-sizeof: done; trivia cut; alignas defined on front.
- layout-alignment: done; offset reworded instead of a second define.
- layout-declaration-order: done (reworded, no defines needed).
- layout-explain-hot-struct: done; rubric reordered to §4 talk order; "hot loop" reworded.
- layout-offsets-trace: changed: worked example reached through layout-padding-sizeof (which now requires layout-padding-worked); `std::size_t` → `int`; offsetof defined on front.
- layout-padding-sizeof: changed: requires layout-padding-worked (worked example before the prediction) + constexpr-fn-static-assert; "naturally aligned" spelled out.
- layout-padding-worked (new): + types-size-minimums (sizeof).
- layout-pin-chunk: changed: + std-names-and-headers instead of an #include define; expose_ms 8000 → 6500.
- layout-trailing-padding: changed: types-size-minimums now reached via padding-worked (not added directly).
- linkage-inline-meaning: done; misconception premise reworded.
- linkage-odr-class-repeat: done; templates/inline clause cut.
- linkage-translation-unit: done; include-is-paste now reached via build-pipeline.
- ptr-auto-drops-ref: changed: template comparison and range-for aside cut, so + iter-string-sequence (std::string) instead of tmpl-function-syntax.
- ptr-dangling: changed: + life-delete-matches-new, + ub-three-behaviours (impl-defined); dropped raii-storage-durations; `p->m` cut.
- ptr-lifetime-extension: changed: init-list and range-for asides cut instead of requiring class-init-list-required.
- ptr-ref-extension-trap: changed: code uses `v[0]`, `char`, explicit `const std::string&` (no auto/size_t/front()); one define for the braced temporary.
- ptr-temporary-full-expression: done; vc-trace-extended-temporary dropped (not used); elision wording cut.
- raii-copy-double-close: done; `explicit` removed from code and its chip (not taught).
- raii-ctor-throw-unwinds-members: class-default-member-initialiser already reachable, not added.
- raii-explain-owning-type: rubric rewritten to §4 talk order, front no longer lists topics. v2.
- raii-guard-destructor: changed: constexpr-fn-static-assert reachable already instead of the dual-use cloze; back no longer names the harness's `run`; `explicit` dropped.
- raii-move-steals-handle: changed: move-vs-copy-intro (teaches the move constructor) instead of vc-rvalue-ref-binds-temporaries; std::exchange defined on front; `std::move(o.h)` chip removed instead of defining std::move.
- raii-owner-in-destructor: done; RAII now named on the back as the target; FILE define on front.
- raii-storage-durations: done.
- spaceship-basics: done.
- spaceship-hand-written-no-equality: done; if-with-initialiser rewritten away; misconception premise added.
- spaceship-rewritten-not-equal: done.
- trace-order-of-initialisation: -Wreorder cut; + iter-string-sequence.
- trace-temporaries-in-range-for: changed: shrunk to one run (second Bag{} run and P2718 aside cut) to meet §3.1's 8-change budget; range-for defined on front. v3.
- types-signed-unsigned-trace: overflow/promotion rules reached via usual-arithmetic-conversions, not added directly.
- types-usual-arithmetic-conversions: changed: requires types-overflow-rules + types-promotion-rule instead of three defines.
- ub-null-check-after-use: done; back trimmed to 60 words.
- ub-three-behaviours: done.
- value-categories-categories-cloze: done.
- value-categories-guaranteed-elision: changed: requires class-delete-copy + value-categories-std-move-cloze (move ctor reached through it); "materialized"/NRVO cut.
- value-categories-overload-binding (not in plan): std::string → Doc; requires vc-named-rvalue-ref-is-lvalue only (reaches std::move).
- value-categories-std-move-cloze: done; + value-categories-reference-binding-cloze for `T&&`; fn-overload-ranking reached via taxonomy.
- value-categories-taxonomy: done; `std::move` example cut.

## Applied (cpp-essentials core/02-types, core/03-library, core/10-concurrency)

Every Card in these dirs now carries `elaborate`. At most one front define per Card; other planned defines were met by a requires edge, reworded in plain words, or the term was cut.

- atomics-chunk-cas-loop: changed — `memory_order_relaxed` dropped from snippet; spurious failure explained on back; expose_ms 11000; v+1.
- atomics-explain-publish-with-flag: changed — rubric in §4 talk order; front defines "spin", no topic list.
- atomics-modification-order: changed — requires atomics-memory-order-intro (reaches conc-single-counter-fix), rebuilt as recognition (relaxed stores, can B see 2 then 1); v+1.
- atomics-synchronizes-with: changed — no new edge (memory-order-intro reachable); "release sequence" cut.
- atomics-trace-message-passing: changed — exchange probe removed, jthread → thread+join; v+1.
- atomics-trace-relaxed-counter: changed — shrunk to 2 threads × 2 iterations, defines fetch_add; v+1.
- callables-explain-capture-lifetime, chunks-erase-remove, other out-of-scope ids: skipped (not in these dirs).
- class-const-ref-not-immutable: changed — requires added; defines alias; reload idea cut; belief premise added.
- class-explicit-constructor: done.
- class-rule-of-zero: changed — requires smart-pointers-unique-ptr-ownership + move-semantics-const-member-copies (fan-in); `std::size_t` → int.
- containers-default-to-vector: changed — +vector-basics; "contiguous" is the target, explained on back; list/deque cut.
- containers-erase-while-iterating: changed — requires containers-map-vs-unordered-map (teaches std::map, reaches intro).
- containers-explain-choosing: changed — rubric in choosing order, terms worded out; v+1.
- containers-map-vs-unordered-map: done (terms worded, not defined).
- containers-stable-references: done.
- containers-reference-invalidated-by-growth (not in plan): requires fixed, harness sentence cut.
- lambda-closure-type: changed — requires lambda-syntax-intro etc.; operator() is the answer, not defined; mutable cut.
- lambda-dangling-reference: changed — requires lambda-mutable instead of define.
- lambda-mutable: done.
- lambda-store-std-function: changed — requires vector-basics; decltype chip removed.
- lambda-this-capture: done (defines `this`; requires ptr-arrow-null-check).
- move-semantics-const-member-copies: done (+iter-string-sequence vocab).
- move-semantics-explain-lost-moves: split — keeps return std::move (v+1); new move-semantics-explain-forward-not-move, move-semantics-explain-reallocation-copies.
- move-semantics-explain-mechanism: done; rubric reordered.
- move-semantics-forwarding-reference: done.
- move-semantics-implicit-move-suppressed: changed — define would leak answer; +class-default-delete-where.
- move-semantics-moved-from-state: done; untaught vector members trimmed.
- move-semantics-noexcept-move: changed — raii-move-steals-handle reached via vector-move-if-noexcept; P1286R2/declval cut.
- move-semantics-return-std-move: changed — NRVO is the answer, not defined; -W flag cut.
- move-semantics-rule-of-five: changed — size_t → int.
- move-semantics-vector-move-if-noexcept: done (+raii-move-steals-handle, vector-basics).
- operators-chunk-arithmetic-pair: changed — ADL worded on back (chunk front is code only).
- operators-compound-returns-ref: changed — constexpr via constexpr-fn-static-assert; defines `this`.
- operators-hidden-friend-symmetric: done (new third chip).
- operators-member-vs-free: done.
- smart-pointers-explain-shared-ptr: reshaped to §4 talk order; v+1.
- smart-pointers-make-shared-one-allocation: changed — requires weak-ptr-breaks-cycles; cache clause cut.
- smart-pointers-shared-ptr-control-block: changed — terms cut from back, no defines.
- smart-pointers-shared-ptr-deleter-captured: done.
- smart-pointers-sink-parameter: done.
- smart-pointers-unique-ptr-moved-from-null: changed — get() taken out of the answer.
- smart-pointers-weak-ptr-lock: changed — no `->`; one define (if-declaration).
- spaceship-*, raii-*, ptr-*, layout-*, linkage-*, initialization-*, value-categories-*, exceptions-*, trace-*, types-*, ub-*, const-constexpr-*: skipped (outside these dirs).
- staticpoly-static-vs-dynamic: done.
- strings-sso: done.
- strings-string-view-dangling: done.
- strings-string-view-not-null-terminated: done; belief premise added (misconception tag).
- strings-string-view-parameter: done.
- templates-instantiation: done.
- threads-chunk-cv-wait: changed — deque → vector, explicit unique_lock<std::mutex>, [&q]; v+1.
- threads-cv-wait-lock-type: done (ready written under the mutex).
- threads-cv-wait-needs-predicate: done; queue.front() replaced by counter.
- threads-data-race-is-ub: done (one define).
- threads-scoped-lock-two-mutexes: done.
- threads-thread-destructor-joinable: changed — old question duplicated conc-forgotten-join; now asks why the destructor neither joins nor detaches; v+1.
- variadic-forward-pack: changed — make_unique phrase dropped instead of edge.
- variadic-what-is-a-pack: changed — sizeof... cut.
- virtual-call-in-constructor: done.
- virtual-destructor: changed — string member → unique_ptr<int>.
- virtual-dispatch-dynamic-type: changed — define would reference another Card; virtual ~Shape line removed.
- virtual-explain-dispatch: rewritten to talk order; v+1.
- virtual-final: done.
- virtual-name-hiding: done.
- virtual-slicing: changed — vector-basics edge instead of define.
- virtual-static-dispatch: changed — returns int instead of puts; identifiers varied.
- virtual-vptr-sizeof: changed — ABI/empty-class trivia cut.
- vocab-expected-carries-error: done (out-parameter worded).
- vocab-optional-maybe-value: changed — ub-definition not needed after trimming back.
- vocab-span-parameter: changed — non-constexpr, is_invocable_r_v harness.
- vocab-variant-closed-set: done.
- vocab-visit-missing-handler: done.
