---
id: class-nodiscard
kind: cloze
version: 1
level: 2
tags: [classes, attributes]
requires:
  - cpp-essentials/fn-return-by-value
refs:
  - https://en.cppreference.com/w/cpp/language/attributes/nodiscard
---

`class JobQueue { public: {{c1::[[nodiscard]]::an attribute on the declaration}} bool try_push(Job j); };`
Now `q.try_push(j);` gets {{c2::a compiler warning::how severe a diagnostic, by default}},
while `if (!q.try_push(j)) retry(j);` compiles cleanly.
