---
id: chunks-monotonic-deque
kind: chunk
version: 1
level: 4
tags: [idioms, sliding-window, amortised]
expose_ms: 7000
compile:
  harness: |
    struct Dq {                          // constexpr stand-in for std::deque<int>
      int buf[16]{}; int head = 0, tail = 0;
      constexpr bool empty() const { return head == tail; }
      constexpr int front() const { return buf[head]; }
      constexpr int back() const { return buf[tail - 1]; }
      constexpr void push_back(int i) { buf[tail++] = i; }
      constexpr void pop_back() { --tail; }
      constexpr void pop_front() { ++head; }
    };
    constexpr bool windows() {
      const int a[8] = {1, 3, 3, 3, 2, 5, 4, 1};
      const int want[8] = {1, 3, 3, 3, 3, 5, 5, 5};   // max of the last 3
      Dq dq;
      for (int i = 0; i < 8; ++i)
        if (slide(dq, a, i, 3) != want[i]) return false;
      return dq.tail - dq.head == 3;                   // indices 5, 6, 7
    }
    static_assert(windows());
    constexpr bool no_duplicates() {
      const int a[4] = {7, 7, 7, 7};
      Dq dq;
      for (int i = 0; i < 4; ++i) slide(dq, a, i, 3);
      return dq.tail - dq.head == 1;                   // equal values evicted
    }
    static_assert(no_duplicates());
    constexpr bool expires() {
      const int a[4] = {9, 1, 1, 1};
      Dq dq;
      int last = 0;
      for (int i = 0; i < 4; ++i) last = slide(dq, a, i, 3);
      return last == 1;                                // the 9 left the window
    }
    static_assert(expires());
    int main() {}
requires:
  - heap-monotonic-deque
refs:
  - https://cp-algorithms.com/data_structures/stack_queue_modification.html
  - https://en.cppreference.com/w/cpp/container/deque
---

```cpp
constexpr int slide(auto& dq, const int* a, int i, int k) {
  while (!dq.empty() && a[dq.back()] <= a[i]) dq.pop_back();
  dq.push_back(i);
  if (dq.front() <= i - k) dq.pop_front();
  return a[dq.front()];
}
```

---

Sliding-window maximum, amortised O(1) per element. The deque holds
**indices** with strictly decreasing values: line 2 evicts what the
newcomer dominates (older *and* not larger — dead forever), line 4 drops
the front once it leaves the window, so the front is the maximum.

Indices, so the window test is arithmetic; `<=`, so equal values do not
pile up. Each index is pushed and popped once. Compile-checked: the
harness supplies a constexpr deque, since `std::deque` is not constexpr.
