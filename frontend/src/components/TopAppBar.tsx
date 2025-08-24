import React from 'react';
import { useAuthStore } from '../auth/AuthStore';
import { useNavigate } from 'react-router-dom';

const TopAppBar: React.FC = () => {
    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className='navbar navbar-expand-lg fixed-top bg' style={{ backgroundColor: '#e9ecef' }}>
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h3">Maktabah Online</span>

                {token ? (<>
                    <div className='container row' style={{ width: "25%" }}>
                        <div className='col'>
                            <label
                                className="link-primary"
                                onClick={() => navigate("/books")}>Data Buku</label>
                        </div>
                        <div className='col'>
                            <label
                                className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                onClick={() => navigate("/borrow-book-records")}>Transaksi</label>
                        </div>
                        <div className='col'>
                            <label
                                className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                onClick={handleLogout}>Logout</label>
                        </div>
                    </div>
                </>) : (
                    <div className='row'>
                        <span className="">Login</span>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default TopAppBar;