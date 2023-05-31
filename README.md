# Zen.Watch IFTTT Node
Backend infrastructure for Zen Watch, an open-source IFTTT for web3.

### Architecture for the project
Below diagram showcases the various components of the project. Each of the components can be independently horizontally scaled.

<img width="1253" alt="zen-watch-ifttt-architecture" src="https://github.com/Zen-Watch/zen-watch-backend/assets/2181361/ab61ca59-0fca-4a08-be4a-8a8fa8a39598">


**NOTE:** The event system in the repository is deprecated, a replacement SDK is currently in progress. The push plans for the core data structures are under the SQL push plan folder. This repository uses MySQL as the data store, you can run the push plans to recreate the data structures in your local development environment.

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
