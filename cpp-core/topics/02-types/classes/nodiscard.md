---
id: class-nodiscard
kind: cloze
version: 1
level: 2
tags: [classes, attributes]
refs:
  - https://en.cppreference.com/w/cpp/language/attributes/nodiscard
---

`class JobQueue { public: {{c1::[[nodiscard]]::an attribute}} bool try_push(Job j); };`
A caller who writes `q.try_push(j);` as a statement on its own now gets
{{c2::a compiler warning::how severe a diagnostic, by default}}, because
throwing away that `bool` silently loses the job whenever the queue is full.
