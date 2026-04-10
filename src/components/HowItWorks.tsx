import { motion } from 'framer-motion';
import { Handshake, BadgePercent, Search, Zap } from 'lucide-react';
import './HowItWorks.css';

const steps = [
    {
        id: 1,
        title: "Brands Partner",
        description: "Launch-ready startups and established brands partner with Early Bird.",
        icon: <Handshake size={32} />
    },
    {
        id: 2,
        title: "Irresistible Offers",
        description: "We craft limited-time, slash-price offers that users can't ignore.",
        icon: <BadgePercent size={32} />
    },
    {
        id: 3,
        title: "Users Discover",
        description: "Our community of early adopters access the exclusive drop.",
        icon: <Search size={32} />
    },
    {
        id: 4,
        title: "Instant Conversions",
        description: "Brands acquire high-intent customers in record time.",
        icon: <Zap size={32} />
    }
];

const HowItWorks = () => {
    return (
        <section className="section-padding how-it-works" id="how-it-works" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Animated Market Graph Background */}
            <div style={{ position: 'absolute', top: '10%', left: 0, width: '100%', height: '80%', zIndex: 1, opacity: 0.15, pointerEvents: 'none' }}>
                <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="none" style={{ opacity: 0.8 }}>
                    <defs>
                        <linearGradient id="marketGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary-dark-green)" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="var(--primary-dark-green)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <motion.path
                        d="M0 600 L 0 500 C 200 480, 300 400, 450 380 C 600 360, 700 250, 850 200 C 1000 150, 1100 100, 1200 50 L 1200 600 Z"
                        fill="url(#marketGradient)"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                    />
                    <motion.path
                        d="M0 500 C 200 480, 300 400, 450 380 C 600 360, 700 250, 850 200 C 1000 150, 1100 100, 1200 50"
                        fill="none"
                        stroke="var(--primary-dark-green)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 2, ease: "easeOut", delay: 0.4 }}
                    />

                    {/* Animated Data Points */}
                    <motion.circle cx="450" cy="380" r="12" fill="var(--background-cream)" stroke="var(--primary-dark-green)" strokeWidth="6"
                        initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.2, type: "spring" }} />
                    <motion.circle cx="850" cy="200" r="12" fill="var(--background-cream)" stroke="var(--primary-dark-green)" strokeWidth="6"
                        initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.8, type: "spring" }} />
                    <motion.circle cx="1200" cy="50" r="16" fill="var(--background-cream)" stroke="var(--primary-dark-green)" strokeWidth="8"
                        initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 2.2, type: "spring" }} />
                </svg>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="tag" style={{ backgroundColor: 'white', color: 'var(--primary-dark-green)', border: '1px solid var(--primary-dark-green)' }}>The Process</div>
                    <h2>How It Works</h2>
                    <p>A seamless bridge between high-growth brands and eager early adopters.</p>
                </motion.div>

                <div className="process-grid">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            className="process-card glass-panel"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                        >
                            <div className="step-number">0{step.id}</div>
                            <div className="icon-wrapper">
                                {step.icon}
                            </div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>

                            {/* Decorative huge watermark number behind each step */}
                            <div
                                className="step-watermark"
                                style={{
                                    position: 'absolute',
                                    fontSize: '8rem',
                                    fontWeight: 900,
                                    color: 'rgba(84, 107, 65, 0.04)',
                                    zIndex: -2,
                                    bottom: '-1rem',
                                    right: '-0.5rem',
                                    lineHeight: 1,
                                    userSelect: 'none'
                                }}
                            >
                                0{step.id}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
