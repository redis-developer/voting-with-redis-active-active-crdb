This is a simple application that demonstrates Redis Enterprise active-active capabilities. It uses Next.js and Tailwind on the frontend to show a basic voting application. A Redis cluster is configured for active-active in 3 regions.

## Getting Started

Start by setting up your redis instances using the scripts in `bin` depending upon your system:

### On Linux or OSX
```bash
$ ./bin/sh/setup
```

### On Windows
```ps
$ ./bin/bat/setup.bat
```

This will setup a cluster of 3 redis instances in active-active mode on ports 12000, 12002, and 12004.

Next spin up 3 instances of the app to connect to the 3 respective redis instances using docker:

```
$ docker-compose up -d
```

This will setup 3 web servers on http://localhost:3000, http://localhost:3002, and http://localhost:3004. Open each of them in a browser and note how voting in one "region" will sync to the other regions automatically.

## Simulating Network Splits

In the `bin` directory you will find the following scripts:

1. `split`: Splits the network, isolating the redis instances from the cluster
2. `restore`: Restores the network, reconnecting the redis instances to the cluster
3. `stop`: Deletes the network for complete teardown of this demo app

To simulate a split, open the 3 web frontends and then run the `split` script. Then note how the vote counters begin to operate independently. Then run `restore` and see how once the network is restored, the redis instances automatically sync and use CRDT to automatically account for all of the isolated votes that were made while the network was split.
