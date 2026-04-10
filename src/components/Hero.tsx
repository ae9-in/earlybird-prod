import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MoveRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import './Hero.css';

const Hero = () => {
    const { scrollY } = useScroll();
    const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);
    const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -200]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 }
        }
    };

    return (
        <section className="hero-section">
            <div className="hero-bg-wrapper">
                <motion.img
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1600"
                    alt="Partnership"
                    style={{ scale, width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                    className="hero-premium-img"
                />
                <div className="hero-gradient-overlay"></div>
            </div>

            <div className="container hero-content">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="hero-text-wrapper"
                >
                    <motion.div variants={itemVariants} className="tag premium-tag">Exclusive Access</motion.div>
                    <motion.h1 variants={itemVariants} className="hero-title">
                        <span className="text-gradient">Launch Faster.</span> <br />
                        Convert Instantly.
                    </motion.h1>
                    <motion.p variants={itemVariants} className="hero-subtitle">
                        Partner with Early Bird. We engineer highly curated, viral moments for brands
                        wanting to acquire zero-CAC customers through explosive drops.
                    </motion.p>

                    <motion.div variants={itemVariants} className="hero-actions">
                        <MagneticButton intensity={0.4}>
                            <a href="#deals" className="btn-primary" style={{ textDecoration: 'none', display: 'flex' }}>
                                See How We Pitch <ArrowRight size={18} />
                            </a>
                        </MagneticButton>
                        <MagneticButton intensity={0.2}>
                            <a href="#partner" className="btn-secondary" style={{ textDecoration: 'none' }}>
                                Join The Waitlist
                            </a>
                        </MagneticButton>
                    </motion.div>
                </motion.div>

                {/* Decorative Graphic Element rather than plain cards */}
                <div className="hero-visuals">
                    <motion.div
                        className="floating-card glass-panel premium-glass"
                        style={{ y: y1 }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        <div className="card-header">
                            <div
                                className="brand-avatar bg-cover"
                                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=200)' }}
                            ></div>
                            <div className="brand-info">
                                <h4>Partner Growth</h4>
                                <p>Volume Acquired</p>
                            </div>
                        </div>
                        <div className="card-price">
                            <span className="discounted">12.5k</span>
                            <span style={{ color: 'var(--primary-dark-green)', fontWeight: '600' }}>Users</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '100%' }}></div>
                        </div>
                        <p className="inventory-text">Sold Out in 4h</p>
                    </motion.div>

                    <motion.div
                        className="floating-card glass-panel premium-glass card-small"
                        style={{ y: y2 }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        <div className="card-image-bg" style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=400)',
                            height: '80px',
                            borderRadius: '12px',
                            marginBottom: '1rem',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}></div>
                        <div className="card-header" style={{ marginBottom: 0 }}>
                            <div className="brand-info">
                                <h4>Conversion</h4>
                                <div className="stat-growth">+340% <MoveRight className="up-icon" size={14} /></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
