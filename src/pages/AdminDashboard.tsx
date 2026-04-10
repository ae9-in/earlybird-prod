import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, List, Settings, TrendingUp, Users } from 'lucide-react';
import './AdminDashboard.css';

const MOCK_OFFERS = [
    { id: 1, brand: "Notion Template Co.", title: "Founder OS", claims: 45, status: "Active" },
    { id: 2, brand: "Lumi Desk", title: "Monitor Light Bar", claims: 120, status: "Active" },
    { id: 3, brand: "SaaS Starter", title: "React Boilerplate", claims: 34, status: "Paused" },
];

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('offers');

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
                        className={`nav-item ${activeTab === 'claims' ? 'active' : ''}`}
                        onClick={() => setActiveTab('claims')}
                    >
                        <Users size={20} /> View Claims
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        <Settings size={20} /> Settings
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
                                <button className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
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
                                    {MOCK_OFFERS.map(offer => (
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
                                                <button className="action-btn">Edit</button>
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
                                <div className="form-group">
                                    <label>Brand Name</label>
                                    <input type="text" placeholder="e.g. Acme Inc" />
                                </div>
                                <div className="form-group">
                                    <label>Offer Title</label>
                                    <input type="text" placeholder="e.g. 50% Off Annual Plan" />
                                </div>
                                <div className="form-group">
                                    <label>Original Price</label>
                                    <input type="text" placeholder="$100" />
                                </div>
                                <div className="form-group">
                                    <label>Discounted Price</label>
                                    <input type="text" placeholder="$50" />
                                </div>
                                <button className="btn-primary" style={{ marginTop: '1rem' }}>Submit Offer</button>
                            </form>
                        </motion.div>
                    )}

                    {(activeTab === 'claims' || activeTab === 'settings') && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h3>{activeTab === 'settings' ? 'System Settings' : 'Recent Claims'}</h3>
                            <p>Module under construction...</p>
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
