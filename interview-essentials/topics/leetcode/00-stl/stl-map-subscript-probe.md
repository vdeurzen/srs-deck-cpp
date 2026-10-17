---
id: stl-map-subscript-probe
kind: code
version: 1
level: 2
tags: [stl, hash-map, misconception, lc-1]
input: chips
choices:
  c1:
    - "seen.contains(need)"
    - "seen[need]"
    - "seen.count(need) > 1"
    - "seen[need] > 0"
compile:
  harness: |
    #include <algorithm>
    struct FlatMap {   // constexpr stand-in with unordered_map's lookup members
      std::vector<std::pair<int, int>> kv;
      constexpr auto find(int k) { return std::ranges::find(kv, k, &std::pair<int, int>::first); }
      constexpr bool contains(int k) { return find(k) != kv.end(); }
      constexpr std::size_t count(int k) { return contains(k); }
      constexpr int& operator[](int k) {
        auto it = find(k);
        return it != kv.end() ? it->second : kv.emplace_back(k, 0).second;
      }
    };
    static_assert(two_sum<FlatMap>({2, 7, 11, 15}, 9) == std::vector<int>{0, 1});
    static_assert(two_sum<FlatMap>({3, 3}, 6) == std::vector<int>{0, 1});
    static_assert(two_sum<FlatMap>({3, 2, 4}, 6) == std::vector<int>{1, 2});
    int main() { return two_sum({2, 7}, 9).size(); }   // also compiles it with the real map
requires:
  - cpp-essentials/iter-map-subscript-inserts
refs:
  - https://leetcode.com/problems/two-sum/
  - https://leetcode.com/problems/subarray-sum-equals-k/
  - https://en.cppreference.com/w/cpp/container/unordered_map/contains
elaborate: Two Sum only stores indexes. Subarray Sum Equals K (LC 560) counts the contiguous subarrays summing to `k`. What else could a `[]` probe silently store a zero for there?
---

Two Sum (LC 1): return the indices of the two values in `nums` that add
up to `target`. `seen` maps each value already passed to its index.
Complete the probe for the partner of `nums[i]`.

```cpp
#include <unordered_map>
#include <vector>
template <class Map = std::unordered_map<int, int>>
constexpr std::vector<int> two_sum(const std::vector<int>& nums, int target) {
  Map seen;
  for (int i = 0; i < int(nums.size()); ++i) {
    int need = target - nums[i];
    if ({{c1::seen.contains(need)}}) return {seen[need], i};
    seen[nums[i]] = i;
  }
  return {};
}
```

---

**Ask whether the key exists, not what its value is.** `seen[need]`
reads the stored index, and index 0 is falsy: in `[2, 7]` the partner
at position 0 is never found (and the miss inserts `need → 0`). `> 0`
has the same hole. A key occurs at most once in an `unordered_map`, so
`count` is 0 or 1 and `> 1` never fires.
