export interface BorrowBookRequest {
    bookId: string;
    borrowerName: string;
    borrowerAge: number;
    borrowedAt: string;
    estimatedReturnAt: string;
    returnedAt: string | null;
}