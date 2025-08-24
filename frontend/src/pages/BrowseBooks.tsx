import { useEffect, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/ApiClient";
import BookBorrowedBadge from "../components/BookBorrowedBadge";
import ConfirmModal from "../components/ConfirmModal";
import AlertMessage from "../components/AlertMessage";
import LoadingOverlay from "../components/LoadingOverlay";
import Pagination from "../components/Pagination";
import useDebounce from "../hooks/useDebounce";
import { Book, DeleteBookResponse, FetchBookResponse } from "../types";
import { BOOK_TYPES, BOOK_SHELVES } from '../utils/bookOptions';

function BrowseBooks() {
    const [books, setBooks] = useState<Book[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [alertType, setAlertType] = useState<'success' | 'info' | 'danger'>('info');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const [filters, setFilters] = useState({
        search: '',
        type: '',
        isOld: '',
        shelfCategory: ''
    });

    const debouncedSearch = useDebounce(filters, 500);

    const handleDelete = (id: string) => {
        setSelectedId(id);
        setShowModal(true);
    }

    const confirmDelete = async (id: string) => {
        try {
            setLoading(true);
            await apiClient.delete<DeleteBookResponse>(`/books/${id}`);
            setAlertType('success');
            setMessage('Berhasil Hapus Data Buku !');
            await fetchBooks();
            setLoading(false);
        } catch (error) {
            setAlertType('danger');
            console.error('Error deleting item:', error);
            setMessage('Gagal Hapus Data Buku. Silahkan coba lagi nanti');
            setLoading(false);
        }

        setShowModal(false);
    }

    const fetchBooks = async (page = 1, limit = 10): Promise<void> => {
        try {
            const res = await apiClient.get<FetchBookResponse>('/books', {
                params: {
                    page,
                    limit,
                    search: debouncedSearch.search || undefined,
                    type: debouncedSearch.type || undefined,
                    isOld: debouncedSearch.isOld || undefined,
                    shelfCategory: debouncedSearch.shelfCategory || undefined
                }
            });
            setBooks(res.data.data);
            setTotalPages(res.data.meta.totalPages || 1);
        } catch (err: any) {
            console.error("error fetching book entry:", err);
            if (err.response && err.response.status === 401) {
                navigate('/login');
            }
        }
    }


    useEffect(() => {
        fetchBooks(currentPage, itemsPerPage);
    }, [debouncedSearch, currentPage, itemsPerPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <LoadingOverlay show={loading} />
            <ConfirmModal
                show={showModal}
                message="Are you sure want to delete this book entry?"
                onConfirm={() => selectedId && confirmDelete(selectedId)}
                onCancel={() => setShowModal(false)} />

            <div className="container-lg my-4">
                <div className="d-flex flex-column align-items-start gap-3">

                    <AlertMessage message={message} type={alertType} onClose={() => setMessage('')} />

                    <div className="row align-items-center mb-3 w-100">
                        <div className="col-md-6 text-sm-start">
                            <h4 className="m-0">Data Buku</h4>
                        </div>
                        <div className="col-sm-6 text-sm-end mt-2 mt-sm-0">
                            <PrimaryButton
                                className="btn btn-primary"
                                onClick={() => navigate('/books/create')}>
                                Input Buku
                            </PrimaryButton>
                        </div>
                    </div>

                    <div className="w-100 border p-3 rounded bg-light">
                        <div className="row gy-2 gx-3 align-items-center">
                            <div className="col-md">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Cari judul / penulis / jenis"
                                    value={filters.search}
                                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                />
                            </div>
                            <div className="col-md">
                                <select
                                    className="form-select"
                                    value={filters.type}
                                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                >
                                    <option value="">Pilih Jenis Buku</option>
                                    {BOOK_TYPES.map((type) => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md">
                                <select
                                    className="form-select"
                                    value={filters.isOld}
                                    onChange={(e) => setFilters({ ...filters, isOld: e.target.value })}
                                >
                                    <option value="">Baru / Lama</option>
                                    <option value="true">Lama</option>
                                    <option value="false">Baru</option>
                                </select>
                            </div>
                            <div className="col-md">
                                <select
                                    className="form-select"
                                    value={filters.shelfCategory}
                                    onChange={(e) => setFilters({ ...filters, shelfCategory: e.target.value })}
                                >
                                    <option value="">Pilih Kategori Rak</option>
                                    {BOOK_SHELVES.map((type) => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-auto">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setFilters({ search: '', type: '', isOld: '', shelfCategory: '' });
                                        setCurrentPage(1);
                                    }}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        {books.length === 0
                            ? <h4>Belum ada data buku</h4>
                            : <table className="table table-bordered border-secondary-subtle">
                                <thead>
                                    <tr className="table-secondary">
                                        <th scope="col">Judul Buku</th>
                                        <th scope="col">Penulis</th>
                                        <th scope="col">Jenis Buku</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        books.map((book, _) => {
                                            return <tr key={book.id}>
                                                <td>{book.title}</td>
                                                <td>{book.author}</td>
                                                <td>{book.type}</td>
                                                <td><BookBorrowedBadge isBorrowed={book.isBorrowed} /></td>
                                                <td>
                                                    <a
                                                        href="#"
                                                        className="link-underline-primary m-2"
                                                        onClick={() => navigate(`/books/${book.id}`)}>Detail</a>
                                                    <a
                                                        href="#"
                                                        className="link-underline-primary m-2"
                                                        onClick={() => navigate(`/books/edit/${book.id}`)}>Edit</a>
                                                    {book.isBorrowed
                                                        ? null
                                                        : <a
                                                            href="#"
                                                            className="link-underline-primary m-2"
                                                            onClick={() => handleDelete(book.id)}>Delete</a>}
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
                </div>
            </div>
        </>
    );
}

export default BrowseBooks;