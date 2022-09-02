#!/bin/sh

docker network connect re-crdb_network-nyc redis-dc
docker network connect re-crdb_network-sf redis-dc
docker network connect re-crdb_network-dc redis-nyc
docker network connect re-crdb_network-sf redis-nyc
docker network connect re-crdb_network-dc redis-sf
docker network connect re-crdb_network-nyc redis-sf
