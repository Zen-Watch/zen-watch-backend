# zen-watch-backend
Backend code for Zen Watch, an open-source IFTTT for web3.

### Coding Stype
- Use underscore for names and all lowcaps, instead of camel_case. Ex, `camel_case` instead of `CamelCase`.

## Code Structure

* zen-watch-api - contains the event processing apis
* zen-watch-background-job - contains the event processing background job logic
* zen-watch-sql-push-plans - contains the mysql schema files to restore the mysql db (table operation type, core & visualization, notification tables are separated by the respective prefixes)
* NOTES_Digital_Ocean.md -- contains the instructions to spin up a new server
* NOTES.md -- contains the various resources referenced during the implementation

## MySQL Note

Not setting to processing state now, as we want the subsequent task to pick up the unfinished task and right now, each shard is acted by one dedicated worker, which might be true in the future as well. Check out **NOTES_MYSQL2.md** to learrn more.