---
title: "Reading a Query Plan Without Guessing"
description: "A small, repeatable process for using PostgreSQL query plans to understand where time and work are going."
publishedDate: 2026-08-08
tags:
  - Databases
  - PostgreSQL
  - Computer Science
draft: false
---

Query tuning becomes less mysterious when we stop looking for a single “bad node” and instead compare what PostgreSQL expected with what actually happened.

## Measure the real query

Use `EXPLAIN (ANALYZE, BUFFERS)` in a safe environment. `ANALYZE` executes the statement, so do not add it casually to writes in production.

```sql
explain (analyze, buffers)
select id, created_at, total
from orders
where customer_id = 42
order by created_at desc
limit 20;
```

## Read from the outside in

The top node describes the final operation. Follow its children to see how the rows were produced. Focus on four signals:

- estimated rows compared with actual rows;
- loops, because work inside a loop is multiplied;
- buffers, which show cache and disk pressure;
- nodes that discard a large number of rows.

## Estimation errors matter

If PostgreSQL expects ten rows and receives a million, it may choose a plan that only works for the smaller estimate. Stale statistics, correlated columns, and skewed values are common causes.

An index is not automatically the answer. The plan is evidence about the work performed; the right fix may be a better index, fresher statistics, a rewritten predicate, or a data-model change.
