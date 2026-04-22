
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

import './WhyItWorks.css';

const WhyItWorks = () => {
    return (
        <section className="section-padding why-it-works" id="why-it-works">
            <div className="container why-grid">
                <motion.div
                    className="why-content"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="tag" style={{ marginBottom: '1rem' }}>The Strategy</div>
                    <h2>Why Early Bird Works</h2>
                    <p className="subtitle">
                        We don't just list products. We create viral, scarcity-driven events that drive massive conversions in hours.
                    </p>

                    <ul className="benefits-list">
                        <li>
                            <CheckCircle2 className="benefit-icon" size={24} />
                            <div>
                                <h4>Scarcity-Driven Sales</h4>
                                <p>Limited quantities and timeframes force immediate action.</p>
                            </div>
                        </li>
                        <li>
                            <CheckCircle2 className="benefit-icon" size={24} />
                            <div>
                                <h4>High Conversion Strategy</h4>
                                <p>Curation + Insane value = Conversion rates that break metrics.</p>
                            </div>
                        </li>
                        <li>
                            <CheckCircle2 className="benefit-icon" size={24} />
                            <div>
                                <h4>Early Traction for Brands</h4>
                                <p>Perfect for startups looking for immediate cash flow and early adopters.</p>
                            </div>
                        </li>
                    </ul>

                    <div style={{ marginTop: '3rem' }}>
                        <a href="#partner" className="btn-secondary" style={{ padding: '0.8rem 2rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'transparent', border: '1px solid var(--primary-dark-green)', color: 'var(--primary-dark-green)', borderRadius: '100px', fontWeight: 600, transition: 'all 0.3s ease' }}
                            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary-dark-green)'; e.currentTarget.style.color = 'white'; }}
                            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--primary-dark-green)'; }}>
                            Start Scaling Now <ArrowRight size={18} />
                        </a>
                    </div>
                </motion.div>

                <div className="why-visual">
                    <div className="visual-card glass-panel">
                        <div className="card-header border-bottom">
                            <h4>Growth Trajectory</h4>
                        </div>

                        <div className="chart-container">
                            <div className="chart-bars">
                                {[40, 65, 30, 85, 120, 150].map((height, i) => (
                                    <motion.div
                                        key={i}
                                        className="chart-bar"
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${height}px` }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                                    >
                                        <div className="bar-tooltip">+{height}%</div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Optional animated line */}
                            <motion.svg className="growth-line" viewBox="0 0 300 150" preserveAspectRatio="none">
                                <motion.path
                                    d="M0,130 C50,130 50,90 100,90 C150,90 150,110 200,80 C250,50 250,10 300,10"
                                    fill="none"
                                    stroke="var(--primary-dark-green)"
                                    strokeWidth="4"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                                />
                            </motion.svg>
                        </div>

                        <div className="stats-row">
                            <div className="stat">
                                <div className="stat-label">Conversion</div>
                                <div className="stat-value text-gradient">24.5%</div>
                            </div>
                            <div className="stat">
                                <div className="stat-label">Avg Output</div>
                                <div className="stat-value text-gradient">12h</div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <motion.div
                        className="decorative-circle"
                        animate={{
                            y: [0, -15, 0],
                            rotate: [0, 10, 0]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    ></motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhyItWorks;
