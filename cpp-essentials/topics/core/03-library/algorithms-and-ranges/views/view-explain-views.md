---
id: view-explain-views
kind: explain
version: 1
level: 4
tags: [ranges, views, interview]
requires:
  - view-order-code
  - view-intro
  - view-pull-worked
elaborate: Name a loop in your own code that builds a temporary vector only to loop over it again; say what a view pipeline would save there and what it would risk.
refs:
  - https://en.cppreference.com/w/cpp/ranges
  - https://en.cppreference.com/w/cpp/ranges/filter_view
  - https://en.cppreference.com/w/cpp/ranges/take_view
---
An interviewer asks what `std::views::filter` does that a loop copying the
matches into a new vector does not. Explain.
---
- [ ] A view owns and copies no elements; iterating it pulls each element through the stages on demand
- [ ] Chained filter and transform steps build no intermediate vector for each step
- [ ] Building the pipeline does no work and allocates nothing; work is paid per element while iterating
- [ ] `iota(1) | filter(even) | take(3)` finishes, because `take` stops the pull from an endless source
- [ ] (empty: tick this)
