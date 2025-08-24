interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {

    if (totalPages <= 1) return null;

    return (
        <div className="justify-content-between gap-3">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}>
                Sebelumnya
            </button>
            <span>Halaman {currentPage} dari {totalPages}</span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}>
                Selanjutnya
            </button>
        </div>
    );
}

export default Pagination;