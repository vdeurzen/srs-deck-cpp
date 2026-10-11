---
id: parsons-coroutine-generator-skeleton
kind: parsons
version: 2
level: 4
tags: [idioms, coroutines]
requires:
  - coroutines-generator-yield-value
  - coroutines-handle-operations
distractors:
  - "  Generator(const Generator&) = default;"
compile:
  harness: |
    template <typename T>
    struct Generator<T>::promise_type {
      T current;
      Generator get_return_object() {
        return Generator{std::coroutine_handle<promise_type>::from_promise(*this)};
      }
      std::suspend_always initial_suspend() noexcept { return {}; }
      std::suspend_always final_suspend() noexcept { return {}; }
      std::suspend_always yield_value(T v) { current = v; return {}; }
      void return_void() {}
      void unhandled_exception() { throw; }
    };
    #include <type_traits>
    static_assert(!std::is_copy_constructible_v<Generator<int>>);
    static_assert(!std::is_copy_assignable_v<Generator<int>>);
    static_assert(std::is_move_constructible_v<Generator<int>>);
    Generator<int> count_to(int n) {
      for (int i = 1; i <= n; ++i) co_yield i;
    }
    int main() {
      auto gen = count_to(3);
      int sum = 0;
      while (gen.next()) sum += gen.value();
      return sum == 6 ? 0 : 1;
    }
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle
  - https://eel.is/c++draft/class.copy.ctor#6
---

```cpp
#include <coroutine>
template <typename T> struct Generator {
  struct promise_type;  // defined after the class; yield_value stores into current
  std::coroutine_handle<promise_type> handle;
  explicit Generator(std::coroutine_handle<promise_type> h) : handle(h) {}
  Generator(Generator&& other) noexcept : handle(other.handle) { other.handle = {}; }
  ~Generator() { if (handle) handle.destroy(); }
  bool next() { handle.resume(); return !handle.done(); }  T value() const { return handle.promise().current; }
};
```

---

The owning half of a generator: the return type holds the frame's
`coroutine_handle`, destroys it exactly once, and gives the caller
`next()` (resume, then report `!done()`) and `value()` (read the
promise). The promise itself is the one from the `yield_value` Card.

The move constructor is the line that matters: it nulls the source, so
only one `Generator` ever calls `destroy()`, and declaring it makes the
copy constructor and copy assignment deleted. A defaulted copy would let
two owners destroy one frame. `std::generator<T>` (C++23) packages all of
this.
