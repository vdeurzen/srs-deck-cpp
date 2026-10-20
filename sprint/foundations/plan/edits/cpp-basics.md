# Consolidated edits: cpp-basics

Per Card staying in the essentials Decks (moved-in Cards included under the batch of their origin). Ids are qualified. `add requires` lists direct prerequisites only, after removing those already reachable; overflow past fan-in 3 became a `define`.

## cpp-essentials/class-const-object-call
- add requires: cpp-essentials/fn-overload-ranking
- split / reshape: cut `std::vector::operator[]` in back (back-only aside)
- split / reshape: instrumentation machinery plus 3 ideas (const overload, const reference, string log); shrink to ints.

## cpp-essentials/class-constructor-intro
- add requires: cpp-essentials/class-struct-members
- define: "creates a Car, passing 90 to the constructor" for `Car c(90);`

## cpp-essentials/class-default-ctor-restore
- add requires: cpp-essentials/class-default-delete-where, cpp-essentials/class-default-member-initialiser
- define: "a constructor callable with no arguments" for "default constructor"

## cpp-essentials/class-delete-copy
- add requires: cpp-essentials/class-explicit-constructor
- define: "`t2 = t1;` on an existing object calls `operator=`" for copy assignment `operator=` (back)
- split / reshape: `#include <type_traits>` noise — drop

## cpp-essentials/class-explain-construction
- add requires: cpp-essentials/types-uninit-local-read

## cpp-essentials/class-explicit-blocks-conversion
- add requires: cpp-essentials/class-converting-constructor

## cpp-essentials/class-init-list-required
- add requires: cpp-essentials/constexpr-fn-static-assert
- define: "`: engine_(hp)` after the parameter list initialises member engine_ with hp before the body runs" for member initialiser list syntax `: engine_(hp)` first appears in the front itself (Engine)
- define: "trailing `_` marks a data member" for `engine_` underscore, a member of class type

## cpp-essentials/class-init-list-vs-body
- add requires: cpp-essentials/class-member-function-this, cpp-essentials/iter-string-sequence
- define: "user-written assignment operator; `*this` = the object called on" for `Name& operator=(const char*)`, `return *this`
- define: "a one-argument constructor not marked `explicit` lets the compiler convert that argument type silently" for converting constructor `Name(const char*)` from `"bob"`
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 4 ideas (default ctor, converting ctor, operator=, log); shrink.

## cpp-essentials/class-invariant-who-checks
- add requires: cpp-essentials/const-member-on-const-ref
- define: "a condition every method may rely on and must preserve" for "invariant" defined only in a code comment
- define: "private members are usable only by the class's own member functions" for `private`/`public`
- split / reshape: cut `friend` (back) (back-only aside (friend is taught in class-friend-basics later))

## cpp-essentials/class-struct-vs-class
- add requires: cpp-essentials/class-struct-members
- define: "only member functions of the class may touch it" for `private` meaning

## cpp-essentials/conc-atomic-or-mutex
- define: "lock-free = no thread ever waits for another" for "lock-free", "blocks"

## cpp-essentials/conc-check-then-act
- split / reshape: cut `compare_exchange_strong` (back) (back-only forward reference (atomics-compare-exchange-failure teaches it))

## cpp-essentials/conc-data-race-one-writer
- add requires: cpp-essentials/ub-definition, cpp-essentials/conc-join-waits-trace
- define: "on a `std::atomic<int>`, `++x` is one indivisible step" for `std::atomic<int>` fix

## cpp-essentials/conc-forgotten-join
- define: "`std::cout << x` prints x" for `std::cout << "bye\n"`
- define: "lets the thread run on its own" for `detach()`

## cpp-essentials/conc-join-waits-trace
- split / reshape: cut ThreadSanitizer (back) (tool name in the back; say "a memory checker reports it" or cut)
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 4 ideas (thread, lambda capture by ref, join, ordering).

## cpp-essentials/conc-lock-the-counter
- add requires: cpp-essentials/life-destructor-intro
- define: "`std::lock_guard<std::mutex> hold(m);` locks m now and unlocks it when hold is destroyed" for `std::lock_guard<std::mutex> hold(m);`
- split / reshape: cut "guard refuses a temporary" and "declares a new guard called m" (back) (back-only asides)
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3 ideas.

## cpp-essentials/conc-mutex-takes-turns
- define: "an exception thrown between `lock()` and `unlock()` skips the unlock, leaving the mutex locked" for exception leaving m locked

## cpp-essentials/conc-single-counter-fix
- add requires: cpp-essentials/conc-atomic-int-intro
- define: "`volatile` only stops the compiler skipping reads and writes; `thread_local` gives each thread its own copy (remove the stray `#include <memory>`)" for `volatile`, `thread_local`, `shared_ptr`, stray `#include <memory>` (back/front)

## cpp-essentials/conc-start-with-arguments
- add requires: cpp-essentials/stdalgo-lambda-syntax
- define: "anything you can call with `()`" for "callable"

## cpp-essentials/conc-thread-argument-by-reference
- add requires: cpp-essentials/ptr-bump-by-reference
- split / reshape: cut `std::cref` (back) (back-only aside)

## cpp-essentials/conc-thread-shares-memory
- define: "`std::cout << x` prints x" for `std::cout << score + local`
- define: "`int main()` is where the program starts" for `int main()`

## cpp-essentials/const-explain-signatures
- add requires: cpp-essentials/const-needs-initializer

## cpp-essentials/const-fixed-pointer
- add requires: cpp-essentials/constexpr-fn-static-assert, cpp-essentials/ptr-array-name-to-pointer
- define: "`{}` zero-fills" for `int buf[3]{}` empty-brace zero init
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3 ideas: const placement, array decay, zero-init.

## cpp-essentials/const-loop-chunk
- define: "unsigned type for sizes and counts" for `std::size_t`
- define: "`std::vector<T>` is a growable array of T: `v[i]`, `push_back` appends, `size()` counts" for `std::vector<std::string>`, `.size()`
- define: "`for (T x : c)` runs the body once per element of c, with x initialised from that element" for range-for `for (const auto& name : names)`
- define: "`#include <x>` makes the library header x visible; its names live in namespace `std`, written `std::name`" for `#include`/`std::`

## cpp-essentials/const-member-on-const-ref
- add requires: cpp-essentials/class-struct-members, cpp-essentials/class-member-function-this

## cpp-essentials/const-pointer-read-rule
- define: "`char` is a one-byte integer holding a character code" for `char` (the first type in the Card)

## cpp-essentials/const-ref-parameter
- add requires: cpp-essentials/iter-string-sequence, cpp-essentials/const-no-modify
- define: "a temporary is an unnamed value that dies at the end of the statement" for "temporary string can still be passed"
- define: "`for (T x : c)` runs the body once per element of c, with x initialised from that element" for range-for `for (char ch : text)`
- define: "a `constexpr` function can run while compiling, and `static_assert(cond)` stops the build when cond is false" for `constexpr int` function
- define: "`#include <x>` makes the library header x visible; its names live in namespace `std`, written `std::name`" for `const std\::string&` blank has `std::`

## cpp-essentials/const-vs-constexpr-initializer
- add requires: cpp-essentials/const-no-modify
- define: "compile time = while the compiler builds the program; run time = while it executes" for "compile time" vs "run time"
- define: "declared here, defined elsewhere" for `int read_port();` bodiless function
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: two new ideas at once (const, constexpr) for an entry Card.

## cpp-essentials/err-assert-vanishes-ndebug
- add requires: cpp-essentials/err-assert-basics
- define: "file stream open test" for `cfg.is_open()`
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3 ideas at once (assert, macro, build types).

## cpp-essentials/err-catch-by-reference-why
- define: "standard exceptions derive from `std::exception`; `what()` returns the message" for `std::runtime_error`, `std::exception`, `e.what()`
- define: "implementation-defined = the compiler or library chooses and documents the behaviour" for "implementation-defined", "libstdc++"

## cpp-essentials/err-channel-assert-bug
- define: "what the caller must guarantee before calling" for "precondition"

## cpp-essentials/err-channel-return-value
- add requires: cpp-essentials/vocab-optional-maybe-value
- define: "a channel is the way a function reports failure: return value, exception, or assert" for "channel"

## cpp-essentials/err-explain-failure-paths
- define: "move = steal contents" for "`std::vector` choosing to move"

## cpp-essentials/err-first-matching-handler
- define: "concatenation" for `std::string("net ") + e.what()`
- split / reshape: overload flag: 4 ideas (hierarchy, inherited ctors, handler order, concat). (no prerequisite fixes it; consider splitting)

## cpp-essentials/err-no-handler-terminates
- add requires: cpp-essentials/err-unwind-runs-destructors
- define: "implementation-defined = the compiler or library chooses and documents the behaviour" for "implementation-defined"

## cpp-essentials/err-noexcept-broken-promise
- define: "in front: `noexcept` promises the function never throws" for `noexcept` never defined
- define: "move" for "`std::vector` deciding whether to move"
- define: "`cache.clear()` and `log(...)` stand for any code that might throw" for `cache.clear()`, `log(...)`

## cpp-essentials/err-own-exception-type
- define: "type alias" for `using Base = std::runtime_error;`
- define: "`using Base::Base;` inherits Base's constructors" for `using Base::Base;`
- define: "`#include <x>` makes the library header x visible; its names live in namespace `std`, written `std::name`" for `#include <stdexcept>`

## cpp-essentials/err-pick-a-channel
- define: "a channel is the way a function reports failure: return value, exception, or assert" for "channel"

## cpp-essentials/err-throw-jumps-to-catch
- add requires: cpp-essentials/err-throw-catch-intro, cpp-essentials/iter-string-sequence
- define: "a char is a number; `c - '0'` is the digit's value" for `c - '0'`, `'0'..'9'` char arithmetic
- define: "`std::invalid_argument` is a standard exception type for bad arguments" for `std::invalid_argument`
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 4 ideas.
- trace: WORKED FIRST: cpp-essentials/err-throw-catch-intro (new) is the worked example, wired by the add requires above

## cpp-essentials/err-unwind-runs-destructors
- add requires: cpp-essentials/life-destructor-intro
- define: "`std::runtime_error` is a standard exception class; all standard exceptions derive from `std::exception`, whose `what()` returns the message" for `std::runtime_error`, `std::exception`

## cpp-essentials/fn-declaration-vs-definition
- define: "`main` is where the program starts; a `.cpp` file is one source file the compiler reads" for `main`, `.cpp` file

## cpp-essentials/fn-overload-ranking
- add requires: cpp-essentials/types-promotion-rule
- define: "functions may share a name if parameter types differ" for "overload" (two functions, one name) never defined
- define: "`T{v}` makes a temporary T value" for `short{2}`
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3 ideas: overloading, ranking, promotion.

## cpp-essentials/fn-return-by-value
- add requires: cpp-essentials/iter-string-sequence, cpp-essentials/constexpr-fn-static-assert
- define: "a C string literal type" for `const char* word`
- define: "no character copy is made, or cut from back" for "moved or elided"
- define: "`#include <x>` makes the library header x visible; its names live in namespace `std`, written `std::name`" for `#include <string>`

## cpp-essentials/iter-at-checks-bounds
- add requires: cpp-essentials/vector-basics, cpp-essentials/ub-definition

## cpp-essentials/iter-end-one-past
- add requires: cpp-essentials/vector-basics, cpp-essentials/ub-definition

## cpp-essentials/iter-explain-vector-growth
- add requires: cpp-essentials/ub-definition
- define: "move = steal contents; copy = duplicate" for "moves or copies the elements"

## cpp-essentials/iter-growth-invalidates
- add requires: cpp-essentials/iter-iterator-basics
- define: "a `constexpr` function can run while compiling, and `static_assert(cond)` stops the build when cond is false" for `constexpr int remembered()`, "compile error in a constant expression"

## cpp-essentials/iter-map-find-or-default
- add requires: cpp-essentials/ptr-arrow-null-check
- define: "element is a key/value pair" for `it->second`, `it->first`, `prices.end()`
- define: "`c ? a : b` is an inline if" for ternary `? :`

## cpp-essentials/iter-map-subscript-inserts
- add requires: cpp-essentials/map-unordered-map-intro, cpp-essentials/iter-range-for-alias
- define: "ints start at 0" for "value-initialised"
- define: "`words` is a `std::vector<std::string>`" for `words` undefined

## cpp-essentials/iter-range-for-alias
- add requires: cpp-essentials/iter-iterator-basics, cpp-essentials/constexpr-fn-static-assert
- define: "`for (T x : v)` visits each element" for range-for syntax, "initialised from `*it`"

## cpp-essentials/iter-reserve-keeps-buffer
- add requires: cpp-essentials/ptr-holds-an-address, cpp-essentials/types-auto-deduces
- define: "reserve(n) allocates room for n elements without adding any; data() is a pointer to the first element" for `reserve`, `v.data()`, "buffer"

## cpp-essentials/iter-size-vs-capacity
- add requires: cpp-essentials/vector-basics

## cpp-essentials/life-copy-ctor-param
- add requires: cpp-essentials/class-default-member-initialiser
- define: "the constructor that builds a new object from an existing one of the same type" for "copy constructor"
- define: "`T&&` binds only to temporaries (rvalues)" for `Tally&&`, "implicit copy constructor deleted" (back)

## cpp-essentials/life-copy-init-not-assign
- add requires: cpp-essentials/class-constructor-intro
- define: "copy ctor builds a new object from another; copy assignment overwrites an existing one" for "copy constructor", "copy assignment operator" never defined

## cpp-essentials/life-copy-which-runs
- add requires: cpp-essentials/ptr-trace-by-value
- define: "`Note& operator=(const Note&)` is the copy assignment operator; `return *this` hands back the object assigned to" for `Note& operator=(const Note&)`, `return *this`

## cpp-essentials/life-delete-matches-new
- add requires: cpp-essentials/ub-definition

## cpp-essentials/life-destructor-frees
- add requires: cpp-essentials/class-explicit-constructor
- define: "RAII = acquire in the constructor, release in the destructor" for RAII (back)
- define: "C's allocation functions" for `std::free`, `malloc`
- define: "memory never released" for "leak"
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3+ ideas: destructor, `delete[]`, RAII.

## cpp-essentials/life-destructor-intro
- add requires: cpp-essentials/life-scope-automatic

## cpp-essentials/life-make-unique
- add requires: cpp-essentials/ptr-arrow-null-check

## cpp-essentials/life-new-outlives-scope
- add requires: cpp-essentials/life-stack-vs-heap, cpp-essentials/ptr-nullptr-overload
- define: "object never destroyed" for "leak"
- split / reshape: cut `-fsanitize=address` in back (tool name in the back; say "a memory checker reports it" or cut)

## cpp-essentials/life-reverse-order-trace
- add requires: cpp-essentials/class-default-member-initialiser, cpp-essentials/iter-string-sequence
- define: "single-quoted = one `char`" for char literals `'x'`
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 4+ ideas (member order, init list, destructor body order, string log); too much.

## cpp-essentials/life-scope-automatic
- define: "a destructor is the function that runs automatically when an object dies" for destructor
- split / reshape: rewrite with ints and a plain block (the audit's alternative): `std::vector`, `std::string`, `std::to_string` and range-for are stage dressing on the entry Card for lifetime; e.g. a `Tag t;` local inside an `if` block
- split / reshape: Entry Card combining 4 new library things.

## cpp-essentials/life-shallow-copy-pointer
- define: "the copy constructor the compiler writes copies each member in turn (a pointer member is copied as an address)" for "compiler-generated copy constructor copies each member"
- define: "if a class needs a custom destructor it needs copy ops too" for "Rule of Three" (back)

## cpp-essentials/life-shared-ptr-owners
- add requires: cpp-essentials/smart-shared-ptr-intro
- define: "wider integer" for `long owners`
- define: "`#include <x>` makes the library header x visible; its names live in namespace `std`, written `std::name`" for `#include <memory>` absent
- trace: WORKED FIRST: cpp-essentials/smart-shared-ptr-intro (new) is the worked example, wired by the add requires above

## cpp-essentials/life-temporary-full-expression
- define: "`T{}` makes an unnamed object; full-expression = the whole statement to its `;`" for `Probe{}` as expression, "temporary", "full-expression"
- split / reshape: overload flag: overloaded `peek(const Probe&)` vs two-argument form — extra machinery (no prerequisite fixes it; consider splitting)
- split / reshape: overloaded `peek(const Probe&)` vs two-argument form — drop second overload

## cpp-essentials/life-unique-ptr-frees
- define: "`<int>` inside angle brackets picks the type" for "template argument is the pointed-to type"

## cpp-essentials/life-unique-ptr-member-no-copy
- add requires: cpp-essentials/class-default-member-initialiser
- define: "if a member cannot be copied, the compiler-written copy constructor is deleted" for "copy constructor is deleted" implicitly

## cpp-essentials/life-unique-ptr-owns-trace
- add requires: cpp-essentials/smart-unique-ptr-intro
- split / reshape: cut "AddressSanitizer reports ... leaked" (back) (tool name in the back; say "a memory checker reports it" or cut)
- trace: WORKED FIRST: cpp-essentials/smart-unique-ptr-intro (new) is the worked example, wired by the add requires above

## cpp-essentials/linkage-extern-global-variable
- add requires: cpp-essentials/linkage-inline-header-fix
- define: "extern declares a variable without defining it" for `extern` (the answer; first meeting)

## cpp-essentials/linkage-include-is-paste
- define: "the step before compilation that handles `#` lines" for "preprocessor"

## cpp-essentials/linkage-private-helper
- add requires: cpp-essentials/fn-namespace-clash
- define: "name is private to its translation unit" for "internal linkage"

## cpp-essentials/ptr-amp-and-star-cloze
- define: "object = a piece of memory holding a value of some type" for "object"
- define: "unary = one operand (as opposed to binary `*` multiply)" for unary `&`, unary `*`

## cpp-essentials/ptr-arrow-null-check
- remove requires: cpp-essentials/ptr-nullptr-overload
- define: "`nullptr` is the null pointer: it points at no object" for `nullptr`

## cpp-essentials/ptr-bump-by-reference
- add requires: cpp-essentials/ptr-trace-by-value, cpp-essentials/const-no-modify
- define: "a `constexpr` function can run while compiling, and `static_assert(cond)` stops the build when cond is false" for `constexpr void bump(...)`

## cpp-essentials/ptr-dangling-local
- add requires: cpp-essentials/life-scope-automatic, cpp-essentials/ub-definition
- define: "stack = where locals live; flag = [warning flags]" for "stack slot", `-Wreturn-local-addr`
- define: "the returned value is the address of `m`" for function returning a pointer `int* larger(int, int)`

## cpp-essentials/ptr-explain-parameter-forms
- add requires: cpp-essentials/ub-definition

## cpp-essentials/ptr-holds-an-address
- define: "`&n` = address of n; `int*` = pointer to int; `*p` = the thing p points at" for `&n`, `int*`, `*p` all appear before any are defined (entry Card)
- define: "object = a piece of memory holding a value of some type" for "object"

## cpp-essentials/ptr-nullptr-overload
- add requires: cpp-essentials/constexpr-fn-static-assert
- define: "a null pointer points at no object" for "null pointer" itself never taught
- define: "a string literal is a `const char*` to characters ending in `'\0'`" for `pick(const char*)`, C string, `"no string at all"`
- define: "implementation-defined = the compiler/library chooses" for `NULL`, `__null`, "implementation-defined", `std::nullptr_t` (back)
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3+ ideas: overload ranking, null pointers, C strings.

## cpp-essentials/ptr-pointer-param-meaning
- add requires: cpp-essentials/ptr-arrow-null-check
- define: "a header is a file of declarations" for "header declares"

## cpp-essentials/ptr-reference-must-bind
- add requires: cpp-essentials/ptr-holds-an-address
- define: "`int& r = a;` makes r another name for a" for reference never defined before the question
- define: "pointer pointing at nothing" for "null"

## cpp-essentials/ptr-trace-arithmetic
- add requires: cpp-essentials/ptr-arith-counts-elements
- define: "`long` is a wider integer type" for `long gap`

## cpp-essentials/stdalgo-accumulate-init
- add requires: cpp-essentials/iter-iterator-basics, cpp-essentials/constexpr-fn-static-assert
- define: "algorithms take a begin/end iterator pair" for `std::accumulate(v.begin(), v.end(), 0.0)`, `#include <numeric>`

## cpp-essentials/stdalgo-capture-ref-vs-copy
- define: "lets a by-copy capture be modified" for `mutable` (back)

## cpp-essentials/stdalgo-comparator-strict
- add requires: cpp-essentials/ub-definition

## cpp-essentials/stdalgo-erase-if
- define: "a function returning bool" for "predicate"
- define: "unsigned size type" for `std::size_t`
- split / reshape: cut `std::erase`, member `v.erase` (back) (back-only aside)

## cpp-essentials/stdalgo-find-if-not-found
- add requires: cpp-essentials/stdalgo-find-vs-find-if
- define: "ternary; an iterator marks a position: `begin()` is the first element, `++it` moves on, `*it` reads it" for `*it` dereference, `it != v.end() ? *it : 0`

## cpp-essentials/stdalgo-lambda-syntax
- add requires: cpp-essentials/lambda-syntax-intro, cpp-essentials/constexpr-fn-static-assert
- define: "variables from the enclosing function the lambda keeps" for "capture"

## cpp-essentials/stdalgo-remove-if-keeps-size
- add requires: cpp-essentials/stdalgo-remove-if-worked
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 4 ideas (lambda predicate, algorithm on iterators, iterator subtraction, unspecified tail).
- trace: WORKED FIRST: cpp-essentials/stdalgo-remove-if-worked (new) is the worked example, wired by the add requires above

## cpp-essentials/stdalgo-sort-by-length
- add requires: cpp-essentials/stdalgo-sort-basics
- define: "non-owning view of characters; use `std::string` or `int` instead" for `std::string_view`

## cpp-essentials/stdalgo-transform-back-inserter
- add requires: cpp-essentials/ub-definition
- define: "`std::transform(first, last, out, f)` writes f(x) for each input element through the output iterator out" for `std::transform`, output iterator
- define: "output iterator that calls push_back" for `std::back_inserter` (the blank)

## cpp-essentials/tmpl-auto-param-cloze
- add requires: cpp-essentials/tmpl-function-syntax
- remove requires: cpp-essentials/tmpl-instantiation-statics

## cpp-essentials/tmpl-concept-error
- define: "shifts bits right; integers only" for `x >> 1`

## cpp-essentials/tmpl-concept-intro
- add requires: cpp-essentials/std-names-and-headers
- define: "`u` suffix = unsigned" for `7u`

## cpp-essentials/tmpl-constrained-auto
- add requires: cpp-essentials/types-auto-deduces
- define: "an `auto` parameter makes the function a template: each argument type gets its own copy of the function" for `auto` parameter and `constexpr auto` return
- define: "`sizeof(T)` is T's size in bytes; `int` is at least 16 bits, 32 on desktops" for `short`, `long long`, `unsigned`
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3 ideas: abbreviated template, constrained auto, return deduction.

## cpp-essentials/tmpl-deduction-conflict
- define: "the compiler infers `T` from the arguments' types" for "deduce"

## cpp-essentials/tmpl-definition-in-header
- define: "forces the compiler to generate that instantiation here" for `template int twice<int>(int);` explicit instantiation (back)
- split / reshape: 3 ideas: header/source split, instantiation, linker error.

## cpp-essentials/tmpl-distinct-types
- add requires: cpp-essentials/tmpl-class-member-type, cpp-essentials/initialization-aggregate-braces

## cpp-essentials/tmpl-error-at-instantiation
- add requires: cpp-essentials/initialization-aggregate-braces
- define: "instantiation = the compiler writing out the template for a concrete type" for "instantiation", "required from here"
- define: "`a < b` on a struct only compiles if the struct defines `operator<`" for operators on user types (`<` on `Point`)

## cpp-essentials/tmpl-explicit-argument
- add requires: cpp-essentials/types-auto-deduces

## cpp-essentials/tmpl-function-syntax
- add requires: cpp-essentials/tmpl-why-template, cpp-essentials/constexpr-fn-static-assert

## cpp-essentials/tmpl-instantiation-statics
- define: "initialised once, kept between calls" for `static int calls = 0;` function-local static
- define: "a parameter with no name is accepted and ignored; only its type matters" for `int tick(T)` unnamed parameter
- trace: SHRINK: done in the trace rebuild (5 calls/probes, three Ts → 3 calls (int, char, int); v1 → v2); this covers the audit concern(s): 5 probes (limit 3) and 3 template instantiations — cut to 3 calls, 2 probes

## cpp-essentials/types-auto-drops-const
- add requires: cpp-essentials/types-auto-deduces, cpp-essentials/ptr-reference-must-bind
- define: "the `const` on the object itself, not on what a pointer/reference refers to" for "top-level const"
- define: "a `constexpr` function can run while compiling, and `static_assert(cond)` stops the build when cond is false" for `constexpr int countdown()` function
- split / reshape: cut `decltype(auto)` (back only) (back-only aside; not needed for the lesson)
- split / reshape: 4 new ideas at once (auto, top-level const, reference, constexpr function); split.

## cpp-essentials/types-brace-checks-constant
- add requires: cpp-essentials/const-vs-constexpr-initializer, cpp-essentials/types-overflow-rules
- define: "braces initialise a variable and refuse conversions that lose value" for `T x{v}` brace initialisation syntax never introduced
- define: "a `-W...` flag asks the compiler to warn about a suspicious construct" for `-Wnarrowing`

## cpp-essentials/types-enum-no-int
- add requires: cpp-essentials/types-static-cast-value
- define: "an enum names a small set of integer constants; `enum class` keeps them scoped" for `enum`, `enum class`
- define: "the compiler converting a value without being asked" for implicit conversion

## cpp-essentials/types-mixed-sign-compare
- define: "a `-W...` flag asks the compiler to warn about a suspicious construct" for `-Wall`, `-Wsign-compare`
- define: "library function that compares ints safely, or cut" for `std::cmp_less` (C++20, back)

## cpp-essentials/types-overflow-rules
- add requires: cpp-essentials/types-signed-unsigned-range, cpp-essentials/ub-definition
- define: "wraps to the remainder after dividing by 2^N" for "modulo 2^N"
- define: "the largest unsigned int value" for `UINT_MAX`

## cpp-essentials/types-promotion-rule
- add requires: cpp-essentials/types-size-minimums
- define: "narrowing keeps only the low bits" for "stored back into a narrow variable" cuts the value

## cpp-essentials/types-static-cast-value
- add requires: cpp-essentials/cast-static-cast-intro, cpp-essentials/const-vs-constexpr-initializer
- define: "dividing two ints discards the remainder" for integer division `3 / 4 == 0`

## cpp-essentials/types-uninit-local-read
- add requires: cpp-essentials/ub-definition
- define: "static storage = globals/`static`, alive for the whole run; stack = where locals live" for "stack", "indeterminate", "static storage duration"
- define: "empty braces zero-initialise" for `int evens{}` (back)

## cpp-essentials/ub-optimiser-assumes-no-overflow
- define: "ask the compiler to optimise" for `-O2`
- define: "largest `int`; from `<climits>`" for `INT_MAX`

## cpp-essentials/ub-passing-tests-prove-nothing
- define: "UB = the language places no requirement on what the program does" for "undefined behaviour" is the answer yet undefined; ub-definition requires this Card
- define: "`std::cout << x` prints x" for `std::cout << total;`
- define: "valid indices 0..4" for array index out of bounds `scores[5]`

## cpp-essentials/ub-sanitizer-flags
- add requires: cpp-essentials/ub-use-after-free
- define: "a `-W...` flag asks the compiler to warn about a suspicious construct" for `-fsanitize=...`, "compiler flag"

## cpp-essentials/ub-static-assert-finds-ub
- add requires: cpp-essentials/constexpr-fn-static-assert, cpp-essentials/ptr-array-name-to-pointer
- define: "`constexpr int two[] = {5, 6};` is a compile-time array of two ints" for `constexpr int two[] = {5, 6};`
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 4 ideas.

## cpp-essentials/ub-unsigned-countdown-trace
- define: "exactly 32-bit unsigned" for `std::uint32_t`
- define: "logical and" for `&&`
- define: "a `-W...` flag asks the compiler to warn about a suspicious construct" for `-Wextra`
- trace: OK per the trace rebuild (2 probes; 10 is the cap, read by rule (`i >= 0` always true), not simulated); audit concern(s): 10 loop iterations (limit 4) — shrink: `steps < 3` — optional SHRINK/CONVERT only if review agrees

## cpp-essentials/ub-use-after-free
- define: "parentheses initialise the new int to 7" for `new int(7)`

## cpp-essentials/vc-classify-cloze
- define: "`n++` yields n's old value as a temporary; `++n` yields n itself" for `n++` vs `++n`
- split / reshape: 3 forms in one blank series: deref, postfix, prefix; split.

## cpp-essentials/vc-named-rvalue-ref-is-lvalue
- add requires: cpp-essentials/value-categories-std-move-cloze
- define: "`std::string` is a growable sequence of `char`; `+=` appends to it" for `std::string`

## cpp-essentials/vc-param-binding-no-extension
- define: "a `-W...` flag asks the compiler to warn about a suspicious construct" for `-Wdangling-reference`

## cpp-essentials/vc-plain-ref-rejects-temporary
- add requires: cpp-essentials/class-converting-constructor
- define: "`std::string` is a growable sequence of `char`; `+=` appends to it" for `std::string`

## cpp-essentials/vc-trace-extended-temporary
- define: "creates and immediately discards a temporary" for `Probe{};` expression statement
- trace: SHRINK: done in the trace rebuild (4 probes, two extended temporaries → 3 probes, one extended in a block; v1 → v2); this covers the audit concern(s): 4 probes (limit 3) and 3 lifetime ideas (full-expression, extension, inner scope) — drop `inner` block and probe @4

## cpp-essentials/virtual-delete-through-base
- add requires: cpp-essentials/life-delete-matches-new
- define: "`override` = this replaces a base virtual" for `override`, `virtual void run() {}`
- define: "`std::vector<T>` is a growable array of T: `v[i]`, `push_back` appends, `size()` counts" for `std::vector<float> samples`
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3+ ideas: virtual destructor, delete via base pointer, member destruction.

## cpp-essentials/virtual-dispatch-which-runs
- add requires: cpp-essentials/virtual-function-intro, cpp-essentials/class-default-delete-where
- define: "`override` asks the compiler to check that this function replaces a base-class virtual" for `override`, `virtual ~Sensor() = default;`
- define: "a `const` member function promises not to change the object, so it can be called through a const reference" for trailing `const` on methods
- trace: WORKED FIRST: cpp-essentials/virtual-function-intro (new) is the worked example, wired by the add requires above

## cpp-essentials/virtual-enable-dispatch
- define: "`final` forbids any further override; `inline` and `explicit` (distractors) have nothing to do with dispatch" for `final`, `inline`, `explicit`
- define: "a `constexpr` function can run while compiling, and `static_assert(cond)` stops the build when cond is false" for `constexpr` member function

## cpp-essentials/virtual-is-a
- add requires: cpp-essentials/ptr-reference-must-bind, cpp-essentials/class-struct-members
- define: "`: public B` means Car contains and extends B; a `Car&` converts to `B&`" for inheritance `struct Car : public Vehicle`, "base-class subobject"
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3 ideas at once.

## cpp-essentials/virtual-override-mismatch
- add requires: cpp-essentials/virtual-delete-through-base
- define: "in front" for `override`

## cpp-essentials/virtual-pure-syntax
- split / reshape: `virtual ~Shape() = default;` unexplained — delete from snippet or REQUIRE cpp-essentials/virtual-delete-through-base

## cpp-essentials/virtual-slice-parameter
- define: "`override` asks the compiler to check that this function replaces a base-class virtual; `std::string` is a growable sequence of `char`; `+=` appends to it" for `override`, destructor line, `std::string name() const`


## Applied (cpp-essentials basics/09-16)

### 09-templates-basics, 10-containers-and-iterators, 11-algorithms-and-lambdas
- tmpl-auto-param-cloze: changed-from-plan: requires tmpl-function-syntax (+ types-auto-deduces vocab, since the c1 hint leans on `auto`); dropped tmpl-instantiation-statics; "instantiates" reworded to "makes the compiler generate"; elaborate added.
- tmpl-concept-error: done (front defines `x >> 1`); elaborate.
- tmpl-concept-intro: done (requires std-names-and-headers; `7u` defined); elaborate.
- tmpl-constrained-auto: changed-from-plan: requires tmpl-concept-error + tmpl-auto-param-cloze (nearer rung for `auto` parameters; concept-intro now reached); the one define is `auto` return deduction; front says "every integer type, signed or unsigned" instead of naming short/long long, so no second define; elaborate.
- tmpl-deduction-conflict: done ("deduce" defined on front); elaborate.
- tmpl-definition-in-header: done (explicit instantiation glossed in the back's fix); elaborate.
- tmpl-distinct-types: done (+ tmpl-class-member-type, initialization-aggregate-braces); parameter made by-value to avoid const ref; inheritance/constructor aside cut; elaborate.
- tmpl-error-at-instantiation: changed-from-plan: requires tmpl-instantiation-statics (teaches "instantiate") instead of a second define, + initialization-aggregate-braces; front defines `<` on a struct; elaborate.
- tmpl-explicit-argument: done (+ types-auto-deduces); ternary rewritten as if/return; elaborate.
- tmpl-function-syntax: done (+ tmpl-why-template, constexpr-fn-static-assert); ternary rewritten as if/return; elaborate.
- tmpl-instantiation-statics: changed-from-plan: requires life-function-local-static instead of defining `static`; front defines the unnamed parameter; trace re-run (1, 1, 2); elaborate.
- tmpl-explain-templates: beyond plan: rubric rewritten in talk order, front no longer lists the steps, requires the rung-5 cards; v2.
- tmpl-why-template, tmpl-class-member-type: beyond plan: `std::string` dropped from the depth-0 front; `<type_traits>` moved into the harness, + types-auto-deduces (the `auto` chip); elaborate on the second.
- iter-end-one-past: done, with iter-iterator-basics (per the foundation writer) in place of vector-basics; iterator subtraction cut from the back; elaborate.
- iter-at-checks-bounds: done (ub-definition; vector-basics already reached via err-throw-jumps-to-catch); elaborate.
- iter-explain-vector-growth: changed-from-plan: rubric rewritten in talk order without the move/copy wording, so no define and no ub-definition; v2; elaborate.
- iter-growth-invalidates: changed-from-plan: requires iter-end-one-past (iterators + UB) and constexpr-fn-static-assert instead of a define; `begin() + 1` → `++it`, `it[0]` chip → `v[0]`; elaborate.
- iter-map-find-or-default: changed-from-plan: requires map-unordered-map-intro (teaches pair elements, find/end) + ptr-arrow-null-check + const-ref-parameter; ternary rewritten as if/return, so no define; elaborate.
- iter-map-subscript-inserts: done; strings → `std::vector<int>` (defined on front), "value-initialised" → "starts at 0"; elaborate.
- iter-range-for-alias: done; elaborate.
- iter-reserve-keeps-buffer: done; only `data()` defined (reserve is the target); `const int*` → `int*`; trace re-run (0, true); elaborate.
- iter-size-vs-capacity: done; elaborate.
- iter-array-fixed-size, iter-string-sequence: beyond plan: `reserve` aside cut; iter-string-sequence (depth 0) now requires vector-basics, types-auto-deduces; elaborate on both.
- map-unordered-map-intro: reduction only (iter-iterator-basics reached via iter-end-one-past).
- pair-compare-order: NEW level-1 foundation (pair `<` compares first, then second), requires pair-basics.
- stdalgo-accumulate-init: done (iter-iterator-basics reached via iter-end-one-past); accumulate defined on front; elaborate.
- stdalgo-capture-ref-vs-copy: done (`mutable` aside cut); elaborate.
- stdalgo-comparator-strict: done (ub-definition reached via sort-by-length → sort-basics → iter-end-one-past); front now states the belief (misconception shape).
- stdalgo-erase-if: done; `std::size_t` defined, "predicate" avoided; `std::erase` chip dropped, `v.erase` kept with a single clause; + constexpr-fn-static-assert; elaborate.
- stdalgo-find-if-not-found: changed-from-plan: requires stdalgo-find-vs-find-if + expr-conditional-operator (vocab) instead of a define; elaborate.
- stdalgo-find-vs-find-if, stdalgo-lambda-syntax: elaborate; lambda-syntax done (capture taught by lambda-syntax-intro, no define).
- stdalgo-remove-if-keeps-size: done (requires stdalgo-remove-if-worked); iterator-subtraction probe dropped, front states the belief; trace re-run (4; 4, 7); v2.
- stdalgo-sort-by-length: done; `std::string_view` defined on front (`std::string` fails GCC 14's constexpr check); elaborate.
- stdalgo-transform-back-inserter: changed-from-plan: requires iter-end-one-past (brings iterators + UB) instead of iter-size-vs-capacity + ub-definition; transform defined, back_inserter (the blank) not; ternary → if; elaborate.
- stdalgo-remove-if-worked, stdalgo-sort-basics: reduction only.

### 12-error-handling, 13-headers-and-linkage
- err-assert-vanishes-ndebug: done (requires err-assert-basics; `is_open()` defined); elaborate.
- err-catch-by-reference-why: done (std exceptions/what() defined); changed-from-plan: "implementation-defined" reworded, not defined (one define per Card); elaborate.
- err-channel-assert-bug: done ("precondition" defined); `Stack::pop()` reworded (no `::` yet).
- err-channel-return-value: done (requires vocab-optional-maybe-value; "channel" defined); example changed to `price_of(sku)` so it differs from the prerequisite's; elaborate.
- err-explain-failure-paths: changed-from-plan: front rewritten, rubric in talk order, `std::vector` move item dropped (no define needed); v2.
- err-first-matching-handler: changed-from-plan: split the overload by throwing two empty structs (no inherited ctors, concat or what()); probe re-run; v2.
- err-no-handler-terminates: done (requires err-unwind-runs-destructors); "implementation-defined" reworded.
- err-noexcept-broken-promise: done (`noexcept` defined; move aside cut); skipped the `cache.clear()` define (front already says it may throw).
- err-own-exception-type: changed-from-plan: requires types-using-alias instead of a define; virtual-is-a dropped (reached).
- err-pick-a-channel: skipped (front never says "channel"); elaborate.
- err-throw-jumps-to-catch: done (requires err-throw-catch-intro + types-char-is-integer for `c - '0'`; iter-string-sequence reached via const-ref-parameter); `std::invalid_argument` defined.
- err-unwind-runs-destructors: done (life-destructor-intro replaces life-scope-automatic); probes re-run.
- err-throw-catch-intro: reduction only (std-names-and-headers reached).
- linkage-extern-global-variable: done (requires linkage-inline-header-fix); skipped the `extern` define (it is the answer).
- linkage-include-is-paste: done ("preprocessor" defined).
- linkage-private-helper: changed-from-plan: requires linkage-odr-counting + fn-namespace-clash; "internal linkage" not defined (it is the answer).
- linkage-which-step-fails: requires linkage-translation-unit only (build-pipeline reached through it).
- linkage-explain-build: beyond plan: talk-order rubric, front no longer lists topics; v2.
- Elaborate added to every Card needing one.

### 14-undefined-behaviour, 16-concurrency-basics
- ub-explain-no-guarantees: beyond plan: front no longer lists topics; items ≤ 20 words.
- ub-optimiser-assumes-no-overflow: `-O2` defined; `INT_MAX` reworded ("the largest int") instead of a second define.
- ub-passing-tests-prove-nothing: `std::cout` defined; skipped the UB define (target idea of this rung-1 Card) and the index define (leaks).
- ub-sanitizer-flags: done (requires ub-use-after-free); "compiler flag" not defined (one define used on "sanitizer").
- ub-static-assert-finds-ub: done; also ub-definition replaces ub-passing-tests-prove-nothing (the c2 blank is the term).
- ub-unsigned-countdown-trace: SHRINK done (cap `steps < 3`, answer 3); `std::uint32_t` defined; `-Wextra` cut; v2.
- ub-use-after-free: done; `-fsanitize` aside cut.
- conc-atomic-or-mutex: changed-from-plan: "lock-free" reworded on the back (a front define would leak).
- conc-check-then-act: done; misconception premise added.
- conc-data-race-one-writer: done; requires conc-atomic-int-intro instead of the atomic define.
- conc-explain-shared-counter: beyond plan: talk-order rubric.
- conc-forgotten-join: `std::cout` defined; `detach` cut instead of a second define.
- conc-join-waits-trace: ThreadSanitizer cut; loop replaced by two `+=` (state-change budget); probes unchanged.
- conc-lock-the-counter: done (life-destructor-intro; life-scope-automatic now reached); `lock_guard` type defined; asides cut.
- conc-mutex-takes-turns: changed-from-plan: exception aside cut instead of defined.
- conc-single-counter-fix: done; chips now atomic<int>/int/volatile int/atomic<bool>; only `volatile` defined; stray include removed.
- conc-start-with-arguments: done; "callable" avoided rather than defined.
- conc-thread-argument-by-reference: done; `std::cref`/`std::move` chips dropped with the aside.
- conc-thread-shares-memory: `std::cout` defined; `int main()` treated as baseline.
- Elaborate added to every Card needing one.

## Applied (cpp-essentials basics/01-08)

All 104 Cards in basics/01-08 now carry `elaborate` where §4 requires it (worked examples and requires-free basics excepted). Redundant direct edges (reachable through another direct prerequisite) were dropped everywhere except on `explain` capstones (one edge per rubric item). Sanitizer/flag names cut from trace backs.

- class-const-object-call: changed (shrunk to `int` returns, probes x/y; v2; vector aside cut).
- class-constructor-intro: done (define put in back as part of the target; `class ... public:` → `struct`).
- class-default-ctor-restore: changed (requires default-delete-where + default-member-initialiser; "default constructor" not defined on front: naming it with `= default` taught would leak; explained in back).
- class-delete-copy: done (`#include <type_traits>` moved to harness; copy assignment stated in plain words).
- class-explain-construction: done; rubric reordered to §4 talk order, front no longer lists topics.
- class-explicit-blocks-conversion: done.
- class-init-list-required: changed (init-list define skipped: it is the answer; `_` define skipped: just an identifier; "or base" cut).
- class-init-list-vs-body: changed (rewritten as a construction counter, no operator=/converting ctor/string, so no defines needed; belief moved to front; v2; iter-string-sequence not needed).
- class-invariant-who-checks: done (friend and implicit copies cut; private already taught by struct-vs-class).
- class-struct-vs-class: changed (private define skipped: it is the target idea).
- const-explain-signatures: done; rubric in talk order.
- const-fixed-pointer: changed (requires ptr-trace-arithmetic instead of ptr-array-name-to-pointer: it teaches `p[i]` used here).
- const-loop-chunk: changed (requires unchanged, range-for/vector/#include reached via const-ref-parameter → iter-range-for-alias; `std::size_t` → `int`; v2; expose_ms 9500).
- const-member-on-const-ref: done.
- const-pointer-read-rule: changed (requires types-char-is-integer instead of a define).
- const-ref-parameter: changed (requires iter-range-for-alias + iter-string-sequence; const-no-modify/constexpr reached through them; temporary defined on front).
- const-vs-constexpr-initializer: done (compile/run time left as plain words).
- fn-declaration-vs-definition: done.
- fn-overload-ranking: changed (`short{2}` → `char c`, `long` → `double`, since short/long are untaught; overload defined on front).
- fn-return-by-value: changed (parameter `std::string word` so no `const char*` define; #include reached via iter-string-sequence; "moved or elided" cut).
- life-copy-ctor-param: changed (`Tally&&` chip → `const Tally`, avoiding rvalue refs; class-constructor-intro edge redundant).
- life-copy-init-not-assign: done (copy assignment defined neutrally on front).
- life-copy-which-runs: done.
- life-delete-matches-new: done.
- life-destructor-frees: changed (`std::free` chip and `<cstdlib>` dropped; RAII/leak defined in back as the target; life-destructor-intro edge redundant).
- life-destructor-intro: done.
- life-make-unique: done.
- life-new-outlives-scope: done.
- life-reverse-order-trace: changed (shrunk to destructor order only, one probe; v2).
- life-scope-automatic: done (rewritten with a `Tag` struct and plain loop; destructor define not needed).
- life-shallow-copy-pointer: done (Rule of Three name cut).
- life-shared-ptr-owners: done (`long` → `int`; life-unique-ptr-owns-trace edge dropped as not direct).
- life-temporary-full-expression: done (second overload and probe dropped; v3; full-expression is the target, not defined).
- life-unique-ptr-frees: changed (no define: smart-unique-ptr-intro teaches `unique_ptr<int>`; requires types-auto-deduces for the `auto` chip).
- life-unique-ptr-member-no-copy: changed (define skipped: it is the answer).
- life-unique-ptr-owns-trace: done.
- linkage-*: skipped (outside basics/01-08).
- ptr-amp-and-star-cloze: done ("unary" dropped instead of defined).
- ptr-arrow-null-check: changed (requires class-struct-members + constexpr-fn-static-assert; `const Rect*` → `Rect*`; UB term avoided in back).
- ptr-bump-by-reference: changed (constexpr-fn-static-assert required instead of define; const-no-modify reached through it).
- ptr-dangling-local: done.
- ptr-explain-parameter-forms: done; rubric in talk order.
- ptr-holds-an-address: changed (define is "`int*` is Go's `*int`"; defining `&n` would leak the answer; "object" → "variable").
- ptr-nullptr-overload: changed (requires std-names-and-headers too; C string defined; NULL/nullptr_t trivia cut).
- ptr-pointer-param-meaning: done.
- ptr-reference-must-bind: done.
- ptr-trace-arithmetic: changed (`long gap` → `int gap`).
- types-auto-drops-const: changed (no split; `decltype(auto)` chip → `const auto&`; top-level const explained in back as the target).
- types-brace-checks-constant: changed (answer `short` → `int`, short untaught; v2; `-Wnarrowing` cut).
- types-enum-no-int: done.
- types-mixed-sign-compare: done (flags and `std::cmp_less` cut; now requires only types-usual-arithmetic-conversions, which reaches the rest).
- types-overflow-rules: done (modulo not defined: it is the answer).
- types-promotion-rule: changed (requires types-signed-unsigned-range, which teaches `unsigned char`; `short` dropped from front).
- types-static-cast-value: changed (`long` and functional-cast chips replaced by late-conversion distractors).
- types-uninit-local-read: done (stack/static asides cut instead of defined).
- vc-classify-cloze: changed (no split, ≤ 3 items; requires expr-increment-value instead of a define that would give c2/c3 away).
- vc-named-rvalue-ref-is-lvalue: done (vc-classify-cloze edge now redundant).
- vc-param-binding-no-extension: done.
- vc-plain-ref-rejects-temporary: done (also requires iter-string-sequence for `std::string`).
- vc-trace-extended-temporary: changed (define skipped: life-temporary-full-expression teaches `Probe{}`).
- virtual-delete-through-base: changed (vector member → `int*` + `~Reverb`, `override` dropped; requires class-default-delete-where for the `= default` fix).
- virtual-dispatch-which-runs: changed (`const`, `override` and the destructor dropped from the code, so no defines and no class-default-delete-where).
- virtual-enable-dispatch: changed (`input: type`, so no undefined distractor keywords; requires const-member-on-const-ref).
- virtual-is-a: done.
- virtual-override-mismatch: done.
- virtual-pure-syntax: done (requires virtual-delete-through-base).
- virtual-slice-parameter: changed (`int corners()` instead of strings, no override/destructor; v2).
- Not in plan, also changed: virtual-function-intro (step table on front per §3.1(a)), class-default-member-initialiser (probe cut to 2 values; v2), life-ctor-dtor-count (shrunk to ≤ 8 state changes; v2), class-member-function-this (belief on front), fn-default-argument (requires constexpr-fn-static-assert), life-misconception-shared-to-be-safe (`const` member dropped), `: public` spelled out in 08.
