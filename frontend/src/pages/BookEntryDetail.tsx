import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../api/ApiClient";
import LoadingOverlay from "../components/LoadingOverlay";
import AlertMessage from "../components/AlertMessage";
import BookBorrowedBadge from "../components/BookBorrowedBadge";
import { BookDetailResponse } from "../types";

function BookEntryDetail() {
    const { id } = useParams<string>();
    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');
    const [alertType, setAlertType] = useState<'success' | 'info' | 'danger'>('info');
    const [bookDetail, setBookDetail] = useState<BookDetailResponse>();

    const fetchBookDetail = async (id: string) => {
        setLoading(true);
        try {
            const res = await apiClient.get<BookDetailResponse>('/books', {
                params: { id }
            });

            setBookDetail(res.data);
        } catch (err) {
            console.log(`fail fetch book entry detail ${err}`);
            setAlertType('danger');
            setMessage('Gagal ambil data buku. Silahkan coba sesaat lagi');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBookDetail(id!);
    }, [id]);

    return (
        <>
            <LoadingOverlay show={loading} />
            <div className="container-fluid mt-4 px-4">
                <h3 className="mb-4">Detail Buku</h3>
                <AlertMessage message={message} type={alertType} onClose={() => setMessage('')} />

                <div className="border p-4 w-200">
                    <div className="row mb-3">
                        <div className="col-md-3 col-4 fw-bold">Judul Buku</div>
                        <div className="col-md-9 col-8">{bookDetail?.title}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 col-4 fw-bold">Penulis</div>
                        <div className="col-md-9 col-8">{bookDetail?.author}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 col-4 fw-bold">Tahun Terbit</div>
                        <div className="col-md-9 col-8">{bookDetail?.yearPublished}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 col-4 fw-bold">Penerbit</div>
                        <div className="col-md-9 col-8">{bookDetail?.publisher}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 col-4 fw-bold">Jenis Buku</div>
                        <div className="col-md-9 col-8">{bookDetail?.type}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 col-4 fw-bold">Tanggal Input Buku</div>
                        <div className="col-md-9 col-8">{bookDetail?.dateAdded}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 col-4 fw-bold">Sumber Buku</div>
                        <div className="col-md-9 col-8">{bookDetail?.source}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 col-4 fw-bold">Buku Lama</div>
                        <div className="col-md-9 col-8">{bookDetail?.isOld ? 'Ya' : 'Tidak'}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 col-4 fw-bold">Rak Buku</div>
                        <div className="col-md-9 col-8">{bookDetail?.shelfCategory}</div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-3 col-4 fw-bold">Status</div>
                        <div className="col-md-9 col-8"><BookBorrowedBadge isBorrowed={bookDetail?.isBorrowed ?? false} /></div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default BookEntryDetail;