---
id: vector-back-pop-back
kind: basic
version: 1
level: 1
tags: [containers, vector, stack, foundations]
requires:
  - vector-basics
elaborate: Why might you first try `int top = st.pop_back();`, and what do you write instead?
refs:
  - https://en.cppreference.com/w/cpp/container/vector/back
  - https://en.cppreference.com/w/cpp/container/vector/pop_back
---

```cpp
std::vector<int> st{2, 5, 9};
st.pop_back();
int t = st.back();
```

## What are `t` and `st.size()`?

---

**`t` is 5 and the size is 2: `pop_back` removed the 9.**

`back()` reads the last element; `pop_back()` removes it and returns
nothing, so read before you pop. With `push_back` this makes a vector a
stack. Both require a non-empty vector, and nothing checks that.
