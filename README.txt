# Read me

First set up everything by following the README.txt files in all subfolders.
Then come back here and try the following examples.

# My use case - broken :(

Run this query against the supergraph:

query {
  orders {
    id
    description
    product {
      id
      name
    }
  }
}

You should receive the following, incorrect result:

{
  "data": {
    "orders": [
      {
        "id": "o1",
        "description": "Order 1",
        "product": {
          "id": "p1",
          "name": "Product 2"
        }
      },
      {
        "id": "o2",
        "description": "Order 2",
        "product": {
          "id": "p2",
          "name": null
        }
      }
    ]
  }
}

Note how it matched `name: "Product 2"` to `id: "p1"`, completely messing up the
results.

That's how it should actually look like:

{
  "data": {
    "orders": [
      {
        "id": "o1",
        "description": "Order 1",
        "product": {
          "id": "p1",
          "name": null
        }
      },
      {
        "id": "o2",
        "description": "Order 2",
        "product": {
          "id": "p2",
          "name": "Product 2"
        }
      }
    ]
  }
}


# Example of a working entities query

Run this query against graph-1-nodejs:

query {
  _entities(representations: [
    { __typename: "Order", id: "o2" },
    { __typename: "Order", id: "o99" },
    { __typename: "Order", id: "o1" },
  ]) {
    ... on Order {
      description
    }
  }
}

It should respond with:

{
  "data": {
    "_entities": [
      {
        "description": "Order 2"
      },
      null,
      {
        "description": "Order 1"
      }
    ]
  }
}

# Example of a broken entities query

Run this query against graph-2-dgraph:

query {
  _entities(representations: [
    { __typename: "Product", id: "p3" },
    { __typename: "Product", id: "p99" },
    { __typename: "Product", id: "p2" },
  ]) {
    ... on Product {
      name
    }
  }
}

And it responds with:

{
  "data": {
    "_entities": [
      {
        "name": "Product 2"
      },
      {
        "name": "Product 3"
      }
    ]
  },
  "extensions": { ... }
}

Whereas it actually should respond with:

{
  "data": {
    "_entities": [
      {
        "name": "Product 3"
      },
      null,
      {
        "name": "Product 2"
      }
    ]
  },
  "extensions": { ... }
}

Note the missing null element and the wrong order of the result.
