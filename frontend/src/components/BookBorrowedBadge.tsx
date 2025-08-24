type BookBorrowedBadgeProps = {
    isBorrowed: boolean;
};

export default function BookBorrowedBadge({isBorrowed}: BookBorrowedBadgeProps) {
    return (
        <span className={`badge ${isBorrowed ? 'text-bg-danger' : 'text-bg-success'} p-2`}>
            {isBorrowed ? 'Dipinjam' : 'Tersedia'}
        </span>
    );
}