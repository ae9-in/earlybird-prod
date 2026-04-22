import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

import './PartnerWithUs.css';

const PartnerWithUs = () => {
    const [formState, setFormState] = useState({
        brandName: '',
        category: '',
        offerDetails: '',
        contactInfo: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section className="section-padding partner-section" id="partner">
            {/* Background elements */}
            <div className="partner-bg blob blob-3"></div>

            <div className="container">
                <div className="partner-content text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="tag" style={{ marginBottom: '1rem' }}>Collaboration</div>
                        <h2 className="section-title">Drop With Early Bird</h2>
                        <p className="section-subtitle">
                            Have a viral product ready for a surge of new customers?
                            Partner with us to create an exclusive offer.
                        </p>
                    </motion.div>

                    <motion.div
                        className="form-wrapper glass-panel"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {submitted ? (
                            <div className="partner-success-message" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                                <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', damping: 15 }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary-dark-green)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary-dark-green)' }}>Application Received</h3>
                                    <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '400px', margin: '0 auto', color: 'var(--text-dark)' }}>
                                        Thank you, {formState.brandName || 'Partner'}. Our team will review your product and reach out within 24 hours if it's a good fit for an Early Bird Drop.
                                    </p>
                                    <button
                                        onClick={() => { setFormState({ brandName: '', category: '', offerDetails: '', contactInfo: '' }); setSubmitted(false); }}
                                        style={{ marginTop: '2rem', background: 'transparent', border: 'none', textDecoration: 'underline', cursor: 'pointer', color: 'var(--primary-dark-green)', fontWeight: 600 }}
                                    >
                                        Submit another product
                                    </button>
                                </motion.div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="partner-form">
                                <div className="form-row">
                                    <div className={`form-group ${formState.brandName ? 'has-value' : ''}`}>
                                        <input
                                            type="text"
                                            name="brandName"
                                            id="brandName"
                                            value={formState.brandName}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="brandName">Brand Name</label>
                                        <div className="input-focus-bg"></div>
                                    </div>

                                    <div className={`form-group ${formState.category ? 'has-value' : ''}`}>
                                        <input
                                            type="text"
                                            name="category"
                                            id="category"
                                            value={formState.category}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="category">Product Category</label>
                                        <div className="input-focus-bg"></div>
                                    </div>
                                </div>

                                <div className={`form-group ${formState.contactInfo ? 'has-value' : ''}`}>
                                    <input
                                        type="email"
                                        name="contactInfo"
                                        id="contactInfo"
                                        value={formState.contactInfo}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="contactInfo">Email Address</label>
                                    <div className="input-focus-bg"></div>
                                </div>

                                <div className={`form-group ${formState.offerDetails ? 'has-value' : ''}`}>
                                    <textarea
                                        name="offerDetails"
                                        id="offerDetails"
                                        rows={4}
                                        value={formState.offerDetails}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                    <label htmlFor="offerDetails">Tell us about your product & offer idea</label>
                                    <div className="input-focus-bg"></div>
                                </div>

                                <button type="submit" className="btn-primary submit-btn">
                                    Apply to Drop <Send size={18} />
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PartnerWithUs;
