---
id: parsons-sift-down
kind: parsons
version: 2
level: 3
tags: [heaps, arrays, invariants]
distractors:
  - "if (right < n && h[right] > h[i]) largest = right;"
  - "{ const int t = h[i]; h[i] = h[left]; h[left] = t; }"
compile:
  harness: |
    #include <array>
    constexpr std::array<int, 7> heapify(std::array<int, 7> a) {
      for (int i = 7 / 2 - 1; i >= 0; --i) sift_down(a.data(), 7, i);
      return a;
    }
    static_assert(heapify({3, 1, 6, 5, 2, 4, 7}) == std::array<int, 7>{7, 5, 6, 1, 2, 4, 3});
    static_assert(heapify({1, 2, 3, 4, 5, 6, 7}) == std::array<int, 7>{7, 5, 6, 4, 2, 1, 3});
    int main() {}
requires:
  - heap-array-layout
refs:
  - https://en.cppreference.com/w/cpp/algorithm/make_heap
  - https://en.wikipedia.org/wiki/Binary_heap
---

Restore the max-heap property below slot `i` of the `n`-element heap
`h`: *find the children*, *pick the largest of three*, *stop if the
parent wins*, *swap and descend*. Order the lines.

```cpp
constexpr void sift_down(int* h, int n, int i) {
  for (int largest = i;; i = largest) {
    const int left = 2 * i + 1, right = left + 1;
    if (left < n && h[left] > h[largest]) largest = left;
    if (right < n && h[right] > h[largest]) largest = right;
    if (largest == i) return;
    { const int t = h[i]; h[i] = h[largest]; h[largest] = t; }
  }
}
```

---

**Sift-down: children, largest of three, stop, swap and descend.** Both
children are compared before any swap, because promoting the smaller
child leaves it below its larger sibling. `largest == i` is the exit:
the property holds once no child beats the parent. Comparing the right
child against `h[i]` skips the left child's claim; always swapping with
the left child is the other classic slip.
