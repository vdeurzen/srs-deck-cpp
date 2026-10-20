# Novice audit: cpp-essentials/topics/basics (147 Cards)

Persona: knows variables, loops, functions, arrays; nothing else unless a `requires` chain taught it.
Tags used below (each defined once in the Summary): [obj] [std] [vector] [string] [auto] [cfn] [struct]
[iter] [heap] [ub] [ptr] [signed] [cast] [lambda] [smart] [exc] [assert] [tmpl] [dtor] [byval] [arrow] [consts] [cout] [member-init] [defdel].
Trace Cards are being rebuilt concurrently; they are audited as found.

## types-auto-drops-const
- `auto` (the topic itself; no Card teaches it) → NEW [auto]: `auto x = e;` deduces x's type from e
- `constexpr int countdown()` function → NEW [cfn]
- `const int limit` → MOVE cpp-basics/const-no-modify (req: none)
- `auto&` / reference → REQUIRE cpp-essentials/ptr-reference-must-bind
- "top-level const" → DEFINE: the `const` on the object itself, not on what a pointer/reference refers to
- `decltype(auto)` (back only) → DEFINE or cut from back
- 4 new ideas at once (auto, top-level const, reference, constexpr function); split.

## types-brace-checks-constant
- `constexpr short small{code}` → REQUIRE cpp-essentials/const-vs-constexpr-initializer
- `short`, `unsigned char`, `bool`, "at least 16 bits" → MOVE cpp-basics/types-size-minimums (req: none)
- `T x{v}` brace initialisation syntax never introduced → DEFINE: braces initialise a variable and refuse conversions that lose value
- "quietly stored 44" (wrap modulo 256) → REQUIRE cpp-essentials/types-overflow-rules
- `-Wnarrowing` → DEFINE: [warning flags] a compiler option that prints a warning

## types-cstyle-reinterprets
- `1.5f` → DEFINE: `f` suffix makes a `float` literal
- `(int)d`, `(int*)&f` C-style cast notation → DEFINE: `(T)x` is the C spelling of a cast
- `reinterpret_cast` → TOO ADVANCED: belongs after the sprint with object representation and aliasing; remove with types-reinterpret-cast-intro

## types-enum-no-int
- `enum`, `enum class` → DEFINE: an enum names a small set of integer constants; `enum class` keeps them scoped
- `static_cast<int>` (back) → REQUIRE cpp-essentials/types-static-cast-value
- implicit conversion → DEFINE: the compiler converting a value without being asked

## types-mixed-sign-compare
- signed vs `unsigned`, "wraps -5 modulo 2^32" → NEW [signed]
- `-Wall`, `-Wsign-compare` → DEFINE: [warning flags]
- `std::cmp_less` (C++20, back) → DEFINE: library function that compares ints safely, or cut

## types-overflow-rules
- `unsigned`/signed, "N bits wide" → NEW [signed]; MOVE cpp-basics/types-size-minimums
- "modulo 2^N" → DEFINE: wraps to the remainder after dividing by 2^N
- `UINT_MAX` → DEFINE: the largest unsigned int value
- "undefined behaviour" is the cloze answer yet undefined here → REQUIRE cpp-essentials/ub-definition [ub]

## types-promotion-rule
- `char`, `short`, `unsigned char` → MOVE cpp-basics/types-size-minimums
- "stored back into a narrow variable" cuts the value → DEFINE: narrowing keeps only the low bits

## types-reinterpret-cast-intro
- `reinterpret_cast<const unsigned char*>` → TOO ADVANCED: byte-level inspection of an object, needs object representation and aliasing rules; move out of the sprint Decks
- `auto* bytes` → NEW [auto]
- `const unsigned char*` → REQUIRE cpp-essentials/const-pointer-read-rule
- `1.5f` → DEFINE: `f` makes a `float`
- 3+ new ideas: reinterpret, byte aliasing, pointer-to-const.

## types-static-cast-value
- `static_cast<double>(x)` is the blank but never introduced → NEW [cast]: basic "`static_cast<T>(e)` converts the value e to type T" before this code Card
- `constexpr int hits = 3, shots = 4;` and `constexpr double` → REQUIRE cpp-essentials/const-vs-constexpr-initializer
- integer division `3 / 4 == 0` → DEFINE: dividing two ints discards the remainder

## types-uninit-local-read
- "undefined behaviour" → REQUIRE cpp-essentials/ub-definition [ub]
- "stack", "indeterminate", "static storage duration" → DEFINE: static storage = globals/`static`, alive for the whole run; stack = where locals live
- `int evens{}` (back) → DEFINE: empty braces zero-initialise

## ptr-amp-and-star-cloze
- "object" → NEW [obj]
- unary `&`, unary `*` → DEFINE: unary = one operand (as opposed to binary `*` multiply)

## ptr-bump-by-reference
- `constexpr void bump(...)` → NEW [cfn]
- "by value (`int n`) increments its own copy" → MOVE cpp-basics/ptr-trace-by-value (req: none) [byval]
- `const int&` forbids writes (back) → MOVE cpp-basics/const-no-modify [consts]

## ptr-dangling-local
- local variable dies when the function returns → REQUIRE cpp-essentials/life-scope-automatic
- "undefined behaviour" → REQUIRE cpp-essentials/ub-definition [ub]
- "stack slot", `-Wreturn-local-addr` → DEFINE: stack = where locals live; flag = [warning flags]
- function returning a pointer `int* larger(int, int)` → ok once [ptr]; DEFINE: the returned value is the address of `m`

## ptr-explain-parameter-forms
- `nullptr`, null-dereference UB → REQUIRE cpp-essentials/ptr-nullptr-overload, cpp-essentials/ub-definition [ub]
- `->` → MOVE cpp-basics/ptr-arrow-null-check [arrow]

## ptr-holds-an-address
- `&n`, `int*`, `*p` all appear before any are defined (entry Card) → DEFINE: `&n` = address of n; `int*` = pointer to int; `*p` = the thing p points at
- "object" → NEW [obj]

## ptr-nullptr-overload
- "null pointer" itself never taught → DEFINE: a null pointer points at no object
- `pick(const char*)`, C string, `"no string at all"` → DEFINE: a string literal is a `const char*` to characters ending in `'\0'`
- overloads, `static_assert(pick(...) == 2)`, `constexpr int pick` → REQUIRE cpp-essentials/fn-overload-ranking (present); NEW [cfn]
- `NULL`, `__null`, "implementation-defined", `std::nullptr_t` (back) → DEFINE: implementation-defined = the compiler/library chooses
- 3+ ideas: overload ranking, null pointers, C strings.

## ptr-pointer-param-meaning
- `s->`, `*s` → MOVE cpp-basics/ptr-arrow-null-check [arrow]
- "header declares" → ok after cpp-essentials/linkage-include-is-paste; DEFINE: a header is a file of declarations

## ptr-reference-must-bind
- `int* p;` pointer → REQUIRE cpp-essentials/ptr-holds-an-address
- reference never defined before the question → DEFINE: `int& r = a;` makes r another name for a
- "null" → DEFINE: pointer pointing at nothing

## ptr-trace-arithmetic
- `p += 2`, `p + 2`, `q - p`, `p[1]` pointer arithmetic taught nowhere before this trace → MOVE cpp-basics/ptr-arith-counts-elements (req: cpp-essentials/ptr-array-name-to-pointer)
- `long gap` → DEFINE: `long` is a wider integer type

## const-explain-signatures
- `const` variable rubric item → MOVE cpp-basics/const-no-modify and cpp-basics/const-needs-initializer [consts]
- "member function" trailing const → covered by const-member-on-const-ref once [struct]

## const-fixed-pointer
- `constexpr int fill_three()`, `static_assert` harness → NEW [cfn]
- `int buf[3]{}` empty-brace zero init → DEFINE: `{}` zero-fills
- `int* const out = buf;` array-to-pointer → REQUIRE cpp-essentials/ptr-array-name-to-pointer
- 3 ideas: const placement, array decay, zero-init.

## const-loop-chunk
- `std::vector<std::string>`, `.size()` → NEW [vector]; MOVE cpp-basics/iter-string-sequence [string]
- `std::size_t` → DEFINE: unsigned type for sizes and counts
- range-for `for (const auto& name : names)` → REQUIRE cpp-essentials/iter-range-for-alias
- `#include`/`std::` → NEW [std]

## const-member-on-const-ref
- `struct Rect { int w, h; int size() {...} }`, member function, `r.size()` → NEW [struct]; MOVE cpp-basics/class-member-function-this
- `const` itself → MOVE cpp-basics/const-no-modify [consts]

## const-pointer-read-rule
- `char` (the first type in the Card) → DEFINE: `char` is a one-byte integer holding a character code

## const-ref-parameter
- `const std::string&`, `std::string` → MOVE cpp-basics/iter-string-sequence [string]
- `const` → MOVE cpp-basics/const-no-modify [consts]
- range-for `for (char ch : text)` → REQUIRE cpp-essentials/iter-range-for-alias
- `constexpr int` function → NEW [cfn]
- "temporary string can still be passed" → DEFINE: a temporary is an unnamed value that dies at the end of the statement
- `const std\::string&` blank has `std::` → NEW [std]

## const-vs-constexpr-initializer
- `const int a`: `const` never taught before this → MOVE cpp-basics/const-no-modify (req: none)
- "compile time" vs "run time" → DEFINE: compile time = while the compiler builds the program; run time = while it executes
- `int read_port();` bodiless function → DEFINE: declared here, defined elsewhere
- two new ideas at once (const, constexpr) for an entry Card.

## fn-declaration-vs-definition
- `main`, `.cpp` file → DEFINE: `main` is where the program starts; a `.cpp` file is one source file the compiler reads

## fn-overload-ranking
- "overload" (two functions, one name) never defined → DEFINE: functions may share a name if parameter types differ
- `short`, `long` → MOVE cpp-basics/types-size-minimums
- promotion vs conversion → REQUIRE cpp-essentials/types-promotion-rule
- `short{2}` → DEFINE: `T{v}` makes a temporary T value
- 3 ideas: overloading, ranking, promotion.

## fn-return-by-value
- `std::string`, `s += '!'` → MOVE cpp-basics/iter-string-sequence [string]
- `const char* word` → DEFINE: a C string literal type
- `constexpr std::string` and "constant evaluation catches the read" → NEW [cfn]
- "moved or elided" → DEFINE: no character copy is made, or cut from back
- `#include <string>` → NEW [std]

## class-const-object-call
- `struct Doc` with two same-named functions, one `const` → REQUIRE cpp-essentials/fn-overload-ranking (overloading) and [struct]
- `const Doc& cd = d;`, `int main()`, global `std::string seen` log → MOVE cpp-basics/iter-string-sequence [string]
- `std::vector::operator[]` in back → DEFINE or drop
- instrumentation machinery plus 3 ideas (const overload, const reference, string log); shrink to ints.

## class-constructor-intro
- `class`, `public:`, member function declarations, "members" → NEW [struct]
- `Car c(90);` → DEFINE: creates a Car, passing 90 to the constructor

## class-default-ctor-restore
- `Size() = default;` (the blank) → MOVE cpp-basics/class-default-delete-where [defdel]
- default member initialisers `int w = 0, h = 0;` → MOVE cpp-basics/class-default-member-initialiser [member-init]
- "default constructor" → DEFINE: a constructor callable with no arguments
- `constexpr` constructor → NEW [cfn]

## class-delete-copy
- `= delete` → MOVE cpp-basics/class-default-delete-where [defdel]
- `explicit` (back) → REQUIRE cpp-essentials/class-explicit-constructor
- copy assignment `operator=` (back) → DEFINE: `t2 = t1;` on an existing object calls `operator=`
- `#include <type_traits>` noise → drop

## class-explain-construction
- default member initialiser → MOVE cpp-basics/class-default-member-initialiser [member-init]
- "indeterminate" → REQUIRE cpp-essentials/types-uninit-local-read

## class-explicit-blocks-conversion
- "implicit conversion": `heat(21.5)` compiles by a converting constructor → MOVE cpp-basics/class-converting-constructor (req: cpp-essentials/class-constructor-intro)

## class-init-list-required
- member initialiser list syntax `: engine_(hp)` first appears in the front itself (Engine) → NEW [member-init]: basic "a constructor initialises members with `: m(args)` before its body"
- `constexpr` constructor → NEW [cfn]
- `engine_` underscore, a member of class type → DEFINE: trailing `_` marks a data member

## class-init-list-vs-body
- `Name& operator=(const char*)`, `return *this` → DEFINE: user-written assignment operator; `*this` = the object called on; MOVE cpp-basics/class-member-function-this
- `std::string trail` global log with `+=` → MOVE cpp-basics/iter-string-sequence [string]
- converting constructor `Name(const char*)` from `"bob"` → MOVE cpp-basics/class-converting-constructor
- 4 ideas (default ctor, converting ctor, operator=, log); shrink.

## class-invariant-who-checks
- "invariant" defined only in a code comment → DEFINE: a condition every method may rely on and must preserve
- `private`/`public` → DEFINE: private members are usable only by the class's own member functions
- `friend` (back) → DEFINE or cut
- `int size() const` → REQUIRE cpp-essentials/const-member-on-const-ref

## class-struct-vs-class
- `struct`, `class`, members, `p.x` → NEW [struct]
- `private` meaning → DEFINE: only member functions of the class may touch it
- `Pixel p;` uninitialised member → fine

## life-copy-ctor-param
- "copy constructor" → DEFINE: the constructor that builds a new object from an existing one of the same type
- member initialiser list `: n(v)` → REQUIRE cpp-essentials/class-init-list-required
- default member initialiser `int copies = 0` → MOVE cpp-basics/class-default-member-initialiser
- `Tally&&`, "implicit copy constructor deleted" (back) → REQUIRE cpp-essentials/vc-rvalue-ref-binds-temporaries or cut
- `constexpr` → NEW [cfn]

## life-copy-init-not-assign
- "copy constructor", "copy assignment operator" never defined → DEFINE: copy ctor builds a new object from another; copy assignment overwrites an existing one
- `Account a{"alice"}` → REQUIRE cpp-essentials/class-constructor-intro

## life-copy-which-runs
- `Note& operator=(const Note&)`, `return *this` → DEFINE (see class-init-list-vs-body)
- `void file(Note)` by-value parameter makes a copy → MOVE cpp-basics/ptr-trace-by-value [byval]
- global counters + `++copies` machinery; keep, but state the counter idea in the front

## life-delete-matches-new
- `new int{5}`, `new int[5]{}`, `delete`, "heap" → NEW [heap]
- `delete[]` → taught here; ok after [heap]
- UB on mismatch → REQUIRE cpp-essentials/ub-definition [ub]

## life-destructor-frees
- RAII (back) → DEFINE: RAII = acquire in the constructor, release in the destructor
- `explicit IntBuf(int n)`, member init `data(new int[n]{})` → REQUIRE cpp-essentials/class-init-list-required; REQUIRE cpp-essentials/class-explicit-constructor
- `constexpr ~IntBuf()`, "constexpr evaluation rejects the leak" → NEW [cfn]
- `std::free`, `malloc` → DEFINE: C's allocation functions
- "leak" → DEFINE: memory never released
- 3+ ideas: destructor, `delete[]`, RAII.

## life-destructor-intro
- "scope", `Logger log;` → REQUIRE cpp-essentials/life-scope-automatic
- constructors → REQUIRE cpp-essentials/class-constructor-intro (present)

## life-make-unique
- `std::make_unique<Point>(2, 5)` never shown before; the blank is an unseen function → NEW [smart]: basic on `unique_ptr` and `make_unique`
- `p->x` → MOVE cpp-basics/ptr-arrow-null-check [arrow]
- `struct Point { int x, y; }` aggregate; `auto p` → NEW [struct], NEW [auto]
- "leak", "raw `new`" → REQUIRE cpp-essentials/life-delete-matches-new

## life-misconception-shared-to-be-safe
- `std::shared_ptr`, `make_shared`, "shared count" → NEW [smart]: basic on `shared_ptr` before the trace
- `lexer->pos` → MOVE cpp-basics/ptr-arrow-null-check [arrow]
- default member initialiser `= std::make_shared<Lexer>()` → MOVE cpp-basics/class-default-member-initialiser

## life-new-outlives-scope
- `new Box`, `delete kept`, "dynamic storage duration", "heap" → NEW [heap] (worked basic before the trace)
- `Box* kept = nullptr;` → REQUIRE cpp-essentials/ptr-holds-an-address, cpp-essentials/ptr-nullptr-overload
- "leak" → DEFINE: object never destroyed
- `-fsanitize=address` in back → DEFINE or drop

## life-reverse-order-trace
- `Tag(char ch) : c(ch)` init list → REQUIRE cpp-essentials/class-init-list-required
- `Tag first{'1'}` brace default member initialiser → MOVE cpp-basics/class-default-member-initialiser
- `std::string seq; seq += c;` → MOVE cpp-basics/iter-string-sequence [string]
- char literals `'x'` → DEFINE: single-quoted = one `char`
- 4+ ideas (member order, init list, destructor body order, string log); too much.

## life-scope-automatic
- `std::vector<int>`, `std::string`, `std::to_string`, range-for, `const std::vector<int>&` as stage dressing → NEW [vector]; MOVE cpp-basics/iter-string-sequence; REQUIRE cpp-essentials/iter-range-for-alias; or rewrite with ints and a `struct`
- "runs its destructor" → REQUIRE cpp-essentials/life-destructor-intro? (it requires class-constructor-intro only) or DEFINE: a destructor is a function run automatically when an object dies
- Entry Card combining 4 new library things.

## life-shallow-copy-pointer
- "compiler-generated copy constructor copies each member" → DEFINE
- `explicit` → REQUIRE cpp-essentials/class-explicit-constructor
- "undefined behaviour" → REQUIRE cpp-essentials/ub-definition [ub]
- "Rule of Three" (back) → DEFINE: if a class needs a custom destructor it needs copy ops too; or cut
- `IntBuf a{8};` → ok

## life-shared-ptr-owners
- `std::shared_ptr<Doc>`, `make_shared`, `use_count()`, `a = nullptr` → NEW [smart]: shared_ptr worked basic before this trace
- `long owners` → DEFINE: wider integer
- `#include <memory>` absent → NEW [std]

## life-temporary-full-expression
- `Probe{}` as expression, "temporary", "full-expression" → DEFINE: `T{}` makes an unnamed object; full-expression = the whole statement to its `;`
- overloaded `peek(const Probe&)` vs two-argument form → extra machinery; drop second overload

## life-unique-ptr-frees
- `std::unique_ptr<int> p{new int{x}}`, `*p` → NEW [smart] (unique_ptr is met only inside a trace before this)
- `constexpr int scaled` and "constexpr evaluation rejects the leak" → NEW [cfn]
- "template argument is the pointed-to type" → DEFINE: `<int>` inside angle brackets picks the type

## life-unique-ptr-member-no-copy
- "copy constructor is deleted" implicitly → DEFINE: if a member cannot be copied, the compiler-written copy constructor is deleted
- default member initialiser `= std::make_unique<Engine>()` → MOVE cpp-basics/class-default-member-initialiser

## life-unique-ptr-owns-trace
- `std::unique_ptr<Lamp> owned{new Lamp}` → NEW [smart] (no worked example)
- `Lamp* raw = new Lamp;` → NEW [heap]
- "AddressSanitizer reports ... leaked" (back) → DEFINE or drop

## vc-classify-cloze
- `n++` vs `++n` → DEFINE: `n++` yields n's old value as a temporary; `++n` yields n itself
- `*p` as lvalue → REQUIRE cpp-essentials/ptr-amp-and-star-cloze (via lvalue card; ok)
- 3 forms in one blank series: deref, postfix, prefix; split.

## vc-named-rvalue-ref-is-lvalue
- `std::move(t)` (back) → REQUIRE cpp-essentials/value-categories-std-move-cloze or DEFINE: `std::move(x)` casts x to an rvalue
- `std::string` → MOVE cpp-basics/iter-string-sequence [string]

## vc-param-binding-no-extension
- `-Wdangling-reference` → DEFINE: [warning flags]
- `std::string("abc")` temporary, `const std::string&` → MOVE cpp-basics/iter-string-sequence [string]

## vc-plain-ref-rejects-temporary
- `shout("hey")` converting string literal to `std::string` → MOVE cpp-basics/class-converting-constructor
- `std::string` → MOVE cpp-basics/iter-string-sequence [string]

## vc-trace-extended-temporary
- 4 probes (limit 3) and 3 lifetime ideas (full-expression, extension, inner scope) → drop `inner` block and probe @4
- `Probe{};` expression statement → DEFINE: creates and immediately discards a temporary

## virtual-construct-order
- `struct Car : Vehicle` inheritance → REQUIRE cpp-essentials/virtual-is-a (present)
- `std::string seq`, `seq += "~V"` → MOVE cpp-basics/iter-string-sequence [string]

## virtual-delete-through-base
- destructor, `delete p` → REQUIRE cpp-essentials/life-destructor-intro, cpp-essentials/life-delete-matches-new [dtor] [heap]
- `override`, `virtual void run() {}` → DEFINE: `override` = this replaces a base virtual
- `std::vector<float> samples` → NEW [vector]
- "undefined behaviour" → REQUIRE cpp-essentials/ub-definition [ub]
- 3+ ideas: virtual destructor, delete via base pointer, member destruction.

## virtual-dispatch-which-runs
- `virtual` keyword first used inside this trace; no worked intro → NEW: basic "a `virtual` function is chosen by the object's actual type at run time"
- `override`, `virtual ~Sensor() = default;` → DEFINE; MOVE cpp-basics/class-default-delete-where [defdel]
- trailing `const` on methods → REQUIRE cpp-essentials/const-member-on-const-ref

## virtual-enable-dispatch
- `constexpr` member function → NEW [cfn]
- `final` (back), `inline`, `explicit` as distractors → DEFINE or trim back

## virtual-is-a
- inheritance `struct Car : public Vehicle`, "base-class subobject" → DEFINE: `: public B` means Car contains and extends B; a `Car&` converts to `B&`
- `Vehicle&` reference parameters → REQUIRE cpp-essentials/ptr-reference-must-bind
- `struct`, members → NEW [struct]
- 3 ideas at once.

## virtual-override-mismatch
- `virtual ~Account() = default;` in front before virtual destructors are taught → REQUIRE cpp-essentials/virtual-delete-through-base or delete from snippet
- `override` → taught in back; DEFINE in front
- `float` vs `double` → MOVE cpp-basics/types-size-minimums

## virtual-pure-syntax
- `virtual ~Shape() = default;` unexplained → delete from snippet or REQUIRE cpp-essentials/virtual-delete-through-base
- `Shape s;` abstract → ok

## virtual-slice-parameter
- by-value parameter copies → MOVE cpp-basics/ptr-trace-by-value [byval]
- `override`, destructor line, `std::string name() const` → DEFINE; MOVE cpp-basics/iter-string-sequence

## tmpl-concept-error
- `x >> 1` → DEFINE: shifts bits right; integers only
- `std::integral` → covered by concept-intro

## tmpl-concept-intro
- `#include <concepts>` → NEW [std]
- `7u` → DEFINE: `u` suffix = unsigned
- `half(7.0)` → ok

## tmpl-constrained-auto
- `auto` parameter and `constexpr auto` return → NEW [auto]; MOVE cpp-basics/tmpl-auto-param-cloze
- `short`, `long long`, `unsigned` → MOVE cpp-basics/types-size-minimums
- 3 ideas: abbreviated template, constrained auto, return deduction.

## tmpl-deduction-conflict
- "deduce" → DEFINE: the compiler infers `T` from the arguments' types

## tmpl-definition-in-header
- `template int twice<int>(int);` explicit instantiation (back) → DEFINE: forces the compiler to generate that instantiation here
- `twice.h`/`twice.cpp` split → REQUIRE cpp-essentials/linkage-translation-unit (via chain: ok)
- 3 ideas: header/source split, instantiation, linker error.

## tmpl-distinct-types
- `template <typename T> struct Box { T value; }` class template → MOVE cpp-basics/tmpl-class-member-type
- `Box<int> small{3}` aggregate braces → MOVE cpp-core/initialization-aggregate-braces (req: cpp-essentials/class-struct-vs-class)
- `const Box<long>&` → ok after [ptr]/references

## tmpl-error-at-instantiation
- `struct Point { int x, y; }; Point p{1,2}` aggregate braces → NEW [struct]; MOVE cpp-core/initialization-aggregate-braces
- "instantiation", "required from here" → DEFINE: instantiation = the compiler writing out the template for a concrete type
- operators on user types (`<` on `Point`) → DEFINE

## tmpl-explicit-argument
- `constexpr auto r` → NEW [auto], NEW [cfn]
- `maximum<double>(1, 2.1)` → covered in back

## tmpl-function-syntax
- templates never motivated before this code Card; no worked example → MOVE cpp-basics/tmpl-why-template (req: none) [tmpl]
- `constexpr T larger`, ternary → NEW [cfn]

## tmpl-instantiation-statics
- 5 probes (limit 3) and 3 template instantiations → cut to 3 calls, 2 probes
- `static int calls = 0;` function-local static → DEFINE: initialised once, kept between calls
- `int tick(T)` unnamed parameter → DEFINE
- "template is a recipe for functions" → MOVE cpp-basics/tmpl-why-template [tmpl]

## iter-at-checks-bounds
- `std::vector<int> v{4, 5, 6}`, `v.at(3)`, `v[3]` → NEW [vector]
- `try`/`catch`/`std::out_of_range` → REQUIRE cpp-essentials/err-throw-jumps-to-catch (present)
- "undefined behaviour" → REQUIRE cpp-essentials/ub-definition [ub]

## iter-end-one-past
- `std::vector`, `v.end()`, iterator, `begin()` → NEW [vector], NEW [iter]
- `*v.end()` UB → REQUIRE cpp-essentials/ub-definition [ub]

## iter-explain-vector-growth
- `push_back` → NEW [vector]
- "dangle", "undefined behaviour" → REQUIRE cpp-essentials/ub-definition [ub]
- "moves or copies the elements" → DEFINE: move = steal contents; copy = duplicate

## iter-growth-invalidates
- `auto it = v.begin() + 1`, `it[0]` → NEW [iter]; NEW [auto]
- `std::vector<int> v{5,6,7}`, `push_back` → NEW [vector]
- `constexpr int remembered()`, "compile error in a constant expression" → NEW [cfn]

## iter-map-find-or-default
- `std::unordered_map<std::string,int>` → NEW: basic "`std::unordered_map<K,V>` is a hash map (Go `map[K]V`): `m[k]`, `find`, `end()`"
- `it->second`, `it->first`, `prices.end()` → MOVE cpp-basics/ptr-arrow-null-check [arrow]; DEFINE: element is a key/value pair
- `std::string` → MOVE cpp-basics/iter-string-sequence [string]
- ternary `? :` → DEFINE: `c ? a : b` is an inline if

## iter-map-subscript-inserts
- `std::unordered_map`, `counts[w]` → NEW (same as above)
- `for (const std::string& w : words)` range-for → REQUIRE cpp-essentials/iter-range-for-alias
- "value-initialised" → DEFINE: ints start at 0
- `words` undefined → DEFINE: `words` is a `std::vector<std::string>`

## iter-range-for-alias
- range-for syntax, "initialised from `*it`" → DEFINE: `for (T x : v)` visits each element; NEW [iter]
- `std::vector<int> v{1,2,3}` → NEW [vector]
- `constexpr int doubled_sum()` → NEW [cfn]

## iter-reserve-keeps-buffer
- `reserve`, `v.data()`, "buffer" → DEFINE: reserve(n) allocates room for n elements without adding any; data() is a pointer to the first element
- `const int* buf` pointer compare → REQUIRE cpp-essentials/ptr-holds-an-address
- `auto n0` → NEW [auto]

## iter-size-vs-capacity
- `std::vector<int>`, `push_back`, "buffer", "allocate" → NEW [vector] (entry Card; needs the vector idea first)
- `v[5]` out of range → ok

## stdalgo-accumulate-init
- `std::accumulate(v.begin(), v.end(), 0.0)`, `#include <numeric>` → DEFINE: algorithms take a begin/end iterator pair; NEW [iter]
- `std::vector<double>` → NEW [vector]
- `constexpr double total()` → NEW [cfn]

## stdalgo-capture-ref-vs-copy
- `auto record = [&hits] { ++hits; };` → NEW [auto]
- `mutable` (back) → DEFINE: lets a by-copy capture be modified

## stdalgo-comparator-strict
- "comparator" → REQUIRE cpp-essentials/stdalgo-sort-by-length (present)
- `static_assert`, `constexpr auto le = [...]` → NEW [cfn]
- UB → REQUIRE cpp-essentials/ub-definition [ub]
- `std::sort(v.begin(), v.end(), ...)` → covered by sort-by-length only after it; add MOVE of a sort worked basic

## stdalgo-erase-if
- "predicate" → DEFINE: a function returning bool
- `std::size_t` → DEFINE: unsigned size type
- `std::erase`, member `v.erase` (back) → DEFINE or cut

## stdalgo-find-if-not-found
- `std::find_if` → MOVE cpp-basics/stdalgo-find-vs-find-if (req: stdalgo-lambda-syntax, iter-end-one-past)
- `*it` dereference, `it != v.end() ? *it : 0` → DEFINE: ternary; NEW [iter]
- nullptr comparison (back) → ok

## stdalgo-lambda-syntax
- lambda itself never introduced; the blank requires knowing the form → NEW [lambda]: worked basic "a lambda is an unnamed function `[captures](params){body}`"
- `auto add_step = ...` → NEW [auto]
- `constexpr int apply_twice()` → NEW [cfn]
- "capture" → DEFINE: variables from the enclosing function the lambda keeps

## stdalgo-remove-if-keeps-size
- `std::remove_if` unseen; no worked example → NEW: basic "`remove_if` shifts kept elements to the front and returns the new end; it cannot shrink the vector"
- `keep_end - v.begin()` iterator difference → NEW [iter]
- `auto` → NEW [auto]
- 4 ideas (lambda predicate, algorithm on iterators, iterator subtraction, unspecified tail).

## stdalgo-sort-by-length
- `std::string_view` → DEFINE: non-owning view of characters; use `std::string` or `int` instead
- `std::sort(begin, end, comp)` never introduced → NEW: basic on sort and comparator
- `constexpr bool` function with string literals → NEW [cfn]

## stdalgo-transform-back-inserter
- `std::transform` and "output iterator" → NEW: basic "transform writes f(x) for each input through an output iterator"
- `std::back_inserter` (the blank) → DEFINE: output iterator that calls push_back
- UB writing past the end → REQUIRE cpp-essentials/ub-definition [ub]
- `std::vector` → NEW [vector]

## err-assert-vanishes-ndebug
- `assert`, `NDEBUG`, "macro", "debug/release build" → NEW [assert]: basic "assert(cond) aborts if cond is false; builds defining NDEBUG remove it"
- `cfg.is_open()` → DEFINE: file stream open test
- 3 ideas at once (assert, macro, build types).

## err-catch-by-reference-why
- `std::runtime_error`, `std::exception`, `e.what()` → DEFINE: standard exceptions derive from `std::exception`; `what()` returns the message
- "implementation-defined", "libstdc++" → DEFINE: [impl-defined] and libstdc++ = GCC's standard library

## err-channel-assert-bug
- "precondition" → DEFINE: what the caller must guarantee before calling
- `assert` → ok via requires

## err-channel-return-value
- `std::optional<User>` → REQUIRE cpp-essentials/vocab-optional-maybe-value
- "channel" → DEFINE: [channel] the way a function reports failure: return value, exception, or assert

## err-explain-failure-paths
- "`std::vector` choosing to move" → DEFINE: move = steal contents; or cut item

## err-first-matching-handler
- `std::string("net ") + e.what()` → DEFINE: concatenation
- inherited constructors `using NetError::NetError` → ok via err-own-exception-type comment
- 4 ideas (hierarchy, inherited ctors, handler order, concat).

## err-no-handler-terminates
- "implementation-defined" → DEFINE [impl-defined]
- "unwinding" in the back → REQUIRE cpp-essentials/err-unwind-runs-destructors? (cycle risk) so DEFINE

## err-noexcept-broken-promise
- `noexcept` never defined → DEFINE in front: `noexcept` promises the function never throws
- "`std::vector` deciding whether to move" → DEFINE: move
- `cache.clear()`, `log(...)` → DEFINE

## err-own-exception-type
- `using Base = std::runtime_error;` → DEFINE: type alias
- `using Base::Base;` → DEFINE (comment present)
- `#include <stdexcept>` → NEW [std]

## err-pick-a-channel
- "channel" → DEFINE [channel]

## err-throw-jumps-to-catch
- `throw`, `try`, `catch (const T&)` entry trace with no worked intro → NEW [exc]: basic "`throw` abandons the current function and lands in the nearest matching `catch`"
- `c - '0'`, `'0'..'9'` char arithmetic → DEFINE: a char is a number; `c - '0'` is the digit's value
- `std::string log; log += c;` → MOVE cpp-basics/iter-string-sequence [string]
- `std::invalid_argument` → DEFINE
- 4 ideas.

## err-unwind-runs-destructors
- destructor `~File()` → REQUIRE cpp-essentials/life-destructor-intro [dtor]
- `std::runtime_error`, `std::exception` → DEFINE
- `std::string events; events += 'o'` → MOVE cpp-basics/iter-string-sequence [string]

## linkage-extern-global-variable
- `extern` (the answer; first meeting) → DEFINE: extern declares a variable without defining it
- `inline int verbosity = 1;` (back) → REQUIRE cpp-essentials/linkage-inline-header-fix

## linkage-include-is-paste
- "preprocessor" → DEFINE: the step before compilation that handles `#` lines

## linkage-private-helper
- `namespace { ... }`, `static` at file scope → MOVE cpp-basics/fn-namespace-clash (req: none)
- "internal linkage" → DEFINE: name is private to its translation unit

## ub-optimiser-assumes-no-overflow
- `-O2` → DEFINE: ask the compiler to optimise
- `INT_MAX` → DEFINE: largest `int`; from `<climits>`
- signed overflow → REQUIRE cpp-essentials/types-overflow-rules (present)

## ub-passing-tests-prove-nothing
- "undefined behaviour" is the answer yet undefined; ub-definition requires this Card → DEFINE: UB = the language places no requirement on what the program does
- `std::cout << total;` → NEW [cout]: `std::cout << x` prints x
- array index out of bounds `scores[5]` → DEFINE: valid indices 0..4

## ub-sanitizer-flags
- "heap, stack" memory → NEW [heap]
- "use of freed memory" → REQUIRE cpp-essentials/ub-use-after-free
- `-fsanitize=...`, "compiler flag" → DEFINE [warning flags]

## ub-static-assert-finds-ub
- `static_assert`, `constexpr` function, constant evaluation → NEW [cfn] (all four ideas appear in one cloze)
- `const int* p`, `p[2]` pointer indexing → REQUIRE cpp-essentials/ptr-array-name-to-pointer
- `constexpr int two[] = {5, 6};` → DEFINE
- 4 ideas.

## ub-unsigned-countdown-trace
- `std::uint32_t` → DEFINE: exactly 32-bit unsigned
- `&&` → DEFINE: logical and
- 10 loop iterations (limit 4) → shrink: `steps < 3`
- `-Wextra` → DEFINE [warning flags]

## ub-use-after-free
- "undefined behaviour" → REQUIRE cpp-essentials/ub-definition [ub]
- `new int(7)` → DEFINE: parentheses initialise the new int to 7

## conc-atomic-or-mutex
- "lock-free", "blocks" → DEFINE: lock-free = no thread ever waits for another

## conc-check-then-act
- `compare_exchange_strong` (back) → DEFINE or cut: covered properly by cpp-essentials/atomics-compare-exchange-failure, not needed here
- "indivisible" → ok after single-counter-fix

## conc-data-race-one-writer
- UB → REQUIRE cpp-essentials/ub-definition [ub]
- `join` (back) → REQUIRE cpp-essentials/conc-join-waits-trace
- `std::atomic<int>` fix → REQUIRE cpp-essentials/conc-single-counter-fix

## conc-forgotten-join
- `std::cout << "bye\n"` → NEW [cout]
- `detach()` → DEFINE: lets the thread run on its own
- `std::thread writer(flush_cache);` → ok via thread-shares-memory

## conc-join-waits-trace
- ThreadSanitizer (back) → DEFINE or drop
- lambda `[&total] {...}` passed to `std::thread` → REQUIRE cpp-essentials/stdalgo-lambda-syntax (present via capture trace)
- 4 ideas (thread, lambda capture by ref, join, ordering).

## conc-lock-the-counter
- `std::lock_guard<std::mutex> hold(m);` → REQUIRE cpp-essentials/life-destructor-intro [dtor]; MOVE cpp-basics/tmpl-class-member-type (angle-bracket type argument)
- "guard refuses a temporary" and "declares a new guard called m" (back) → DEFINE or cut
- 3 ideas.

## conc-mutex-takes-turns
- "an exception cannot leave m locked" → DEFINE or REQUIRE cpp-essentials/err-throw-jumps-to-catch

## conc-single-counter-fix
- `std::atomic<int>` never introduced; an entry to atomics via a code blank → NEW: basic "`std::atomic<int>` is an int whose `++` is one indivisible step"
- `volatile`, `thread_local`, `shared_ptr`, stray `#include <memory>` (back/front) → DEFINE or cut
- data race → REQUIRE cpp-essentials/conc-data-race-one-writer

## conc-start-with-arguments
- "callable" → DEFINE: anything you can call with `()`
- lambda (back) → REQUIRE cpp-essentials/stdalgo-lambda-syntax

## conc-thread-argument-by-reference
- reference parameter `int& total` → REQUIRE cpp-essentials/ptr-bump-by-reference
- `std::cref` (back) → DEFINE or cut

## conc-thread-shares-memory
- `std::cout << score + local` → NEW [cout]
- `int main()` → DEFINE

## conc-waiting-destructor
- "destructor" → REQUIRE cpp-essentials/life-destructor-intro [dtor]


## Summary

Recurring gaps and the one remedy for each:
- [cfn] `constexpr` functions and `static_assert` (used by almost every `code` Card as the grader; ~40 Cards): NEW basic "a `constexpr` function can run at compile time; `static_assert(expr)` fails the build if expr is false", then REQUIRE it from the first code Card in each topic (or have all code Cards inherit it via types-static-cast-value).
- [std] `#include <...>` and the `std::` prefix: NEW basic "standard library names live in `std`; `#include <vector>` supplies them; `ns::name` is qualified lookup" (MOVE cpp-basics/fn-namespace-clash + fn-qualified-name).
- [vector] `std::vector<T>` (~14 Cards, first met in iter-size-vs-capacity, which lacks any intro): NEW basic "`std::vector<int> v{1,2,3}`: growable array; `push_back`, `size()`, `v[i]`, range-for", placed first in topic 10 and required by const-loop-chunk, life-scope-automatic, iter-*, stdalgo-*.
- [string] `std::string` and `s += c` used as a log in ~12 traces: MOVE cpp-basics/iter-string-sequence (req: none).
- [auto] `auto` (~12 Cards, never taught): NEW basic "`auto x = e;` deduces the type from e"; put before types-auto-drops-const.
- [iter] iterators (`begin()`, `end()`, `*it`, `++it`): NEW basic ahead of iter-end-one-past; REQUIRE it from iter-*/stdalgo-*.
- [ub] "undefined behaviour" used as vocabulary in ~20 Cards before it is defined: REQUIRE cpp-essentials/ub-definition (and give ub-passing-tests-prove-nothing a one-clause DEFINE, since ub-definition requires it).
- [struct] struct/class, members, `.`, member functions, `public`/`private`: NEW basic ahead of class-constructor-intro and class-struct-vs-class; MOVE cpp-basics/class-member-function-this.
- [heap] `new`/`delete`, heap vs stack: NEW basic ahead of life-new-outlives-scope and life-delete-matches-new.
- [smart] `unique_ptr`/`shared_ptr`/`make_*`: NEW worked basics ahead of the traces and code Cards that use them (met first inside traces).
- [signed] signed vs unsigned, bits, `short`/`long`: NEW basic + MOVE cpp-basics/types-size-minimums; ahead of types-overflow-rules.
- [dtor] REQUIRE cpp-essentials/life-destructor-intro in the 6 Cards using destructors undefined.
- [consts] `const` taught only inside const-vs-constexpr-initializer: MOVE cpp-basics/const-no-modify (+ const-needs-initializer).
- [arrow] `->`: MOVE cpp-basics/ptr-arrow-null-check; [byval] by-value copies: MOVE cpp-basics/ptr-trace-by-value; [defdel] `= default/= delete`: MOVE cpp-basics/class-default-delete-where; [member-init]: MOVE cpp-basics/class-default-member-initialiser; [tmpl] MOVE cpp-basics/tmpl-why-template.
- [exc] try/throw/catch has no worked intro (entry is a trace); [assert] assert/NDEBUG; [lambda] lambda syntax; [cout] `std::cout <<`; each needs one NEW intro basic.
- [warning flags], [impl-defined], [channel]: one DEFINE clause each wherever used.
- Over-loaded Cards (3+ new ideas, or trace limits broken): types-auto-drops-const, ptr-nullptr-overload, class-init-list-vs-body, life-reverse-order-trace, life-scope-automatic, vc-trace-extended-temporary (4 probes), tmpl-instantiation-statics (5 probes), ub-unsigned-countdown-trace (10 iterations), err-throw-jumps-to-catch, stdalgo-remove-if-keeps-size.

Audited 147 cards: 130 with gaps, 359 gaps total, 2 too advanced.
