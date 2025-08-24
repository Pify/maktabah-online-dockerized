import 'react-datepicker/dist/react-datepicker.css';
import CustomSelect from "../components/CustomSelect";
import DatePicker from "react-datepicker";
import PrimaryButton from '../components/PrimaryButton';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import apiClient from "../api/ApiClient";
import { format } from 'date-fns';
import LoadingOverlay from '../components/LoadingOverlay';
import AlertMessage from '../components/AlertMessage';
import { BookDetailResponse, BookFormRequest } from '../types';
import { BOOK_TYPES, BOOK_SHELVES } from '../utils/bookOptions';

function BookEntryForm() {
    const { id } = useParams();

    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [alertType, setAlertType] = useState<'success' | 'info' | 'danger'>('info');

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BookFormRequest>({
        defaultValues: {
            title: '',
            author: '',
            type: '',
            yearPublished: new Date().getFullYear(),
            publisher: '',
            dateAdded: new Date(),
            source: '',
            isOld: false,
            shelfCategory: '',
        },
        mode: 'all'
    });

    useEffect(() => {
        if (id) {
            fetchBookDetail(id);
        } else {
            reset();
        }
    }, [id, reset]);

    const parseDate = (dateString: string): Date => {
        const [year, month, day] = dateString.split('-').map(Number);

        if (day < 1 || day > 31 || month > 12 || isNaN(year)) {
            throw new Error(`Invalid date: ${dateString}`)
        }

        return new Date(year, month - 1, day);
    }

    const fetchBookDetail = async (id: string) => {
        setLoading(true);
        try {
            const res = await apiClient.get<BookDetailResponse>('/books', {
                params: { id }
            });

            const transformed = {
                ...res.data,
                dateAdded: parseDate(res.data.dateAdded),
            }

            console.log(`success fetch book entry detail / type:  ${transformed.type}, isOld: ${transformed.isOld}, shelfCategory: ${transformed.shelfCategory}`);
            reset(transformed);
        } catch (err) {
            console.log(`fail fetch book entry detail ${err}`);
            setAlertType('danger');
            setMessage('Gagal input data buku. Silahkan coba sesaat lagi');
        } finally {
            setLoading(false);
        }
    }

    const createBookEntry = async (data: BookFormRequest) => {
        setLoading(true);
        try {
            const res = await apiClient.post('/books', {
                title: String(data.title),
                author: String(data.author),
                yearPublished: Number(data.yearPublished),
                type: String(data.type),
                dateAdded: format(data.dateAdded, 'yyyy-MM-dd'),
                shelfCategory: String(data.shelfCategory),
                publisher: data.publisher || undefined,
                source: data.source || undefined,
                isOld: !!data.isOld,
            });

            console.log(res.data);
            setAlertType('success');
            setMessage('Berhasil input data buku !');
        } catch (error) {
            setAlertType('danger');
            setMessage('Gagal input data buku. Silahkan coba sesaat lagi');
        } finally {
            setLoading(false);
        }
    }

    const updateBookEntry = async (data: BookFormRequest) => {
        setLoading(true);
        try {
            const res = await apiClient.put(`/books/${data.id}`, {
                title: data.title,
                author: data.author,
                type: data.type,
                yearPublished: data.yearPublished,
                publisher: data.publisher,
                dateAdded: data.dateAdded,
                source: data.source,
                isOld: data.isOld,
                shelfCategory: data.shelfCategory,
            });
            console.log('Update success:', res.data);
            setAlertType('success');
            setMessage('Berhasil update data buku!');
        } catch (error) {
            console.log('Update error:', error);
            setAlertType('danger');
            setMessage('Gagal update data buku. Silahkan coba sesaat lagi');
        } finally {
            setLoading(false);
        }
    }

    const onSubmit: SubmitHandler<BookFormRequest> = async (data) => {
        if (id) {
            await updateBookEntry(data);
        } else {
            await createBookEntry(data);
        }
    };

    return (
        <>
            <LoadingOverlay show={loading} />

            <div className="text-start ">
                <label>Input Buku</label>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container mt-4 border border-gray p-5">
                        {/* Judul Buku */}
                        <div className='row g-3 align-items-center mb-3'>
                            <div className="col-auto">
                                <label className='form-label'>Judul Buku</label>
                            </div>
                            <div className="col">
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder="Masukkan Judul Buku"
                                    {...register('title', { required: 'title is required' })}
                                />
                                {errors.title && (
                                    <p className='text-danger'>{errors.title.message as String}</p>
                                )}
                            </div>
                        </div>

                        {/* Penulis */}
                        <div className='row g-3 align-items-center mb-3'>
                            <div className="col-auto">
                                <label className='form-label'>Penulis</label>
                            </div>
                            <div className="col">
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder="Masukkan Nama Penulis"
                                    {...register('author', { required: 'author is required' })}
                                />
                                {errors.author && (
                                    <p className='text-danger'>{errors.author.message as String}</p>
                                )}
                            </div>
                        </div>

                        {/* Tahun Terbit */}
                        <div className='row g-3 align-items-center mb-3'>
                            <div className="col-auto">
                                <label className='form-label'>Tahun Terbit</label>
                            </div>
                            <div className="col">
                                <input
                                    type='number'
                                    className='form-control'
                                    placeholder="Masukkan Tahun Terbit"
                                    {...register('yearPublished', { required: 'yearPublished is required' })}
                                />
                                {errors.yearPublished && (
                                    <p className='text-danger'>{errors.yearPublished.message as String}</p>
                                )}
                            </div>
                        </div>

                        {/* Penerbit */}
                        <div className='row g-3 align-items-center mb-3'>
                            <div className="col-auto">
                                <label className='form-label'>Penerbit</label>
                            </div>
                            <div className="col">
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder="Masukkan Nama Penerbit"
                                    {...register('publisher', { required: 'publisher is required' })}
                                    style={{ minWidth: '250px' }}
                                />
                                {errors.publisher && (
                                    <p className='text-danger'>{errors.publisher.message as String}</p>
                                )}
                            </div>
                        </div>

                        {/* Jenis Buku */}
                        <div className='row g-3 align-items-center mb-3'>
                            <div className="col-auto">
                                <label className='form-label'>Jenis Buku</label>
                            </div>
                            <div className="col">
                                <Controller
                                    control={control}
                                    name="type"
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <CustomSelect
                                            label={"Plih Jenis Buku"}
                                            options={BOOK_TYPES}
                                            value={field.value}
                                            onChange={field.onChange} />
                                    )}
                                />
                                {errors.type && (
                                    <p className='text-danger'>{errors.type.message as String}</p>
                                )}
                            </div>
                        </div>

                        {/* Tanggal Input Buku */}
                        <div className='row g-3 align-items-center mb-3'>
                            <div className="col-auto">
                                <label className='form-label'>Tanggal Input Buku</label>
                            </div>
                            <div className="col">
                                <Controller
                                    control={control}
                                    name="dateAdded"
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <DatePicker
                                            dateFormat="dd/MM/yyyy"
                                            selected={field.value}
                                            className="form-control"
                                            onChange={field.onChange} />
                                    )} />
                                {errors.dateAdded && (
                                    <p className='text-danger'>{errors.dateAdded.message as String}</p>
                                )}
                            </div>
                        </div>

                        {/* Sumber Buku */}
                        <div className='row g-3 align-items-center mb-3'>
                            <div className="col-auto">
                                <label className='form-label'>Sumber Buku</label>
                            </div>
                            <div className="col">
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder="Masukkan Nama Sumber Buku"
                                    {...register('source', { required: 'source is required' })}
                                />
                                {errors.source && (
                                    <p className='text-danger'>{errors.source.message as String}</p>
                                )}
                            </div>
                        </div>

                        {/* Buku Lama */}
                        <div className='row g-3 align-items-center mb-3'>
                            <div className="col-auto">
                                <label className='form-label'>Buku Lama</label>
                            </div>
                            <div className="col">
                                <Controller
                                    name='isOld'
                                    control={control}
                                    rules={{ validate: value => value !== undefined || "Pilih status buku lama" }}
                                    render={({ field }) => (
                                        <>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    {...field}
                                                    className="form-check-input"
                                                    type="radio"
                                                    id="isOld-yes"
                                                    checked={field.value === true}
                                                    value="true"
                                                    onChange={() => field.onChange(true)} />
                                                <label className="form-check-label" htmlFor='isOld-yes'>Ya</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id="isOld-no"
                                                    value="false"
                                                    checked={field.value === false}
                                                    onChange={() => field.onChange(false)} />
                                                <label className="form-check-label" htmlFor='isOld-no'>Tidak</label>
                                            </div>
                                        </>
                                    )} />
                                {errors.isOld && (
                                    <p className='text-danger'>{errors.isOld.message as String}</p>
                                )}
                            </div>
                        </div>

                        {/* Rak Buku */}
                        <div className='row g-3 align-items-center mb-3'>
                            <div className="col-auto">
                                <label className='form-label'>Rak Buku</label>
                            </div>
                            <div className="col">
                                <Controller
                                    control={control}
                                    name="shelfCategory"
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <CustomSelect
                                            label={"Plih Rak Buku"}
                                            options={BOOK_SHELVES}
                                            value={field.value}
                                            onChange={field.onChange} />
                                    )} />
                                {errors.shelfCategory && (
                                    <p className='text-danger'>{errors.shelfCategory.message as String}</p>
                                )}
                            </div>
                        </div>

                    </div>

                    <AlertMessage message={message} type={alertType} onClose={() => setMessage('')} />

                    <div className="d-flex gap-3 w-100 mt-3">
                        <PrimaryButton
                            className="w-20 ">Simpan</PrimaryButton>
                        <PrimaryButton
                            className="w-20 "
                            type='button'
                            onClick={() => navigate(-1)}>Kembali</PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}

export default BookEntryForm;