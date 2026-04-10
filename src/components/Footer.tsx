
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>Early Bird</h3>
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
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Early Bird. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
