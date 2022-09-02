#!/bin/sh

docker-compose -p re-crdb up -d

echo ""
echo "Connect the networks"
docker network connect re-crdb_network-nyc redis-dc
docker network connect re-crdb_network-sf redis-dc
docker network connect re-crdb_network-dc redis-nyc
docker network connect re-crdb_network-sf redis-nyc
docker network connect re-crdb_network-dc redis-sf
docker network connect re-crdb_network-nyc redis-sf

echo ""
echo "Waiting for the servers to start..."
sleep 60

echo ""
echo "Creating clusters"
docker exec -it redis-dc /opt/redislabs/bin/rladmin cluster create name cluster1.local username r@r.com password test
docker exec -it redis-nyc /opt/redislabs/bin/rladmin cluster create name cluster2.local username r@r.com password test
docker exec -it redis-sf /opt/redislabs/bin/rladmin cluster create name cluster3.local username r@r.com password test

echo ""
echo "Creating a CRDB"
docker exec -it redis-dc /opt/redislabs/bin/crdb-cli crdb create --name mycrdb --memory-size 512mb --port 12000 --replication false --shards-count 1 --instance fqdn=cluster1.local,username=r@r.com,password=test --instance fqdn=cluster2.local,username=r@r.com,password=test --instance fqdn=cluster3.local,username=r@r.com,password=test
