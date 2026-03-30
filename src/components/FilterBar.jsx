function FilterBar({ setCategory })
{
    const categories = ["All", "Electronics", "Clothes", "Books"]

    return (
        <div className="filters">
            {categories.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}>
                    {cat}
                </button>
            ))}
        </div>
    )
}

export default FilterBar