#!/bin/sh

docker network disconnect re-crdb_network-nyc redis-dc
docker network disconnect re-crdb_network-sf redis-dc
docker network disconnect re-crdb_network-dc redis-nyc
docker network disconnect re-crdb_network-sf redis-nyc
docker network disconnect re-crdb_network-dc redis-sf
docker network disconnect re-crdb_network-nyc redis-sf
