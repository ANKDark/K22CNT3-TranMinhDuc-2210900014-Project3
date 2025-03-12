import { useState, useEffect } from 'react';
import '../../styles/sidebar.css'
import { useAuth } from "../../contexts/TmdAuthContext";
import { Link } from 'react-router-dom';


const Sidebar = () => {
    const { tmdUser } = useAuth();
    const [tmdIsOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 675) {
                setIsOpen(false);
            } else {
                setIsOpen(true);
            }
        };
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="row">
            <div className="col-4">
                <div
                    className="d-flex flex-column bg-dark text-white vh-100 overflow-hidden"
                    style={{
                        transition: 'width 0.3s ease-in-out, opacity 0.5s ease-in-out',
                        width: tmdIsOpen ? '300px' : '60px',
                    }}
                >
                    <div className="d-flex align-items-center justify-content-between p-3">
                        {tmdIsOpen && (
                            <>
                                <Link to="/" className="text-white text-decoration-none me-5 pe-5">
                                    <img
                                        src="/logo.png"
                                        alt="Monarch Money Logo"
                                        className="rounded-circle"
                                        width="40"
                                        height="40"
                                    />
                                </Link>
                                <button
                                    className="btn btn-dark rounded-circle border-0 p-2 d-flex justify-content-center align-items-center"
                                    aria-label="Button 1"
                                >
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </button>
                                <button
                                    className="btn btn-dark rounded-circle border-0 p-2 d-flex justify-content-center align-items-center"
                                    aria-label="Button 1"
                                >
                                    <i className="fa fa-bell" aria-hidden="true"></i>
                                </button>
                                <button
                                    className="btn btn-dark rounded-circle border-0 p-2 d-flex justify-content-center align-items-center"
                                    aria-label="Button 2"
                                >
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                </button>
                            </>
                        )}
                        <button
                            className="btn btn-dark rounded-circle border-0 p-1 d-flex justify-content-center align-items-center"
                            onClick={() => setIsOpen(!tmdIsOpen)}
                            aria-label="Toggle Sidebar"
                        >
                            <i className="fa fa-list" aria-hidden="true"></i>
                        </button>
                    </div>

                    <div className="nav flex-column h-100">
                        <Link to="/" className={`btn btn-none it-btn-us-tmd p-3 text-white ${!tmdIsOpen ? 'd-flex justify-content-center' : 'text-start'}`}>
                            <i className="fas fa-home" style={{ color: '#007bff' }}></i>
                            {tmdIsOpen && <span className='ms-2 sidebar-text'>Trang chủ</span>}
                        </Link>
                        <Link to="/tmdChart" className={`btn btn-none it-btn-us-tmd p-3 text-white ${!tmdIsOpen ? 'd-flex justify-content-center' : 'text-start'}`}>
                            <i className="fas fa-chart-pie" style={{ color: '#6f42c1' }}></i>
                            {tmdIsOpen && <span className='ms-2 sidebar-text'>Phân tích</span>}
                        </Link>
                        <Link to="/tmdEditProfile" className={`btn btn-none it-btn-us-tmd p-3 text-white ${!tmdIsOpen ? 'd-flex justify-content-center' : 'text-start'}`}>
                            <i className="fa fa-user" style={{ color: '#fd7e14' }} aria-hidden="true"></i>
                            {tmdIsOpen && <span className='ms-2 sidebar-text'>Tài khoản</span>}
                        </Link>
                        <Link to="/tmdCategory" className={`btn btn-none it-btn-us-tmd p-3 text-white ${!tmdIsOpen ? 'd-flex justify-content-center' : 'text-start'}`}>
                            <i className="fa fa-bar-chart fa-rotate-270" style={{ color: '#28a745' }} aria-hidden="true"></i>
                            {tmdIsOpen && <span className='ms-2 sidebar-text'>Danh mục</span>}
                        </Link>
                        <Link to="/tmdTransaction" className={`btn btn-none it-btn-us-tmd p-3 text-white ${!tmdIsOpen ? 'd-flex justify-content-center' : 'text-start'}`}>
                            <i className="fas fa-wallet" style={{ color: '#ffc107' }}></i>
                            {tmdIsOpen && <span className='ms-2 sidebar-text'>Giao dịch</span>}
                        </Link>
                        <Link to="/tmdBudgets" className={`btn btn-none it-btn-us-tmd p-3 text-white ${!tmdIsOpen ? 'd-flex justify-content-center' : 'text-start'}`}>
                            <i className="fas fa-bullseye" style={{ color: '#dc3545' }}></i>
                            {tmdIsOpen && <span className='ms-2 sidebar-text'>Ngân sách</span>}
                        </Link>
                        <Link to="/tmdSaving" className={`btn btn-none it-btn-us-tmd p-3 text-white ${!tmdIsOpen ? 'd-flex justify-content-center' : 'text-start'}`}>
                            <i className="fa-duotone fa-solid fa-vault" style={{ color: '#17a2b8' }}></i>
                            {tmdIsOpen && <span className='ms-2 sidebar-text'>Tiết kiệm</span>}
                        </Link>
                        <Link to="#item-3" className={`btn btn-none it-btn-us-tmd p-3 text-white ${!tmdIsOpen ? 'd-flex justify-content-center' : 'text-start'}`}>
                            <i className="fas fa-cog" style={{ color: '#6c757d' }}></i>
                            {tmdIsOpen && <span className='ms-2 sidebar-text'>Cài đặt</span>}
                        </Link>
                        <div className="mt-auto p-2 d-flex align-items-center gap-2">
                            <img
                                src="/logo.png"
                                alt="Monarch Money Logo"
                                className="rounded-circle"
                                width="40"
                                height="40"
                            />
                            {tmdIsOpen && <span><strong>{tmdUser?.tmdName || ""}</strong></span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
