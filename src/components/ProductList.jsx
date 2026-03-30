import ProductCard from "./ProductCard"

function ProductList({ products })
{
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            maxWidth: "1200px",
            margin: "0 auto"
        }}>
            {products.map(p => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    )
}

export default ProductList