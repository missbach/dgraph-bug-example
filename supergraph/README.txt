# Running Apollo Router

1. Download Apollo Router for your OS (installs to the current working directory):

curl -sSL https://router.apollo.dev/download/nix/latest | sh

2. Create a configuration for the router by copying router-config.example.yml to
   router-config.yml and changing the subgraph URLs.

3. Start the router:

./router --dev --config router-config.yml --supergraph generated/supergraph.graphql

4. Check out the GUI under:

http://localhost:4000/


# Steps to used to generate the *.graphql files in this folder

1. Install Apollo Rover for your OS (installs to your home directory):

curl -sSL https://rover.apollo.dev/nix/latest | sh

2. Fetch schema for each subgraph using the following GraphQL query and save to
   generated/graph-1-nodejs.graphql and generated/graph-2-dgraph.graphql,
   respectively.

query {
  _service { sdl }
}

3. Compose supergraph with Rover:

rover supergraph compose --config rover-config.yml --output generated/supergraph.graphql
