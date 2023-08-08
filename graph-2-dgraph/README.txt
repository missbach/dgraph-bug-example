1. Start Dgraph or use Dgraph Cloud (https://cloud.dgraph.io/)

2. Upload the schema.graphql

3. Add data using this GraphQL mutation (Product p1 left out on purpose):

mutation {
  addProduct(input: [
      { id: "p2", name: "Product 2" },
      { id: "p3", name: "Product 3" },
  ], upsert: true) {
    numUids
  }
}
