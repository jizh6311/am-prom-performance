# Performance testing scripts for Aspen Mesh Promtheus

====================

## Overview
Node version: 16.13.1

Run `npm run test` to kick off the loading test.

The current scripts written by [k6](https://k6.io/docs/) only test the performance of the query endpoints.
More testing features and configurations (duration, threshold and etc) are coming.

## Environment Variables
```
PROM_QUERY_URL (required): example https://prometheus-us-central1.grafana.net/api/prom/api/v1/query
QUERY_WINDOW (optional): default value 1h
QUERY (optional): default value avg_over_time(container_memory_usage[1h])
AUTH_TYPE (optional): default Basic
AUTH_STRING (optional)
```