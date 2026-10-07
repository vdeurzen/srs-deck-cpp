---
id: linear-sliding-window-code
kind: code
version: 1
level: 2
tags: [sliding-window, arrays]
requires:
  - linear-sliding-window-sum
input: chips
choices:
  c1: ["sum += a[i] - a[i - k];", "sum += a[i];", "sum += a[i] - a[i - k + 1];", "sum = a[i] - a[i - k];"]
compile:
  harness: |
    inline constexpr int kA[] = {2, 5, 1, 7, 4, 6, 3};
    static_assert(max_window(kA, 3) == 17);   // {7, 4, 6}
    static_assert(max_window(kA, 2) == 11);   // {7, 4}
    static_assert(max_window(kA, 1) == 7);
    static_assert(max_window(kA, 7) == 28);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Moving_average#Simple_moving_average
---

Return the largest sum of `k` consecutive elements. The first window is
summed directly; complete the slide.

```cpp
#include <span>

constexpr int max_window(std::span<const int> a, int k) {
  int sum = 0;
  for (int i = 0; i < k; ++i) sum += a[i];
  int best = sum;
  for (int i = k; i < (int)a.size(); ++i) {
    {{c1::sum += a[i] - a[i - k];}}
    if (sum > best) best = sum;
  }
  return best;
}
```

---

**Element `i` enters, element `i − k` leaves.** The window before the
step is `a[i−k .. i−1]` (k elements), so the one falling off is `a[i−k]`;
`a[i−k+1]` is still inside after the step.

One add and one subtract per element: O(n) for every `k`.
