---
id: view-explain-views
kind: explain
version: 1
level: 4
tags: [ranges, views, interview]
requires:
  - view-order-code
  - view-changed-source
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
- [ ] A view owns no elements; the loop pulls each element through the stages only when it asks
- [ ] So chained filter and transform steps build no intermediate vector for each step
- [ ] Building the pipeline does no work and allocates nothing; work is paid per element while iterating
- [ ] Because `take` stops the pull, `iota(1) | filter(even) | take(3)` finishes
- [ ] A view refers to its source, so destroying the vector first leaves the view reading dead elements
