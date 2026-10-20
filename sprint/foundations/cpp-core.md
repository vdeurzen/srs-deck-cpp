# Novice audit: cpp-essentials/topics/core (2026-10-19)

Shorthand used below (each is spelled out in the Summary):
VEC = NEW: std::vector basics. SA = NEW: static_assert and constexpr-function check. MEM = NEW: stack vs heap vs static memory. STR = NEW: std::string and C-string basics. AUTO = NEW: `auto` deduces a variable's type from its initializer. OPS = NEW: operator overloading basics (a + b calls operator+). MAP = NEW: std::map / std::pair / iterator basics. CACHE = NEW: CPU cache and cache lines (one clause).

## const-constexpr-const-vs-constexpr-cloze
- `std::rand()`, `std::` → DEFINE: "std::rand() returns a random number, only known when the program runs"

## const-constexpr-constexpr-function-dual-use-cloze
- `static_assert` → SA
- `std::cin` → DEFINE: "std::cin reads input while the program runs"
- constexpr function itself (first met here, 4 ideas: function, constant expression, array bound, static_assert) → flag: combines 3+ new ideas

## const-constexpr-if-constexpr-discard
- `std::is_pointer_v<T>` → DEFINE: "a compile-time true/false: is T a pointer type?"
- `constexpr auto` with two different return types → AUTO
- "ill-formed", "discarded statement", "SFINAE" → DEFINE: "ill-formed = does not compile"; cut the SFINAE mention
- Combines 4 new ideas (type trait, if constexpr, auto return type, discarded branch) → TOO ADVANCED: move after templates basics; interview-useful but needs `tmpl-function-syntax` plus a trait intro
- `#include <type_traits>` → DEFINE: "#include <x> makes the library header x available"

## initialization-brace-prefers-initializer-list
- `std::vector<int>`, `a(4, 9)`, `.` → VEC
- constructor → REQUIRE cpp-essentials/class-constructor-intro
- `std::initializer_list<int>` → DEFINE: "the brace list {4, 9} seen as a sequence of ints"
- Combines 3 new ideas (vector, constructor overloads, init-list preference) → add VEC and class-constructor-intro to requires

## initialization-default-value-zero
- "default-initialization" / "value-initialization" / "indeterminate" → DEFINE (card defines by use; add "indeterminate = whatever bits were in that memory")
- undefined behaviour → REQUIRE cpp-essentials/ub-definition (types-uninit-local-read only shows one instance)

## initialization-magic-statics
- function-local `static` → NEW: a function-local static is initialised once, on first call, and lives until the program ends
- two threads → REQUIRE cpp-essentials/conc-thread-shares-memory
- "race-free" / "blocks" → REQUIRE cpp-essentials/conc-lost-update-trace (what a race is) or DEFINE: "race = two threads touching the same data without coordination"
- "Meyers singleton" → DEFINE: "one shared instance created on first use"
- `Widget& instance()` returns a reference → REQUIRE cpp-essentials/ptr-reference-must-bind
- Combines 4 new ideas (static local, threads, races, singleton) → split or add the requires above

## initialization-most-vexing-parse
- constructor / "construct" → REQUIRE cpp-essentials/class-constructor-intro
- "function returning Widget taking a pointer to a function returning Gadget" → DEFINE: "Gadget() in a parameter list means 'a function taking nothing and returning Gadget'"
- declaration vs expression → REQUIRE cpp-essentials/fn-declaration-vs-definition

## initialization-static-guard-cost
- "guard variable", "acquire load", `__cxa_guard_acquire`, Itanium ABI, constant-initialized, dynamic initialization → TOO ADVANCED: compiler-ABI internals and acquire loads need the memory-model cards; value for an interview is one sentence; move out of essentials
- constexpr constructor → REQUIRE cpp-essentials/const-constexpr-constexpr-function-dual-use-cloze

## initialization-user-ctor-no-zero
- `Meter() {}` / constructor → REQUIRE cpp-essentials/class-constructor-intro
- `= default` → MOVE cpp-basics/class-default-delete-where (requires cpp-essentials/class-constructor-intro)
- "aggregate" → MOVE cpp-core/initialization-aggregate-braces (requires cpp-essentials/class-struct-vs-class) or DEFINE: "aggregate = a plain struct with no constructors you wrote"
- "user-provided" → DEFINE: "user-provided = you wrote its body yourself"
- Combines 3 new ideas (aggregate, user-provided constructor, value-init) → flag

## layout-alignas-sizeof
- `static_assert` → SA
- `sizeof`, `alignof` → MOVE cpp-basics/types-size-minimums (no requires) plus DEFINE: "alignof(T) = the address multiple T must sit on"
- `alignas(64)` → DEFINE: "alignas(N) forces the type's alignment up to N"
- why 64 → CACHE
- `[dcl.align]`, "GCC 16 accepts it" → drop (trivia)

## layout-alignment
- x86-64 → DEFINE: "x86-64 = the usual 64-bit PC/server CPU"
- offset → DEFINE: "offset = bytes from the start of the struct"
- address / "multiple of" → REQUIRE cpp-essentials/ptr-holds-an-address
- undefined behaviour → REQUIRE cpp-essentials/ub-definition
- "extra memory accesses or trap" → DEFINE: "the CPU may need two loads, or fault"

## layout-declaration-order
- "optimiser" → DEFINE: "the optimiser = the compiler stage that rewrites code to run faster"
- "struct shared with C" → DEFINE: "C code compiled separately expects the same byte layout"

## layout-explain-hot-struct
- "hot loop" → DEFINE: "hot loop = the loop that dominates run time"
- `offsetof`, `alignas`, `static_assert` → SA (layout-pin-chunk is in closure for offsetof)
- 64-byte boundary → CACHE

## layout-offsets-trace
- `offsetof`, `std::size_t` → DEFINE: "offsetof(S, m) = byte offset of member m; std::size_t = unsigned type used for sizes"
- Four probes of alignment arithmetic, ending in tail rounding: combines padding rule, offsetof and size rounding → flag; a worked-example `basic` with the step table should precede it (§3.1); consider splitting @4 into its own question

## layout-padding-sizeof
- `static_assert`, `sizeof` → SA, and MOVE cpp-basics/types-size-minimums (no requires)
- "naturally aligned" → DEFINE: "address is a multiple of the type's size"
- x86-64 → DEFINE as above
- Root of the whole layout cluster: every later layout card leans on `sizeof` + `static_assert`, taught nowhere

## layout-pin-chunk
- `static_assert` → SA
- `offsetof` → REQUIRE cpp-essentials/layout-offsets-trace (present; add DEFINE as above)
- "wire message", "file record" → DEFINE: "bytes sent over a network / written to disk in a fixed format"
- `#include <cstddef>` → DEFINE (see const-constexpr-if-constexpr-discard)

## layout-trailing-padding
- `sizeof` → MOVE cpp-basics/types-size-minimums
- `S[]` array of structs, `arr[1].d` → DEFINE: "elements of an S[] sit sizeof(S) bytes apart"

## raii-copy-double-close
- `std::FILE*`, `std::fclose` → DEFINE: "FILE* = C library handle to an open file; fclose releases it"
- `explicit` → REQUIRE cpp-essentials/class-explicit-constructor
- `: f_(f)` member initializer → REQUIRE cpp-essentials/class-init-list-required
- `= delete` → REQUIRE cpp-essentials/class-delete-copy
- undefined behaviour → REQUIRE cpp-essentials/ub-definition
- Combines 4 new ideas (FILE*, explicit, init list, = delete) → flag; fix by the requires above

## raii-ctor-throw-unwinds-members
- default member initializer `Part a{'a'};` → MOVE cpp-basics/class-default-member-initialiser (requires cpp-essentials/class-init-list-required)
- `throw 1;` / `catch (int)` → REQUIRE cpp-essentials/err-throw-jumps-to-catch (in closure; ok)
- Combines 4 ideas (member construction order, ctor throws so ~Whole never runs, unwinding order, skipped statement) in ~8 state changes → flag; split: "a constructor that throws never has its destructor run" as its own basic, then this trace

## raii-explain-owning-type
- "move constructor/assignment", `std::exchange` → REQUIRE cpp-essentials/raii-move-steals-handle (present); add DEFINE: "move assignment = same as move constructor, into an existing object"
- `std::FILE*` → DEFINE (see raii-copy-double-close)

## raii-guard-destructor
- `constexpr` function/constructor/destructor → REQUIRE cpp-essentials/const-constexpr-constexpr-function-dual-use-cloze
- `explicit` → REQUIRE cpp-essentials/class-explicit-constructor
- "lock" modelled as a bool → DEFINE: "Lock here is a flag that stands in for a mutex"
- unnamed temporary `Lock{held};` → REQUIRE cpp-essentials/life-temporary-full-expression
- back mentions `run` (the function is `update`) → fix text
- Combines 4 new ideas → flag

## raii-move-steals-handle
- `Handle&&` move constructor → REQUIRE cpp-essentials/vc-rvalue-ref-binds-temporaries
- NEW: first card to introduce a move constructor: "a move constructor T(T&&) takes the resource from an expiring object and leaves it empty" (move-semantics-const-member-copies and value-categories-taxonomy also lean on this)
- `std::exchange` → DEFINE: "std::exchange(x, v) sets x to v and returns the old x"
- `noexcept` → REQUIRE cpp-essentials/err-noexcept-broken-promise
- `std::move(o.h)` → REQUIRE cpp-essentials/value-categories-std-move-cloze
- constexpr → as above
- Combines 5 new ideas (rvalue-ref ctor, exchange, noexcept, constexpr, release counting) → flag

## raii-owner-in-destructor
- `const char* path` string → STR
- `std::FILE`, `fopen` → DEFINE
- name "RAII" never defined → DEFINE: "RAII = acquire in a constructor, release in the destructor"
- `File file{std::fopen(path, "w")};` brace init of a struct → REQUIRE cpp-essentials/class-struct-vs-class

## raii-storage-durations
- `new` / `delete`, "leak" → REQUIRE cpp-essentials/life-new-outlives-scope
- "namespace-scope variable" → DEFINE: "a variable declared outside every function"
- "static storage ... destroyed after main" → fine once defined

## linkage-inline-meaning
- "optimiser", "inlining a call" → DEFINE: "inlining = pasting the callee's body at the call site"

## linkage-odr-class-repeat
- "variables and templates" → cut or REQUIRE cpp-essentials/templates-instantiation (not yet met)
- `struct Point` and "type, not an object the linker places" → DEFINE: "the linker only sees functions and variables, not types"

## linkage-translation-unit
- "build step", "compile", "link", `.cpp` → NEW: the build pipeline in one card (preprocess, compile each .cpp into an object file, link object files into one program); this card is where it is first used
- "external linkage" → DEFINE: "external linkage = visible to other .cpp files"
- "namespace scope" → DEFINE (see raii-storage-durations)

## ptr-auto-drops-ref
- `auto` deduction "like a by-value template parameter" → REQUIRE cpp-essentials/tmpl-function-syntax, or cut the comparison
- range-for `for (auto s : names)` → REQUIRE cpp-essentials/iter-range-for-alias
- `std::string`, member function `label()`, `Config cfg{"prod"}` → STR; MOVE cpp-basics/class-member-function-this (no requires)

## ptr-dangling
- `delete p;` → REQUIRE cpp-essentials/life-delete-matches-new
- `p->m` → MOVE cpp-basics/ptr-arrow-null-check (requires cpp-essentials/ptr-amp-and-star-cloze, ptr-nullptr-overload)
- "implementation-defined" → REQUIRE cpp-essentials/ub-three-behaviours or DEFINE: "implementation-defined = the compiler documents what happens"
- "invalid pointer value" → DEFINE
- Combines 3+ new ideas (delete, ->, dangling, impl-defined vs UB) → flag

## ptr-lifetime-extension
- range-for over a call result → REQUIRE cpp-essentials/iter-range-for-alias
- "constructor's initialiser list" → REQUIRE cpp-essentials/class-init-list-required
- `Noisy make(char)` returns by value → REQUIRE cpp-essentials/fn-return-by-value
- Combines 4 ideas (temporary, direct binding, extension, exceptions to extension) → flag

## ptr-ref-extension-trap
- `std::vector<std::string>`, braced temporary `{"ada", "bob"}`, `v.front()`, `std::size_t` → VEC; DEFINE: "front() = reference to first element"
- returning a reference from a function (`const std::string& first(...)`) → REQUIRE cpp-essentials/fn-return-by-value
- Combines 4 ideas (reference-returning function, braced vector temporary, extension rule, dangling) → flag

## ptr-temporary-full-expression
- "guaranteed elision" → DEFINE: "guaranteed elision = no copy is made when a function returns a temporary"
- trail-string machinery (`trail += c`) is three lines the learner must decode first → fine but note extraneous load

## types-signed-unsigned-trace
- "wraps modulo 2^32" → REQUIRE cpp-essentials/types-overflow-rules
- "rank" → REQUIRE cpp-essentials/types-promotion-rule
- "long is 32 bits on Windows" → DEFINE
- Three independent runs (@1, @2, @3) of three ideas (sign conversion, long vs unsigned, wrap) → flag against §3.1 one-run rule; split into 2-3 traces

## types-usual-arithmetic-conversions
- "-1 becomes 4294967295" → DEFINE: "converting a negative number to unsigned wraps around: -1 becomes 2^32 - 1"; or REQUIRE cpp-essentials/types-overflow-rules
- "rank", `-Wsign-compare`, `-Wall` → DEFINE: "-Wall turns on compiler warnings"
- `unsigned` alone → DEFINE: "unsigned = integer type with no negative values"

## ub-null-check-after-use
- `nullptr`, null dereference → MOVE cpp-basics/ptr-arrow-null-check
- `-O2` → DEFINE: "-O2 = GCC's optimisation level 2"
- "dead code" → DEFINE: "code that can never run, which the compiler removes"

## ub-three-behaviours
- `sizeof(int)` → MOVE cpp-basics/types-size-minimums
- `f(g(), h())` evaluation order → DEFINE: "C++ does not say which argument is evaluated first"
- `int a[8]; a[8]` out of range → MOVE cpp-basics/ub-off-by-one-bound (L1 code card) or DEFINE

## value-categories-categories-cloze
- `T{}` → DEFINE: "T{} builds a temporary T"
- "expression" vs "object" → DEFINE: "an expression is a piece of code that yields a value"

## value-categories-guaranteed-elision
- `= delete` on copy and move constructors → REQUIRE cpp-essentials/class-delete-copy
- `Pinned(Pinned&&)` → REQUIRE cpp-essentials/vc-rvalue-ref-binds-temporaries
- `std::move` → REQUIRE cpp-essentials/value-categories-std-move-cloze
- NRVO → DEFINE: "NRVO = building a named local directly in the caller's variable"
- `= default`, default member initializer `int id = 7;` → MOVE cpp-basics/class-default-delete-where
- Combines 4+ ideas (deleted ctors, prvalue, elision, NRVO) → flag

## value-categories-overload-binding
- overload resolution → REQUIRE cpp-essentials/fn-overload-ranking
- `std::move(x)` → REQUIRE cpp-essentials/value-categories-std-move-cloze
- "silently copies" (copy vs move) → NEW: motivating move card (see raii-move-steals-handle)

## value-categories-std-move-cloze
- `static_cast` → REQUIRE cpp-essentials/types-static-cast-value
- "overload resolution" → REQUIRE cpp-essentials/fn-overload-ranking
- "does not move anything" assumes the learner knows what a move is → NEW: move vs copy (see raii-move-steals-handle)

## value-categories-taxonomy
- "may be moved from" → NEW: move vs copy (see raii-move-steals-handle)

## value-categories-temporary-materialization
- "temporary materialization conversion", glvalue-needed contexts → TOO ADVANCED: standard-lawyer machinery; the practical effect is covered by life-temporary-full-expression and ptr-lifetime-extension; remove it as a requires of strings-string-view-parameter

## class-const-ref-not-immutable
- `int value() const` → REQUIRE cpp-essentials/const-member-on-const-ref
- `const Counter&` parameter → REQUIRE cpp-essentials/const-ref-parameter
- `int n = 0;` in a struct → MOVE cpp-basics/class-default-member-initialiser
- aliasing ("two names for one object") → DEFINE
- "access path", "optimiser must reload" → DEFINE
- No requires at all, yet leans on 4 cards → add the requires above

## class-explicit-constructor
- constructor, `: value_(v)` → REQUIRE cpp-essentials/class-constructor-intro, class-init-list-required
- `public:` / `private` → REQUIRE cpp-essentials/class-struct-vs-class
- "converting constructor", implicit conversion → DEFINE: "a one-argument constructor lets the compiler convert that argument type silently"
- `void set_height(Meters);` declaration → ok (fn-declaration-vs-definition)
- Combines 3 new ideas → flag; no requires listed

## class-pimpl
- forward declaration `struct Impl;`, incomplete type, `std::unique_ptr<Impl>`, `std::make_unique`, `~Widget() = default` in .cpp, ABI, "recompiles one file" → TOO ADVANCED: five ideas (forward declaration, incomplete types, unique_ptr deleter, header/source split, ABI) and a design pattern; move after the sprint
- `std::vector`, `std::string` members → VEC, STR

## class-rule-of-zero
- "special members" (copy, move, destructor) and "Rule of Zero" → REQUIRE cpp-essentials/move-semantics-rule-of-five (comes after in the current order; Zero is the conclusion of Three/Five)
- `std::unique_ptr<int[]>`, array form → DEFINE: "the [] form calls delete[] and allows p[i]"
- "const member cannot be moved from" → REQUIRE cpp-essentials/move-semantics-const-member-copies
- `std::size_t` → DEFINE

## virtual-dispatch-dynamic-type
- `override` → REQUIRE cpp-essentials/virtual-override-mismatch
- `virtual ~Shape() = default;` → MOVE cpp-basics/class-default-delete-where; DEFINE: "needed when deleting through a base pointer (see virtual-delete-through-base)"
- requires virtual-static-dispatch, which is about a qualified call that suppresses dispatch: wrong prerequisite order; require virtual-dispatch-which-runs only

## virtual-explain-dispatch
- "inlined" / "cannot be inlined" → DEFINE: "inlining = pasting the callee's body at the call site"
- vptr, vtable → REQUIRE cpp-essentials/virtual-vptr-sizeof

## virtual-final
- `final`, "devirtualise", inline → DEFINE: "devirtualise = replace a virtual call with a direct call"
- `override` → REQUIRE cpp-essentials/virtual-override-mismatch
- `constexpr virtual`, `#include <type_traits>` → noise from the harness; hide or DEFINE

## virtual-name-hiding
- overloading, int-to-double conversion → REQUIRE cpp-essentials/fn-overload-ranking
- name lookup / scope → DEFINE: "the compiler finds a name by searching the innermost scope first and stops at the first match"
- using-declaration → DEFINE
- Combines 3 new ideas (hiding, overload resolution, using) → flag

## virtual-slicing
- `std::vector<Animal> zoo;`, `push_back` → VEC
- `std::unique_ptr<Animal>`, `std::make_unique<Dog>()` → REQUIRE cpp-essentials/life-make-unique
- `->` → MOVE cpp-basics/ptr-arrow-null-check
- Combines 4 new ideas (slicing, vector, unique_ptr, ->) → flag

## virtual-static-dispatch
- `std::puts` → DEFINE: "std::puts prints a string and a newline"

## virtual-call-in-constructor
- base-class constructor/destructor order → REQUIRE cpp-essentials/virtual-construct-order
- "vptr" → REQUIRE cpp-essentials/virtual-vptr-sizeof or DEFINE
- `std::string log; log += name()` → STR

## virtual-destructor
- `std::unique_ptr<Logger>` → REQUIRE cpp-essentials/life-unique-ptr-frees
- `= default` → MOVE cpp-basics/class-default-delete-where
- "libstdc++'s 15-character small-string buffer" → REQUIRE cpp-essentials/strings-sso (or cut the 32-character detail)
- undefined behaviour → REQUIRE cpp-essentials/ub-definition

## virtual-vptr-sizeof
- `static_assert`, `sizeof` → SA; MOVE cpp-basics/types-size-minimums
- `sizeof(void*)` → DEFINE: "void* = pointer to anything; 8 bytes on a 64-bit machine"
- vtable "array of function pointers", Itanium ABI → DEFINE: "ABI = binary-level rules a compiler follows"
- "an empty class gets 1 byte" → DEFINE

## lambda-capture-trace
- `auto` → AUTO

## lambda-closure-type
- `operator()` → DEFINE: "f(x) on an object runs its operator()"
- `const` member function → REQUIRE cpp-essentials/const-member-on-const-ref
- `mutable` → forward reference, DEFINE: "mutable lets the body change captured copies"
- Combines 3 new ideas → flag

## lambda-dangling-reference
- `auto make_counter()` return type → AUTO
- reference to a dead local → REQUIRE cpp-essentials/ptr-dangling-local
- `mutable` in the fix → DEFINE (see above)
- Go escape analysis comparison is useful; keep

## lambda-init-capture
- `std::unique_ptr<int>` by value, `std::move` → REQUIRE cpp-essentials/smart-pointers-sink-parameter (or life-make-unique), value-categories-std-move-cloze
- init-capture `p = std::move(p)` → DEFINE: "[name = expr] declares a new member of the closure"
- Combines 4 ideas (init-capture, unique_ptr, move, dangling) with a 22-card closure → flag; consider TOO ADVANCED (C++14 idiom used for move-only captures)

## lambda-mutable
- `constexpr bool check()` + `static_assert`-style harness → SA
- `static`/`constexpr`/`noexcept` lambda specifiers in the back → cut (extraneous)

## lambda-store-std-function
- `std::vector<...>` and returning a braced list → VEC
- `std::function<int(int)>` signature syntax, "type-erases" → DEFINE: "int(int) = function type taking an int, returning an int; type erasure = one wrapper type that can hold different callables"
- function pointer → DEFINE
- `decltype` → cut

## lambda-this-capture
- `this` → MOVE cpp-basics/class-member-function-this
- `[=]` default capture, `[*this]`, `[ticks = ticks]` → DEFINE; REQUIRE cpp-essentials/lambda-init-capture for the last
- `auto make()` → AUTO

## move-semantics-const-member-copies
- move constructor / "defaulted move" → REQUIRE cpp-essentials/raii-move-steals-handle
- `std::move(a)` → REQUIRE cpp-essentials/value-categories-std-move-cloze
- `std::string`, `std::vector<int>`, `Row a{"user-id", {1, 2, 3}}` → VEC, STR
- "overload resolution picks copy ctor" → REQUIRE cpp-essentials/fn-overload-ranking
- Combines 5 ideas, requires only one card → flag; add requires

## move-semantics-explain-lost-moves
- Three unrelated lessons (return std::move, forwarding reference, vector reallocation) in one explain → flag; split into three explain cards and a capstone (FORMAT/PEDAGOGY §4)
- vector reallocation → REQUIRE cpp-essentials/iter-growth-invalidates
- "NRVO" → DEFINE

## move-semantics-explain-mechanism
- `T&& x` parameter being an lvalue → REQUIRE cpp-essentials/vc-named-rvalue-ref-is-lvalue
- move assignment → DEFINE (see raii-explain-owning-type)

## move-semantics-forwarding-reference
- `template<class T> void f(T&& x)`, "deduced" → REQUIRE cpp-essentials/tmpl-function-syntax, tmpl-deduction-conflict
- reference collapsing `Widget& &&` → DEFINE: "a reference to a reference collapses to a single reference; & wins"
- `auto&&`, `const T&&`, `std::vector<T>&&` → cut from the back
- Combines 4 ideas (template deduction, T&& vs X&&, collapsing, auto&&) with one require → flag

## move-semantics-implicit-move-suppressed
- `= default` → MOVE cpp-basics/class-default-delete-where
- "user-declared", "implicitly declared" → DEFINE: "the compiler writes these members for you unless you declare certain others"

## move-semantics-moved-from-state
- "invariants" → REQUIRE cpp-essentials/class-invariant-who-checks
- `front()`, `pop_back()`, `size()`, `empty()`, `clear()` → VEC
- "precondition" → DEFINE: "what must hold before the call"

## move-semantics-noexcept-move
- `noexcept` → REQUIRE cpp-essentials/err-noexcept-broken-promise
- `Part(Part&&) {}` move ctor → REQUIRE cpp-essentials/raii-move-steals-handle
- vector reallocation → REQUIRE cpp-essentials/iter-growth-invalidates
- `P1286R2`, "conditional spellings" → cut
- Combines 4 ideas (noexcept, move ctor, vector growth, defaulted special members) → flag

## move-semantics-perfect-forwarding
- templates, `T` deduced as `int&` → REQUIRE cpp-essentials/tmpl-function-syntax
- overload on `int&` vs `int&&` → REQUIRE cpp-essentials/fn-overload-ranking
- `std::forward` → ok via cloze

## move-semantics-return-std-move
- `std::vector<int>`, `sieve(result, n)` → VEC
- NRVO, `-Wpessimizing-move` → DEFINE: "NRVO = compiler builds the returned local directly in the caller; -W... = a GCC warning"
- "implicitly moved" → DEFINE

## move-semantics-rule-of-five
- `new int[k]{}`, `delete[]` → REQUIRE cpp-essentials/life-delete-matches-new (present); `std::copy` → DEFINE
- `explicit` → REQUIRE cpp-essentials/class-explicit-constructor
- `std::size_t` → DEFINE
- Rule of Five unnamed before → fine here, but class-rule-of-zero must require this

## move-semantics-vector-move-if-noexcept
- vector reallocation, buffer → REQUIRE cpp-essentials/iter-growth-invalidates
- `noexcept` → REQUIRE cpp-essentials/err-noexcept-broken-promise
- `push_back` strong guarantee → ok (exceptions-strong-vs-basic)
- Combines 4 ideas (reallocation, noexcept, strong guarantee, move vs copy) → flag

## operators-chunk-arithmetic-pair
- `operator+=`, `operator+` → OPS
- `friend`, "hidden friend", ADL ("found only by ADL") → NEW: friend functions (a non-member defined in the class that may touch private members); DEFINE: "ADL = the compiler also searches the namespaces of the argument types"
- `*this` → MOVE cpp-basics/class-member-function-this
- Combines 5 new ideas (operator overloading, friend, ADL, by-value copy, += reuse) → flag; consider TOO ADVANCED until OPS and friend exist

## operators-compound-returns-ref
- operator overloading syntax → OPS
- `*this` → MOVE cpp-basics/class-member-function-this
- `constexpr` member → DEFINE

## operators-hidden-friend-symmetric
- `friend` → NEW: friend functions
- default argument `int d = 1` → MOVE cpp-basics/fn-default-argument (no requires)
- implicit conversion → REQUIRE cpp-essentials/class-explicit-constructor (present)
- explicit object parameter `this Rational l` and `static` in the back → cut (C++23 trivia)
- `std::complex` → DEFINE
- Combines 4 ideas → flag

## operators-member-vs-free
- operator overloading syntax, `r.operator+(2)` → OPS
- member `const` → REQUIRE cpp-essentials/const-member-on-const-ref

## staticpoly-crtp-base
- class template `template<class Derived> struct Shape`, `static_cast<const Derived*>(this)`, CRTP → TOO ADVANCED: needs class templates (MOVE cpp-basics/tmpl-class-member-type), inheritance, `this`, `static_cast`, and the "why" (avoid virtual) at once; after the sprint
- "inline" → DEFINE

## staticpoly-static-vs-dynamic
- pure virtual `= 0` → REQUIRE cpp-essentials/virtual-pure-syntax
- "inline" → DEFINE: "inlining = pasting the callee's body at the call site"
- "function template over the shape type" → ok

## staticpoly-type-erasure
- Concept/Model, templated constructor, `std::unique_ptr`, `std::move`, `std::make_unique` → TOO ADVANCED: 5+ ideas in the back; the front question is a recognition of a named technique; move after the sprint
- `std::variant` → NEW: variant basics (see vocab-variant-closed-set)

## templates-concepts-vs-sfinae
- `std::integral`, `std::signed_integral`, `enable_if_t`, subsumption, partial ordering of constraints → TOO ADVANCED: contrasts with SFINAE, which the learner never meets; needs concept syntax and overload resolution; after the sprint

## templates-instantiation
- "object file", "explicit instantiation", "specialization" → DEFINE: "object file = the compiler's output for one .cpp"

## templates-two-phase-lookup
- "non-dependent / dependent name", "lookup" → DEFINE: "a dependent name's meaning depends on T"; "lookup = finding what a name refers to"
- 3 new ideas (declaration lookup, dependent names, two phases) → flag; consider TOO ADVANCED (a diagnostic subtlety)

## templates-typename-disambiguator
- `c.begin()`, `*c.begin()`, `value_type` → REQUIRE cpp-essentials/iter-end-one-past; DEFINE: "value_type = the element type a container names"
- `const auto` / `constexpr auto` → AUTO
- P0634 → cut
- "dependent qualified name" → DEFINE

## variadic-what-is-a-pack
- `sizeof...` → DEFINE: "sizeof...(Ts) = how many types are in the pack"

## variadic-forward-pack
- `std::make_unique` analogy → REQUIRE cpp-essentials/life-make-unique
- `Args&&...` forwarding + pack expansion → combines 4 ideas (variadic, forwarding reference, std::forward, constructor call) → flag

## containers-default-to-vector
- `std::vector<Order>` → VEC
- "contiguous" → DEFINE: "contiguous = elements sit next to each other in memory, like an array"
- "caches and prefetchers" → CACHE
- `std::list`, `std::deque` → DEFINE: "list = linked nodes; deque = double-ended queue in blocks"
- Combines 4 ideas → flag

## containers-erase-while-iterating
- `std::map<int, int>`, `it->second` → MAP
- `auto it = stock.begin()`, `++it`, `!= end()` → REQUIRE cpp-essentials/iter-end-one-past; AUTO
- "invalidates" → REQUIRE cpp-essentials/iter-growth-invalidates (present)
- Combines 4 ideas (map, iterators, invalidation, erase idiom) → flag

## containers-explain-choosing
- `std::list` → DEFINE; `unordered_map` → DEFINE: "hash table: key hashed to a bucket"
- O(1), O(log n) → DEFINE: "O(1) = cost does not grow with n"
- "range queries", "sorted iteration" → ok

## containers-map-vs-unordered-map
- `std::map`, `std::unordered_map`, `lower_bound`, "key range" → MAP
- "hash buckets" → MOVE algo-basics/hashing-index-mod-trace (no requires)
- O(1), O(log n) → DEFINE (see above)
- Combines 3+ new ideas → flag

## containers-reference-invalidated-by-growth
- `std::vector<int> v{...}`, `v[0]`, `reserve`, `capacity` → VEC
- constexpr function with a returned value as the check → SA

## containers-stable-references
- O(1) indexing → DEFINE
- "blocks" / list → DEFINE

## ranges-sort-projection
- `std::ranges::sort`, projection, `{}` as default comparator, `std::invocable` → DEFINE: "{} = use the default < comparison; a projection maps each element to the key to compare"
- `&Person::age` pointer-to-member → DEFINE: "&Person::age names the member; sort reads it from each Person"
- `std::array<Person, 3> people{{ {30}, {10}, {20} }}` → MOVE cpp-basics/iter-array-fixed-size (requires cpp-essentials/iter-size-vs-capacity, cpp-basics/tmpl-class-member-type)
- constexpr function check → SA
- Combines 4 ideas → flag; consider TOO ADVANCED (pointer-to-member projection is a trick; lambda comparator already taught)

## storage-allocate-vs-construct
- `std::allocator<Order>`, `allocate`, `::operator new` → DEFINE: "an allocator hands out raw memory without building objects"
- storage vs object lifetime → NEW: "memory can exist before any object is built in it" (bytes vs object); REQUIRE cpp-essentials/life-new-outlives-scope
- "sized and aligned" → REQUIRE cpp-essentials/layout-alignment
- `explicit Order(int)` → REQUIRE cpp-essentials/class-explicit-constructor
- undefined behaviour → REQUIRE cpp-essentials/ub-definition

## storage-construct-at
- `std::string` → STR
- "placement new", "constant expression" → DEFINE: "placement new = construct an object in memory you already own"
- assignment vs initialisation → REQUIRE cpp-essentials/life-copy-init-not-assign
- constexpr function → SA

## storage-destroy-at-pop
- class template `Vec` with `template <class T> class`, `T* data_` → MOVE cpp-basics/tmpl-class-member-type (requires cpp-essentials/tmpl-function-syntax, class-struct-vs-class)
- `delete[]` → REQUIRE cpp-essentials/life-delete-matches-new
- `data_[size_].~T()` explicit destructor call → DEFINE
- Combines 4 ideas → flag

## storage-destroy-then-deallocate
- function template `template <class T>` → REQUIRE cpp-essentials/tmpl-function-syntax
- constexpr → SA
- `std::destroy(first, last)` → DEFINE: "calls the destructor of every element in [first, last)"

## storage-live-range-invariant
- `[0, size_)` half-open notation → REQUIRE cpp-essentials/iter-end-one-past
- "invariant" → REQUIRE cpp-essentials/class-invariant-who-checks
- class template `Vec` → MOVE cpp-basics/tmpl-class-member-type
- `push_back`, "destructor destroys exactly the first size_" → VEC

## smart-pointers-explain-shared-ptr
- "weak count" → REQUIRE cpp-essentials/smart-pointers-weak-ptr-breaks-cycles or DEFINE
- "type-erased deleter" → DEFINE
- heap allocation → MEM

## smart-pointers-make-shared-one-allocation
- "allocation" cost → MEM
- "cache" → CACHE
- `weak_ptr` in the back → forward reference; DEFINE or require weak-ptr-breaks-cycles

## smart-pointers-shared-ptr-control-block
- heap → MEM
- "weak count", "type-erased" → DEFINE
- pointer width ("two pointers wide") → DEFINE

## smart-pointers-shared-ptr-deleter-captured
- `std::puts` → DEFINE

## smart-pointers-sink-parameter
- `std::move(p)` → REQUIRE cpp-essentials/value-categories-std-move-cloze
- `*p` → REQUIRE cpp-essentials/ptr-amp-and-star-cloze
- "sink", "borrow", pass by value vs reference → MOVE cpp-basics/fn-by-value-vs-reference (no requires)

## smart-pointers-unique-ptr-deleter-size
- `std::unique_ptr<std::FILE, Closer>`, functor `operator()`, empty-base optimisation, `sizeof` reasoning, `#include <functional>` → TOO ADVANCED: custom deleter types plus function objects plus object size; after the sprint
- `std::FILE` → DEFINE

## smart-pointers-unique-ptr-moved-from-null
- `a.get()` → DEFINE: "get() returns the raw pointer without giving up ownership"

## smart-pointers-weak-ptr-lock
- "another thread may destroy it" → REQUIRE cpp-essentials/conc-thread-shares-memory
- `if (auto p = pin(w))` → DEFINE: "an if can declare a variable; a shared_ptr is true when non-empty"
- `auto pin(...)` return type → AUTO
- `p->visit()` → MOVE cpp-basics/ptr-arrow-null-check
- "atomic step" → DEFINE: "indivisible"
- Combines 4 ideas (weak_ptr, lock, threads, auto) → flag

## strings-sso
- `std::string code = "EUR";` → STR
- "heap", "buffer inside the object" → MEM
- "libstdc++" → DEFINE: "libstdc++ = GCC's standard library"
- No requires at all → add STR and MEM

## strings-string-view-dangling
- `std::string s = "hello, "; s += name;` → STR
- "a compile error in this constant-evaluated harness" → cut (harness leakage)
- `std::string_view` as a parameter → REQUIRE cpp-essentials/strings-string-view-parameter (present)

## strings-string-view-not-null-terminated
- C string / `'\0'` terminator, `const char*` reads until `\0`, `fopen` → STR (C-string part)
- `substr`, `data()` → DEFINE
- `std::string c_str = name.data();` → ok after STR

## strings-string-view-parameter
- string literal is `const char[]`, not `std::string`; temporary `std::string` built from it → STR
- requires value-categories-temporary-materialization is spurious → replace with cpp-essentials/life-temporary-full-expression
- "pointer and a length" → DEFINE

## vocab-expected-carries-error
- `std::string_view` → REQUIRE cpp-essentials/strings-string-view-parameter
- "exception" as a channel → REQUIRE cpp-essentials/err-throw-jumps-to-catch
- "out-parameter" → DEFINE: "a reference parameter the callee writes the result into"; or REQUIRE cpp-essentials/ptr-bump-by-reference
- two-type template argument `std::expected<int, PortError>` → ok

## vocab-optional-maybe-value
- `if (auto u = find_user(id))`, `value_or` → DEFINE
- "sentinel" → DEFINE: "a special value such as -1 meaning 'none'"
- "heap allocation" → MEM
- `*u` UB → REQUIRE cpp-essentials/ub-definition

## vocab-span-parameter
- `std::array`, `std::vector` temporary → MOVE cpp-basics/iter-array-fixed-size; VEC
- `std::span<const int>`, "pointer and a length" → DEFINE
- range-for `for (int x : xs)` → REQUIRE cpp-essentials/iter-range-for-alias
- constexpr function → SA
- Combines 4 ideas → flag

## vocab-variant-closed-set
- `std::variant<Circle, Square, Triangle>` → NEW: variant basics (holds exactly one of the listed types)
- `std::visit`, "handler" → DEFINE: "std::visit calls the right overload for whichever alternative is active"
- "open vs closed set" → DEFINE
- Requires virtual-dispatch-dynamic-type for contrast: ok

## vocab-visit-missing-handler
- visitor struct with `operator()` overloads → DEFINE: "a struct with operator() is callable like a function; one overload per type"
- `std::visit(Layer{}, s)` → NEW: variant basics
- `operator()(auto)` catch-all → DEFINE
- Combines 4 ideas → flag

## exceptions-commit-by-swap
- `using Names = ...` alias → DEFINE: "using A = B gives B a second name"
- `std::vector<std::string>`, `swap`, copy → VEC
- "swap only exchanges pointers" → REQUIRE cpp-essentials/iter-reserve-keeps-buffer
- requires move-semantics-noexcept-move is not a direct prerequisite; drops 16 cards into the closure → remove from requires

## exceptions-conditional-noexcept
- `noexcept(noexcept(f()))`, `template <class F>`, callable `f()` → TOO ADVANCED: needs the noexcept operator, templates, and callables; a library-author technique; after the sprint
- `loud` mentioned in the back is not defined on the card → fix

## exceptions-noexcept-operator
- "unevaluated operand, like sizeof's" → MOVE cpp-basics/types-size-minimums or cut
- noexcept operator → TOO ADVANCED with exceptions-conditional-noexcept (only prerequisite of that card)

## exceptions-strong-vs-basic
- "invariants intact", "leaks" → REQUIRE cpp-essentials/class-invariant-who-checks
- `v.push_back(x)` reallocation → VEC; REQUIRE cpp-essentials/iter-growth-invalidates
- Combines 3 new ideas → flag

## exceptions-unwinding-destroys-locals
- `std::ofstream`, `std::lock_guard` → DEFINE: "an ofstream closes its file, a lock_guard unlocks its mutex, in their destructors"; or REQUIRE cpp-essentials/conc-lock-the-counter
- RAII (never named) → DEFINE

## exceptions-which-guarantee
- `std::vector<int>`, `push_back`, `back()`, braced temporary `{1, 2, -3, 4}` → VEC
- empty handler `catch (const std::invalid_argument&) {}` → ok
- 3 loop iterations before the throw; acceptable

## spaceship-hand-written-no-equality
- `operator<=>`, `std::strong_ordering` → OPS; DEFINE
- `if (auto c = ...; c != 0)` → DEFINE: "an if can declare a variable before the condition"
- `= default` on `operator==` → MOVE cpp-basics/class-default-delete-where
- "implicitly declares" → DEFINE
- Combines 4 ideas → flag

## spaceship-rewritten-not-equal
- operator overloading → OPS
- overload resolution, "rewritten candidate" → REQUIRE cpp-essentials/fn-overload-ranking
- requires spaceship-basics is not a prerequisite of `==`/`!=` rewriting → require OPS instead

## spaceship-basics
- `auto r = 3 <=> 5;` → AUTO
- "three-way comparison", "comparison category" → DEFINE: "a <=> b yields an object saying less, equal or greater"
- no requires at all

## callables-explain-capture-lifetime
- `std::function` → REQUIRE cpp-essentials/lambda-store-std-function
- "posted to another thread" → REQUIRE cpp-essentials/conc-thread-shares-memory

## chunks-erase-remove
- "moved-from state" → DEFINE: "leftover elements with unspecified values"
- `std::remove_if` returns the new logical end → ok

## trace-order-of-initialisation
- default member initializer `char c = mark('c');` → MOVE cpp-basics/class-default-member-initialiser
- `-Wreorder` → DEFINE: "a GCC warning when the init list order differs from declaration order"
- side-effect helper `mark` plus trail string → fine

## trace-temporaries-in-range-for
- range-for desugaring, `auto&& __range`, `begin()`/`end()` returning `const int*` → REQUIRE cpp-essentials/iter-end-one-past; DEFINE: "range-for calls begin() and end() on the range"
- pointer arithmetic `v + 3` → REQUIRE cpp-essentials/ptr-trace-arithmetic
- `auto&&` → DEFINE
- P2718, C++23 extension in the back → cut
- Two separate runs (the loop and `*Bag{}.begin()`) and custom begin/end machinery → flag against §3.1; split into two traces and use `std::vector` or an array as the range

## atomics-chunk-cas-loop
- `std::memory_order_relaxed` → DEFINE: "relaxed = no ordering relative to other memory, only atomicity"
- `compare_exchange_weak` spurious failure → DEFINE

## atomics-explain-publish-with-flag
- "sequenced before", "spin" → DEFINE
- release / acquire, `memory_order` → NEW: memory_order intro (see atomics-synchronizes-with)
- Combines 5 ideas by design (explain) but needs the NEW memory_order card

## atomics-lock-free-is-per-type
- "lock-free", `is_always_lock_free`, 3/12/16-byte types, x86-64 GCC → TOO ADVANCED: lock-freedom is never defined, the answer depends on platform sizes, and the harness is `static_assert` on a platform fact
- `std::uint64_t` → DEFINE

## atomics-modification-order
- `std::atomic<T>`, `memory_order` → REQUIRE cpp-essentials/conc-single-counter-fix (first atomic card)
- "thread" → REQUIRE cpp-essentials/conc-thread-shares-memory
- "torn value", "read-modify-write" (`fetch_add`, `exchange`, `compare_exchange`) → DEFINE
- "modification order" → DEFINE
- no requires at all, yet five new ideas → flag

## atomics-seq-cst-store-buffering
- `seq_cst`, total order, "strongly happens-before", store buffer (x86 hardware) → TOO ADVANCED: litmus-test reasoning needs a hardware model; after the sprint

## atomics-synchronizes-with
- release store / acquire load meaning → NEW: memory_order intro: "release publishes writes made before it; acquire sees them once it reads the released value"
- "release sequence", "sequenced" → cut or DEFINE
- Combines 4 ideas → flag

## atomics-trace-message-passing
- `std::jthread c(consumer), p(producer)`, `join` → REQUIRE cpp-essentials/conc-join-waits-trace; DEFINE: "jthread = a thread that joins itself in its destructor"
- `ready.exchange(false)` → DEFINE: "exchange stores a new value and returns the old"
- spin loop → DEFINE
- Two lessons in one trace (@1 message passing, @2 exchange/join) → flag against §3.1

## atomics-trace-relaxed-counter
- `std::jthread`, `fetch_add` returns the old value, `memory_order_relaxed` → DEFINE
- Two threads × 1000 iterations and a formula answer (2000, then 2005) → flag against §3.1 (loops ≤ 4 iterations, formula lessons are `basic`); rewrite as a basic or shrink to 2 iterations

## threads-chunk-cv-wait
- `std::mutex`, `std::unique_lock` → REQUIRE cpp-essentials/conc-mutex-takes-turns, conc-lock-the-counter
- `std::deque` `front/pop_front` → DEFINE; "producer/consumer" → DEFINE
- CTAD `std::unique_lock lk(m)` → DEFINE
- `[&]` → ok (stdalgo-lambda-syntax)

## threads-cv-wait-lock-type
- `std::mutex`, `std::lock_guard` → REQUIRE cpp-essentials/conc-mutex-takes-turns, conc-lock-the-counter
- condition variable (what it is) → NEW: condition variable intro
- `bool ready` global shared across threads (a data race as written) → fix the example (make it `std::atomic<bool>` or guard it)
- Combines 4 ideas → flag

## threads-cv-wait-needs-predicate
- `cv.wait`, `notify_one`, "spuriously", "lost notify" → NEW: condition variable intro: "wait releases the lock, sleeps until notified, relocks"
- `std::unique_lock`, mutex `m` → REQUIRE cpp-essentials/conc-mutex-takes-turns, conc-lock-the-counter
- `queue.front()` → DEFINE
- Combines 4 new ideas (cv, mutex, spurious wake-up, lost notify) with one require → flag

## threads-data-race-is-ub
- "happening-before" → DEFINE: "one access is guaranteed to finish before the other starts"
- "atomic" → REQUIRE cpp-essentials/conc-single-counter-fix

## threads-scoped-lock-two-mutexes
- `std::mutex`, `lock_guard` → REQUIRE cpp-essentials/conc-mutex-takes-turns, conc-lock-the-counter
- "deadlock" → NEW: deadlock in one card ("two threads each hold one lock and wait for the other")
- `std::lock`'s algorithm → cut
- Combines 3 new ideas → flag

## threads-thread-destructor-joinable
- "joinable", `detach` → DEFINE
- `std::jthread`, `request_stop()` → DEFINE: "jthread joins in its destructor; request_stop asks it to stop"
- `std::terminate` → REQUIRE cpp-essentials/err-no-handler-terminates (present via conc-forgotten-join)


## Summary

Recurring gaps, with the single remedy for each:

1. **No vector/container foundation.** `std::vector<T>` (element type in `<>`, `v[i]`, `push_back`, `size`, `front`, braced init) appears in ~25 core cards and no Card teaches it. Remedy: NEW `vector-basics` (L1 basic), required by every card marked VEC. Companions: NEW `map-basics` (std::map, std::pair `.first/.second`, `it->second`, iterator `++it`) and MOVE cpp-basics/iter-array-fixed-size for `std::array`.
2. **`static_assert` / constexpr-function checks.** ~12 cards show them (layout, raii-guard, vptr, lambda-mutable, containers, storage, span); only a cloze on constant evaluation exists. Remedy: NEW `static-assert-intro` ("fails the build when false; the condition is a constant expression"), required by layout-padding-sizeof and the other SA cards.
3. **`sizeof` / alignment never defined.** Whole layout cluster plus vptr, three-behaviours, deleter-size. Remedy: MOVE cpp-basics/types-size-minimums (no requires), then layout-alignment requires it.
4. **Move semantics are discussed before moving is taught.** value-categories (taxonomy, std-move), move-semantics-const-member-copies, lambda-init-capture lean on "move" with only raii-move-steals-handle (a code Card with 5 new ideas) behind them. Remedy: NEW `move-vs-copy-intro` basic (a move constructor T(T&&) takes an expiring object's resource and leaves it empty), required by value-categories-taxonomy, value-categories-std-move-cloze, raii-move-steals-handle and move-semantics-const-member-copies.
5. **Memory model words** (stack, heap, allocation, cache, cache line, contiguous, ABI, x86-64). Remedy: NEW `stack-vs-heap-basics` (MEM) and NEW `cpu-cache-basics` (CACHE), required by strings-sso, smart-pointers-*, containers-default-to-vector, layout-alignas-sizeof.
6. **Strings.** `std::string`, string literal `const char[]`, C-string `'\0'` termination. Remedy: NEW `string-basics` (STR), required by strings-*, class/move/virtual cards that use `std::string`.
7. **`auto`.** First met in lambdas and containers. Remedy: NEW `auto-basics` (AUTO), required by stdalgo-lambda-syntax and every card marked AUTO.
8. **Operators and friends.** `operator+`, `operator<=>`, `operator()`, `friend`. Remedy: NEW `operator-overloading-basics` (OPS) plus NEW `friend-basics`; required by operators-*, spaceship-*, lambda-closure-type, vocab-visit-missing-handler.
9. **Known cards not required.** Many cards need cards already in cpp-essentials: class-constructor-intro, class-init-list-required, class-delete-copy, class-explicit-constructor, err-noexcept-broken-promise, fn-overload-ranking, value-categories-std-move-cloze, vc-rvalue-ref-binds-temporaries, iter-range-for-alias, iter-growth-invalidates, life-make-unique, conc-mutex-takes-turns, conc-lock-the-counter, tmpl-function-syntax, ub-definition. Remedy: add them to `requires` as listed per card.
10. **Concurrency cluster** (cv-wait, scoped-lock, atomics): condition variable, deadlock and memory_order are never introduced. Remedy: NEW `condition-variable-intro`, NEW `deadlock-intro`, NEW `memory-order-intro` (relaxed vs release/acquire vs seq_cst), and make atomics-modification-order require conc-single-counter-fix.
11. **Other MOVEs** (no requires, L1): cpp-basics/fn-namespace-clash then fn-qualified-name (`std::`, `::`); class-member-function-this (`this`); ptr-arrow-null-check (`->`, null); class-default-delete-where (`= default`, `= delete`); class-default-member-initialiser; fn-default-argument; fn-by-value-vs-reference; algo-basics/hashing-index-mod-trace (hash buckets).
12. **One-clause DEFINEs** recur: inlining, optimiser, O(1)/O(log n), `#include`, `std::FILE`, `std::puts`, jthread, NRVO.

TOO ADVANCED (move out of essentials): const-constexpr-if-constexpr-discard, initialization-static-guard-cost, value-categories-temporary-materialization, class-pimpl, staticpoly-crtp-base, staticpoly-type-erasure, templates-concepts-vs-sfinae, smart-pointers-unique-ptr-deleter-size, exceptions-conditional-noexcept, exceptions-noexcept-operator, atomics-lock-free-is-per-type, atomics-seq-cst-store-buffering.

Trace Cards breaking the §3.1 budget (more than one run, loops over 4, or formula lessons): types-signed-unsigned-trace, layout-offsets-trace, raii-ctor-throw-unwinds-members, trace-temporaries-in-range-for, atomics-trace-message-passing, atomics-trace-relaxed-counter.

Structural: move-semantics-explain-lost-moves holds three independent lessons; several `requires` are spurious or too heavy (virtual-dispatch-dynamic-type -> virtual-static-dispatch, exceptions-commit-by-swap -> move-semantics-noexcept-move, spaceship-rewritten-not-equal -> spaceship-basics, strings-string-view-parameter -> value-categories-temporary-materialization).
Audited 153 cards: 142 with gaps, 453 gaps total, 12 too advanced.
