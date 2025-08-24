import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BorrowRecord, FetchBorrowRecordResponse } from "../types";
import Pagination from "../components/Pagination";
import apiClient from "../api/ApiClient";
import ConfirmModal from "../components/ConfirmModal";
import LoadingOverlay from "../components/LoadingOverlay";
import { formatDate as formatToLocalDate } from "../utils/dateFormatter";
import PrimaryButton from "../components/PrimaryButton";
import AlertMessage from "../components/AlertMessage";

function BorrowManagementPage() {
    const [records, setRecords] = useState<BorrowRecord[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [alertType, setAlertType] = useState<'success' | 'info' | 'danger'>('info');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleReturnBook = async (id: string) => {
        setSelectedId(id);
        setShowModal(true);
    };

    const confirmReturnBook = async (id: string) => {
        try {
            const res = await apiClient.put(`/borrow-records/${id}/return`, {
                returnedDate: new Date().toISOString()
            });
            console.log('Return book response:', res.data);
            setAlertType('success');
            setMessage('Berhasil mengembalikan buku');
            setSelectedId(null);
            await fetchRecords();
            setLoading(false);
        } catch (error) {
            setAlertType('danger');
            console.error('Error returning book:', error);
            setMessage('Gagal Hapus Data Buku. Silahkan coba lagi nanti');
            setSelectedId(null);
            setLoading(false);
        }

        setShowModal(false);
    }

    const fetchRecords = async (page = 1, limit = 10): Promise<void> => {
        try {
            const res = await apiClient.get<FetchBorrowRecordResponse>('/borrow-records', {
                params: {
                    page,
                    limit,
                }
            });
            setRecords(res.data.records);
            setTotalPages(res.data.totalPages || 1);
        } catch (err: any) {
            console.error("error fetching borrow records:", err);
            if (err.response && err.response.status === 401) {
                navigate('/login');
            }
        }
    }

    useEffect(() => {
        fetchRecords(currentPage, itemsPerPage);
    }, [currentPage, itemsPerPage]);

    return (
        <>
            <LoadingOverlay show={loading} />
            <ConfirmModal
                show={showModal}
                message="Are you sure want to return this book?"
                onConfirm={() => selectedId && confirmReturnBook(selectedId)}
                onCancel={() => setShowModal(false)} />

            <div className="container">
                <div className="row align-items-center mb-3 w-100">
                    <AlertMessage message={message} type={alertType} onClose={() => setMessage('')} />

                    <div className="col-md-6 text-sm-start">
                        <h4 className="m-0">Transaksi Peminjaman dan Pengembalian</h4>
                    </div>
                    <div className="col-sm-6 text-sm-end mt-2 mt-sm-0">
                        <PrimaryButton
                            className="btn btn-primary"
                            onClick={() => navigate('/borrow-book-records/create')}>
                            Pinjam Buku
                        </PrimaryButton>
                    </div>
                </div>

                {records.length === 0
                    ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                        <h4>Belum ada data peminjaman buku</h4>
                      </div>
                    : <table className="table table-bordered border-secondary-subtle">
                        <thead>
                            <tr className="table-secondary">
                                <th scope="col">Judul Buku</th>
                                <th scope="col">Nama Peminjam</th>
                                <th scope="col">Tanggal Pinjam</th>
                                <th scope="col">Estimasi Kembali</th>
                                <th scope="col">Tanggal Kembali</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                records.map((record, _) => {
                                    return <tr key={record.id}>
                                        <td>{record.Book.title}</td>
                                        <td>{record.borrowerName}</td>
                                        <td>{formatToLocalDate(record.borrowedAt)}</td>
                                        <td>{formatToLocalDate(record.estimatedReturnAt)}</td>
                                        <td>{record.returnedAt ? formatToLocalDate(record.returnedAt!) : "-"}</td>
                                        <td>
                                            {record.returnedAt
                                                ? null
                                                : <a
                                                    href="#"
                                                    className="link-underline-primary m-2"
                                                    onClick={() => handleReturnBook(record.id)}>Pengembalian</a>}
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>}

                <Pagination
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    totalPages={totalPages} />
            </div>
        </>
    )
}

export default BorrowManagementPage;