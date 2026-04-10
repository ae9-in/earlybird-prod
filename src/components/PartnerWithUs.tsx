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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted: ", formState);
        // Submit logic
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
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PartnerWithUs;
