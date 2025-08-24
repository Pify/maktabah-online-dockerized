import { useEffect, useState } from "react";
import CustomSelect from "../components/CustomSelect";
import LoadingOverlay from "../components/LoadingOverlay";
import LoadingButton from "../components/LoadingButton";
import AlertMessage from "../components/AlertMessage";
import { Controller, useForm } from "react-hook-form";
import apiClient from "../api/ApiClient";
import { Book, BorrowBookRequest, FetchBookResponse } from "../types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BorrowBookForm() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [alertType, setAlertType] = useState<'success' | 'info' | 'danger'>('info');
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const {
        control,
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<BorrowBookRequest & { author?: string; type?: string }>({
        defaultValues: {
            bookId: '',
            borrowerName: '',
            borrowerAge: 0,
            borrowedAt: new Date().toISOString(),
            estimatedReturnAt: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
            returnedAt: null,
            author: '',
            type: '',
        },
        mode: 'all'
    });

    useEffect(() => {
        setLoading(true);
        apiClient.get<FetchBookResponse>("/books", { params: { isBorrowed: false } })
            .then(res => setBooks(res.data.data))
            .catch(() => setMessage("Gagal mengambil data buku"))
            .finally(() => setLoading(false));
    }, []);

    const handleBookChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const bookId = e.target.value;
        setValue('bookId', bookId);
        const book = books.find(b => b.id === bookId) || null;
        setSelectedBook(book);
        setValue('author', book?.author || '');
        setValue('type', book?.type || '');
    };

    const onSubmit = async (data: BorrowBookRequest & { author?: string; type?: string }) => {
        setLoading(true);
        try {
            await apiClient.post('/borrow-records', {
                bookId: data.bookId,
                borrowerName: data.borrowerName,
                borrowerAge: data.borrowerAge,
                borrowedAt: data.borrowedAt,
                estimatedReturnAt: data.estimatedReturnAt,
            });
            setAlertType('success');
            setMessage('Berhasil meminjam buku!');
            reset();
            setSelectedBook(null);
        } catch (err) {
            setAlertType('danger');
            setMessage('Gagal meminjam buku. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <LoadingOverlay show={loading} />
            <div className="container mt-4 border border-gray p-5 text-start" style={{ maxWidth: 600 }}>
                <h4>Form Peminjaman Buku</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Book Title Dropdown */}
                    <div className="mb-3">
                        <label className="form-label">Judul Buku</label>
                        <CustomSelect
                            label="Pilih Buku"
                            options={books.map(b => ({ label: b.title, value: b.id }))}
                            value={selectedBook?.id || ''}
                            onChange={handleBookChange}
                        />
                        {errors.bookId && <p className="text-danger">Judul buku wajib dipilih</p>}
                    </div>
                    {/* Author (auto-filled) */}
                    <div className="mb-3">
                        <label className="form-label">Penulis</label>
                        <input
                            type="text"
                            className="form-control"
                            value={selectedBook?.author || ''}
                            disabled
                        />
                    </div>
                    {/* Book Category (auto-filled) */}
                    <div className="mb-3">
                        <label className="form-label">Kategori Buku</label>
                        <input
                            type="text"
                            className="form-control"
                            value={selectedBook?.type || ''}
                            disabled
                        />
                    </div>
                    {/* Borrower Name */}
                    <div className="mb-3">
                        <label className="form-label">Nama Peminjam</label>
                        <input
                            type="text"
                            className="form-control"
                            {...register('borrowerName', { required: 'Nama peminjam wajib diisi' })}
                        />
                        {errors.borrowerName && <p className="text-danger">{errors.borrowerName.message as string}</p>}
                    </div>
                    {/* Borrower Age */}
                    <div className="mb-3">
                        <label className="form-label">Umur Peminjam</label>
                        <input
                            type="number"
                            className="form-control"
                            {...register('borrowerAge', {
                                required: 'Umur peminjam wajib diisi',
                                min: { value: 8, message: 'Umur minimal 8 tahun' },
                                max: { value: 70, message: 'Umur maksimal 70 tahun' }
                            })}
                        />
                        {errors.borrowerAge && <p className="text-danger">{errors.borrowerAge.message as string}</p>}
                    </div>
                    {/* Borrow Date */}
                    <div className="mb-3">
                        <label className="form-label">Tanggal Pinjam</label>
                        <Controller
                            control={control}
                            name="borrowedAt"
                            rules={{
                                required: 'Tanggal pinjam wajib diisi',
                                validate: (value) => {
                                    const borrowDate = new Date(value);
                                    const estDate = new Date(control._formValues.estimatedReturnAt);
                                    if (borrowDate.toDateString() === estDate.toDateString()) {
                                        return 'Tanggal pinjam dan estimasi kembali tidak boleh sama';
                                    }
                                    if (borrowDate > estDate) {
                                        return 'Tanggal pinjam harus sebelum estimasi kembali';
                                    }
                                    return true;
                                }
                            }}
                            render={({ field }) => (
                                <DatePicker
                                    className="form-control"
                                    selected={field.value ? new Date(field.value) : null}
                                    onChange={date => field.onChange(date ? date.toISOString() : '')}
                                    dateFormat="dd/MM/yyyy"
                                />
                            )}
                        />
                        {errors.borrowedAt && <p className="text-danger">{errors.borrowedAt.message as string}</p>}
                    </div>
                    {/* Estimated Return Date */}
                    <div className="mb-3">
                        <label className="form-label">Estimasi Tanggal Kembali</label>
                        <Controller
                            control={control}
                            name="estimatedReturnAt"
                            rules={{
                                required: 'Estimasi tanggal kembali wajib diisi',
                                validate: (value) => {
                                    const estDate = new Date(value);
                                    const now = new Date();
                                    const borrowDate = new Date(control._formValues.borrowedAt);
                                    if (estDate.toDateString() === borrowDate.toDateString()) {
                                        return 'Tanggal pinjam dan estimasi kembali tidak boleh sama';
                                    }
                                    if (estDate <= now) {
                                        return 'Estimasi tanggal kembali harus di masa depan';
                                    }
                                    if (borrowDate > estDate) {
                                        return 'Tanggal pinjam harus sebelum estimasi kembali';
                                    }
                                    return true;
                                }
                            }}
                            render={({ field }) => (
                                <DatePicker
                                    className="form-control"
                                    selected={field.value ? new Date(field.value) : null}
                                    onChange={date => field.onChange(date ? date.toISOString() : '')}
                                    dateFormat="dd/MM/yyyy"
                                />
                            )}
                        />
                        {errors.estimatedReturnAt && <p className="text-danger">{errors.estimatedReturnAt.message as string}</p>}
                    </div>
                    <LoadingButton loading={loading}>Pinjam Buku</LoadingButton>
                </form>
                <AlertMessage message={message} type={alertType} onClose={() => setMessage("")} />
            </div>
        </>
    );
}

export default BorrowBookForm;