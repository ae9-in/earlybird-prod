
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.2rem' }}>
                            <img src="/favicon.png" alt="Logo" style={{ height: '32px', width: '32px', marginRight: '10px', borderRadius: '6px' }} />
                            <h3 style={{ margin: 0 }}>Early Bird</h3>
                        </div>
                        <p>Premium curated drops for early adopters and high-growth brands.</p>
                    </div>

                    <div className="footer-links">
                        <div className="link-group">
                            <h4>Platform</h4>
                            <ul>
                                <li><a href="#deals">Explore Deals</a></li>
                                <li><a href="#how-it-works">How It Works</a></li>
                                <li><a href="#why-it-works">For Brands</a></li>
                            </ul>
                        </div>

                        <div className="link-group">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#partner">Partner With Us</a></li>
                                <li><a href="/admin-earlybird">Admin Login</a></li>
                            </ul>
                        </div>

                        <div className="link-group">
                            <h4>Legal</h4>
                            <ul>
                                <li><a href="#">Terms of Service</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                            </ul>
                        </div>

                        <div className="link-group">
                            <h4>Contact</h4>
                            <ul style={{ fontSize: '0.9rem', color: 'rgba(31, 40, 24, 0.7)', gap: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                                <li>BHive Jaynagar</li>
                                <li>+91 98800 21513</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Early Bird. All rights reserved. <span style={{ opacity: 0.3, fontSize: '0.7rem' }}>v2.0.4-PROD</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
