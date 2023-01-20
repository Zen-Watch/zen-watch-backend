# zen-watch-backend
Backend code for Zen Watch, an [event based analytics system](https://www.youtube.com/watch?v=hMWyE3HBwW4) for web3.

## Code Structure

* zen-watch-api - contains the event processing apis
* zen-watch-background-job - contains the event processing background job logic
* zen-watch-sql-push-plans - contains the mysql schema files to restore the mysql db (table operation type, core & visualization, notification tables are separated by the respective prefixes)

