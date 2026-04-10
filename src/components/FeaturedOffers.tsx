import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import './FeaturedOffers.css';

const pitchCards = [
    {
        id: "pitch-1",
        tag: "The Unfair Advantage",
        title: "Zero-CAC Domination",
        description: "Traditional ad spend is burning your runway. We replace it with direct, high-intent momentum drops that acquire users without the middleman.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        stat: "0%",
        statLabel: "Ad Spend Required"
    },
    {
        id: "pitch-2",
        tag: "Exclusivity Mechanism",
        title: "Manufactured FOMO",
        description: "By strictly limiting access, our drops trigger psychological urgency. Consumers don't just buy; they fight to buy before the window closes.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
        stat: "14x",
        statLabel: "Conversion Multiplier"
    },
    {
        id: "pitch-3",
        tag: "Brand Elevation",
        title: "Prestige Placement",
        description: "We don't put you next to cheap competitors. You are placed alongside the most coveted tech startups in the world in a pristine, high-end environment.",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800",
        stat: "Top 1%",
        statLabel: "Curated Brands"
    }
];

interface PitchCard {
    id: string;
    tag: string;
    title: string;
    description: string;
    image: string;
    stat: string;
    statLabel: string;
}

const TiltCard = ({ card, index }: { card: PitchCard; index: number }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

    const rotateX = useMotionTemplate`${mouseYSpring}deg`;
    const rotateY = useMotionTemplate`${mouseXSpring}deg`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width - 0.5) * 2;
        const yPct = (mouseY / height - 0.5) * 2;

        x.set(xPct * 15); // Adjust intensity of rotateY
        y.set(yPct * -15); // Adjust intensity of rotateX
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="pitch-card-wrapper"
            style={{
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
                perspective: 1000
            }}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
            <div
                className="pitch-card premium-glass"
                style={{
                    transform: "translateZ(30px)",
                    transformStyle: "preserve-3d",
                    backgroundColor: '#dbe6cc1a', // Sage blend in Hex-Alpha for stability
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <div
                    className="pitch-image-wrapper"
                    style={{ transform: "translateZ(40px)" }}
                >
                    <div
                        className="pitch-image"
                        style={{ backgroundImage: `url(${card.image})` }}
                    ></div>
                    <motion.div
                        className="pitch-tag-badge"
                        style={{ transform: "translateZ(50px)" }}
                    >
                        {card.tag}
                    </motion.div>
                </div>
                <div className="pitch-content" style={{ transform: "translateZ(20px)" }}>
                    <h3 className="pitch-title">{card.title}</h3>
                    <p className="pitch-desc">{card.description}</p>

                    <div className="pitch-footer">
                        <div className="pitch-stat-box">
                            <span className="p-stat-val">{card.stat}</span>
                            <span className="p-stat-label">{card.statLabel}</span>
                        </div>
                        <motion.a
                            href="#partner"
                            className="pitch-action-btn"
                            whileHover={{ scale: 1.15, backgroundColor: "var(--primary-dark-green)", color: "white" }}
                            whileTap={{ scale: 0.95 }}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'inherit' }}
                        >
                            <ArrowUpRight size={24} />
                        </motion.a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const FeaturedOffers = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start center"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

    return (
        <div ref={containerRef} style={{ perspective: 1000, overflow: 'visible', backgroundColor: 'transparent', position: 'relative', zIndex: 10, marginTop: '-60px' }}>
            <motion.section
                className="section-padding pitch-section"
                id="deals"
                style={{
                    scale,
                    y,
                    opacity,
                    backgroundColor: 'var(--primary-dark-green)',
                    color: 'var(--background-cream)',
                    transformOrigin: 'top center',
                    borderTopLeftRadius: '48px',
                    borderTopRightRadius: '48px',
                    paddingBottom: '8rem',
                    boxShadow: '0 -20px 50px rgba(0,0,0,0.1)',
                    position: 'relative',
                    zIndex: 20
                }}
            >
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="tag" style={{ marginBottom: '1rem', backgroundColor: 'var(--secondary-green)', color: 'white', border: 'none' }}>Our Philosophy</div>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em', fontWeight: 800 }}>The New Standard <br /> of <span style={{ color: 'var(--soft-beige)' }}>Launch Strategy.</span></h2>
                        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', color: 'rgba(255,248,236,0.8)' }}>Skip the traditional marketing agency. We build explosive drop events for products that deserve the spotlight.</p>
                    </motion.div>

                    <div
                        className="pitch-grid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '2.5rem',
                            marginTop: '5rem',
                            perspective: '1500px'
                        }}
                    >
                        {pitchCards.map((card, index) => (
                            <TiltCard key={card.id} card={card} index={index} />
                        ))}
                    </div>

                    <div className="view-all-wrapper" style={{ marginTop: '5rem' }}>
                        <MagneticButton intensity={0.5}>
                            <a href="#partner" className="btn-primary" style={{ backgroundColor: 'var(--background-cream)', color: 'var(--primary-dark-green)', padding: '1.2rem 3.5rem', fontSize: '1.15rem', display: 'inline-block', textDecoration: 'none' }}>Initiate Partnership</a>
                        </MagneticButton>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default FeaturedOffers;
