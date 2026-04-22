
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

import './CTASection.css';

const CTASection = () => {
    return (
        <section className="cta-section">
            <div className="cta-bg-animation">
                <div className="glow-1"></div>
                <div className="glow-2"></div>
            </div>

            <div className="container relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="cta-content"
                >
                    <h2 className="cta-title">Turn Your Launch Into a Sales Machine</h2>
                    <p className="cta-subtitle">
                        Join the ranks of premium brands acquiring thousands of customers overnight. Space is extremely limited.
                    </p>

                    <div className="cta-actions">
                        <a href="#partner" className="btn-primary cta-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                            Apply For Next Drop <Rocket size={20} />
                        </a>
                    </div>

                    <p className="cta-note">Applications are manually reviewed for quality.</p>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
