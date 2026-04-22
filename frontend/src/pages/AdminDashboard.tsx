import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, List, Settings, TrendingUp, Users, ClipboardList, Building, ArrowLeft, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const MOCK_OFFERS = [
    { id: 1, brand: "Notion Template Co.", title: "Founder OS", claims: 45, status: "Active" },
    { id: 2, brand: "Lumi Desk", title: "Monitor Light Bar", claims: 120, status: "Active" },
    { id: 3, brand: "SaaS Starter", title: "React Boilerplate", claims: 34, status: "Paused" },
];

const MOCK_REQUESTS = [
    { id: 1, company: "TechFlow", email: "founders@techflow.io", date: "2026-04-20", status: "Pending" },
    { id: 2, company: "DesignJoy", email: "hello@designjoy.co", date: "2026-04-21", status: "Reviewed" },
    { id: 3, company: "Acme Corp", email: "partners@acme.com", date: "2026-04-22", status: "Pending" }
];

const MOCK_CLAIMS = [
    { id: 1, user: "Alex J.", email: "alex@example.com", drop: "Founder OS", date: "2026-04-21", status: "Claimed" },
    { id: 2, user: "Sarah T.", email: "sarah@example.com", drop: "Monitor Light Bar", date: "2026-04-22", status: "Paid" },
    { id: 3, user: "Mike R.", email: "mike@example.com", drop: "Founder OS", date: "2026-04-22", status: "Claimed" }
];

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('offers');
    const [requests, setRequests] = useState(MOCK_REQUESTS);
    const [offers, setOffers] = useState(MOCK_OFFERS);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('earlybird_admin_auth');
        navigate('/');
    };

    const handleOfferToggle = (id: number) => {
        setOffers(offers.map(offer => {
            if (offer.id === id) {
                return { ...offer, status: offer.status === 'Active' ? 'Paused' : 'Active' };
            }
            return offer;
        }));
    };

    const handleReviewToggle = (id: number) => {
        setRequests(requests.map(req => {
            if (req.id === id) {
                const nextStatus = req.status === 'Pending' ? 'Reviewed' : 'Pending';
                return { ...req, status: nextStatus };
            }
            return req;
        }));
    };

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    Early Bird <span>Admin</span>
                </div>

                <nav className="admin-nav">
                    <button
                        className={`nav-item ${activeTab === 'offers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('offers')}
                    >
                        <List size={20} /> Manage Offers
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'add' ? 'active' : ''}`}
                        onClick={() => setActiveTab('add')}
                    >
                        <Plus size={20} /> Add Offer
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'requests' ? 'active' : ''}`}
                        onClick={() => setActiveTab('requests')}
                    >
                        <Building size={20} /> Partner Requests
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'claims' ? 'active' : ''}`}
                        onClick={() => setActiveTab('claims')}
                    >
                        <ClipboardList size={20} /> View Claims
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        <Settings size={20} /> Settings
                    </button>
                    <a href="/" className="nav-item" style={{ marginTop: 'auto', textDecoration: 'none' }}>
                        <ArrowLeft size={20} /> Back to Home
                    </a>
                    <button onClick={handleLogout} className="nav-item" style={{ marginTop: '0.5rem', color: '#e53e3e' }}>
                        <LogOut size={20} /> Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <h2>Dashboard Overview</h2>
                    <div className="admin-profile">Admin User</div>
                </header>

                <div className="admin-stats">
                    <div className="stat-card">
                        <TrendingUp size={24} className="stat-icon" />
                        <div className="stat-info">
                            <p>Total Claims</p>
                            <h3>1,432</h3>
                        </div>
                    </div>
                    <div className="stat-card">
                        <List size={24} className="stat-icon" />
                        <div className="stat-info">
                            <p>Active Offers</p>
                            <h3>12</h3>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Users size={24} className="stat-icon" />
                        <div className="stat-info">
                            <p>Partner Requests</p>
                            <h3>48</h3>
                        </div>
                    </div>
                </div>

                <div className="admin-content-area glass-panel">
                    {activeTab === 'offers' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="content-header">
                                <h3>Manage Offers</h3>
                                <button 
                                    className="btn-primary" 
                                    style={{ padding: '0.5rem 1rem' }}
                                    onClick={() => setActiveTab('add')}
                                >
                                    <Plus size={16} /> New Entry
                                </button>
                            </div>

                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Brand</th>
                                        <th>Offer Title</th>
                                        <th>Total Claims</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {offers.map(offer => (
                                        <tr key={offer.id}>
                                            <td><strong>{offer.brand}</strong></td>
                                            <td>{offer.title}</td>
                                            <td>{offer.claims}</td>
                                            <td>
                                                <span className={`status-badge ${offer.status.toLowerCase()}`}>
                                                    {offer.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button 
                                                    className="action-btn"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleOfferToggle(offer.id)}
                                                >
                                                    {offer.status === 'Active' ? 'Pause' : 'Activate'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    )}

                    {activeTab === 'add' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h3>Add New Offer</h3>
                            <form className="admin-form">
                                <div className="admin-form-group">
                                    <label>Brand Name</label>
                                    <input type="text" placeholder="e.g. Acme Inc" />
                                </div>
                                <div className="admin-form-group">
                                    <label>Offer Title</label>
                                    <input type="text" placeholder="e.g. 50% Off Annual Plan" />
                                </div>
                                <div className="admin-form-group">
                                    <label>Original Price</label>
                                    <input type="text" placeholder="$100" />
                                </div>
                                <div className="admin-form-group">
                                    <label>Discounted Price</label>
                                    <input type="text" placeholder="$50" />
                                </div>
                                <button className="btn-primary" style={{ marginTop: '1rem' }}>Submit Offer</button>
                            </form>
                        </motion.div>
                    )}

                    {activeTab === 'requests' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="content-header">
                                <h3>Partner Requests (Brands)</h3>
                            </div>
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Company</th>
                                        <th>Email</th>
                                        <th>Date Applied</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map(req => (
                                        <tr key={req.id}>
                                            <td><strong>{req.company}</strong></td>
                                            <td>{req.email}</td>
                                            <td>{req.date}</td>
                                            <td>
                                                <span className={`status-badge ${req.status.toLowerCase()}`}>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button 
                                                    className="action-btn"
                                                    onClick={() => handleReviewToggle(req.id)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {req.status === 'Pending' ? 'Mark Reviewed' : 'Undo Review'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    )}

                    {activeTab === 'claims' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="content-header">
                                <h3>Recent Drop Claims</h3>
                            </div>
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Email</th>
                                        <th>Drop Claimed</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MOCK_CLAIMS.map(claim => (
                                        <tr key={claim.id}>
                                            <td><strong>{claim.user}</strong></td>
                                            <td>{claim.email}</td>
                                            <td>{claim.drop}</td>
                                            <td>{claim.date}</td>
                                            <td>
                                                <span className={`status-badge ${claim.status.toLowerCase()}`}>
                                                    {claim.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    )}

                    {activeTab === 'settings' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h3>System Settings</h3>
                            <p>Module under construction...</p>
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
