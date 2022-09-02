@REM Delete the bridge networks if they already exist
docker network rm network1
docker network rm network2
docker network rm network3

@REM Create new bridge networks
echo "Creating new subnets..."
docker network create network1 --subnet=172.18.0.0/16 --gateway=172.18.0.1
docker network create network2 --subnet=172.19.0.0/16 --gateway=172.19.0.1
docker network create network3 --subnet=172.20.0.0/16 --gateway=172.20.0.1

@REM Start 3 docker containers. Each container is a node in a separate network
@REM These commands pull redislabs/redis from the docker hub. Because of the
@REM port mapping rules, Redis Enterprise instances are available on ports
@REM 12000, 12002, 12004
echo ""
echo "Starting Redis Enterprise as Docker containers..."
docker run -d --cap-add sys_resource -h rp1 --name rp1 -p 8443:8443 -p 9443:9443 -p 12000:12000 --network=network1 --ip=172.18.0.2 redislabs/redis
docker run -d --cap-add sys_resource -h rp2 --name rp2 -p 8445:8443 -p 9445:9443 -p 12002:12000 --network=network2 --ip=172.19.0.2 redislabs/redis
docker run -d --cap-add sys_resource -h rp3 --name rp3 -p 8447:8443 -p 9447:9443 -p 12004:12000 --network=network3 --ip=172.20.0.2 redislabs/redis

@REM Connect the networks
docker network connect network2 rp1
docker network connect network3 rp1
docker network connect network1 rp2
docker network connect network3 rp2
docker network connect network1 rp3
docker network connect network2 rp3

@REM Sleep while the nodes start. Increase the sleep time if your nodes take
@REM longer than 60 seconds to start
echo ""
echo "Waiting for the servers to start..."

timeout 60

@REM Create 3 Redis Enterprise clusters -- one for each network. You can login to
@REM a cluster at https://localhost:8443/ (or 8445, 8447). The user name is
@REM r@r.com, password is password. Change the user
echo ""
echo "Creating clusters"
docker exec -it rp1 /opt/redislabs/bin/rladmin cluster create name cluster1.local username r@r.com password test
docker exec -it rp2 /opt/redislabs/bin/rladmin cluster create name cluster2.local username r@r.com password test
docker exec -it rp3 /opt/redislabs/bin/rladmin cluster create name cluster3.local username r@r.com password test

@REM Create the CRDB
echo ""
echo "Creating a CRDB"
docker exec -it rp1 /opt/redislabs/bin/crdb-cli crdb create --name mycrdb --memory-size 512mb --port 12000 --replication false --shards-count 1 --instance fqdn=cluster1.local,username=r@r.com,password=test --instance fqdn=cluster2.local,username=r@r.com,password=test --instance fqdn=cluster3.local,username=r@r.com,password=test
