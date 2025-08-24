import { BorrowRecord } from "../model/BorrowRecord";

export interface FetchBorrowRecordResponse {
    records: BorrowRecord[];
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}