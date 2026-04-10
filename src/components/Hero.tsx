import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import './Hero.css';

const Hero = () => {
    const { scrollY } = useScroll();
    const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);

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


            </div>
        </section>
    );
};

export default Hero;
