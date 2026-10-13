function FilterSection ({filterType, setFilterType, sortBy, setSortBy}) {
    return (
        <div className="filter-container">
            <div className="filter-group">
                <label> Tipe Catatan:</label>
                <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="all">Semua Tipe</option>
                    <option value="note">📝 Note Saja</option>
                    <option value="todo">☑️ To-Do Saja</option>
                </select>
            </div>

            <div className="filter-group">
                <label>Urutkan Berdasarkan:</label>
                <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}>
                    <option value="newest">Terbaru</option>
                    <option value="oldest">Terlama</option>
                    <option value="alphabetical">Judul (A - Z)</option>
                </select>
            </div>
        </div>
    )
}

export default FilterSection