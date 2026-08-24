---
title: "Designing Idempotent Message Consumers"
description: "A practical model for handling duplicate delivery without pretending exactly-once processing is free."
publishedDate: 2026-08-17
tags:
  - Distributed Systems
  - Databases
  - Spring Boot
draft: false
---

At-least-once delivery is common because it is a useful failure model: if a consumer crashes before acknowledging a message, the broker delivers it again. The cost is that application code must treat duplicates as ordinary events, not rare accidents.

## Start with the side effect

Idempotency means applying the same operation more than once has the same externally visible result as applying it once. The important boundary is the side effect: a database update, an email, a payment request, or another published message.

## Record what was processed

One common approach stores the message ID in the same database transaction as the business change.

```sql
begin;

insert into processed_messages (consumer_name, message_id)
values ('invoice-projector', 'evt_018f')
on conflict do nothing;

-- Continue only if the insert affected one row.
update invoices
set status = 'paid'
where id = 'inv_4821';

commit;
```

The unique constraint becomes the concurrency control. If the marker and business update do not share a transaction, a crash can still leave them inconsistent.

## Natural idempotency is even better

Some operations already express a target state. “Set invoice status to paid” is safer to repeat than “increment paid invoice count.” When the domain allows it, model commands around desired state rather than procedural deltas.

## External calls need their own key

A local transaction cannot atomically include a remote payment provider. Pass an idempotency key understood by that provider, or introduce a durable outbox whose dispatcher can safely retry.

The lesson is less glamorous than an exactly-once slogan: identify every side effect, choose its idempotency boundary, and make retries part of the normal design.
