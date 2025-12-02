# TanStack Query: enabled vs skipToken Example

This is a quick example app which proves that in a normal Tanstack Query application, using skipToken vs enabled does not have an effect on the cached data that useQuery returns - in either case, cached data is still returned even though the query is not run.
