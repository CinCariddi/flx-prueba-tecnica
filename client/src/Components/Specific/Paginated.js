import "./Paginated.css"

export default function Paginated({ totalRecords, recordsPerPage, page, actualPage }) {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    const renderPageNumbers = () => {
        let pageNumbers = [];
        if (actualPage > 3) {
            pageNumbers.push(
                <li key="first">
                    <button onClick={() => page(1)}>1</button>
                </li>
            );
            pageNumbers.push(
                <li key="prev-dots" className="dots">...</li>
            );
        }

        for (let i = Math.max(1, actualPage - 2); i <= Math.min(totalPages, actualPage + 2); i++) {
            pageNumbers.push(
                <li key={i} className={actualPage === i ? 'active' : ''}>
                    <button onClick={() => page(i)}>{i}</button>
                </li>
            );
        }

        if (actualPage < totalPages - 2) {
            pageNumbers.push(
                <li key="next-dots" className="dots">...</li>
            );
            pageNumbers.push(
                <li key="last">
                    <button onClick={() => page(totalPages)}>{totalPages}</button>
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="pagination">
            <ul>
                {actualPage > 1 && (
                    <li key="prev">
                        <button onClick={() => page(actualPage - 1)}>«</button>
                    </li>
                )}
                {renderPageNumbers()}
                {actualPage < totalPages && (
                    <li key="next">
                        <button onClick={() => page(actualPage + 1)}>»</button>
                    </li>
                )}
            </ul>
        </div>
    );
}