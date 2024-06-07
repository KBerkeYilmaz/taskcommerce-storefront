export async function fetchProducts() {
  const response = await fetch("http://localhost:8000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query { products { id name inStock description category brand } }`,
    }),
  });
  const result = await response.json();
  return result.data.products;
}
