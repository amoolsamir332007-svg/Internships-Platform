import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import ApplicationsSection from "../../components/Home/ApplicationsSection/ApplicationsSection";
import HeroBackground from "../../components/Home/HeroBackground/HeroBackground";

import heroImage from "../../assets/images/studying (1).svg";
import ScrollToTop from "../../components/common/ScrollToTop/ScrollToTop";
import "./Home.css";

/* Entrance animation variants — staggered reveal for hero content */
const heroContainerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.05,
        },
    },
};

const heroItemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const Home = () => {

    const navigate = useNavigate();

    /* Mouse parallax — normalized -0.5..0.5 offsets from hero-section center */
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.6 });
    const springY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.6 });

    const imageRotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
    const imageRotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
    const imageTranslateX = useTransform(springX, [-0.5, 0.5], [-14, 14]);
    const imageTranslateY = useTransform(springY, [-0.5, 0.5], [-14, 14]);

    const cardOneX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
    const cardOneY = useTransform(springY, [-0.5, 0.5], [-10, 10]);
    const cardTwoX = useTransform(springX, [-0.5, 0.5], [14, -14]);
    const cardTwoY = useTransform(springY, [-0.5, 0.5], [10, -10]);

    const handleHeroMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleHeroMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };


    return (

        <div className="home-page">
            {/* ================= HERO SECTION ================= */}
            <section
                className="hero-section"
                onMouseMove={handleHeroMouseMove}
                onMouseLeave={handleHeroMouseLeave}
            >
                <HeroBackground />

                <motion.div
                    className="hero-container"
                    variants={heroContainerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {/* Left Content */}
                    <div className="hero-content">
                        <motion.span className="hero-badge" variants={heroItemVariants}>
                            🚀 Start Your Career Journey
                        </motion.span>

                        <motion.h1 variants={heroItemVariants}>
                            Find Your Dream
                        <span>Internship</span></motion.h1>

                        <motion.p variants={heroItemVariants}>
                            Discover thousands of internship opportunities
                            from top companies and build your professional
                            future with the right experience.
                        </motion.p>

                        <motion.div className="hero-buttons" variants={heroItemVariants}>

        <button className="primary-btn" onClick={() => navigate("/get-started")}>
            Get Started</button>

                        <button 
                        className="secondary-btn"
                        onClick={() =>
                        document
                        .getElementById("applications")
                        .scrollIntoView({
                        behavior:"smooth"})}>Explore Internships</button>
                                                </motion.div>

                        <motion.div className="hero-features" variants={heroItemVariants}>
                            <div>
                                <strong>
                                    1000+
                                </strong>

                                <span>
                                    Internships
                                </span>

                            </div>
                            <div>
                                <strong>
                                    500+
                                </strong>
                                <span>Companies</span>
                            </div>
                            <div>
                                <strong>10K+</strong>
                                <span>Students</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Image */}
                    <motion.div
                        className="hero-image"
                        variants={heroItemVariants}
                        style={{ perspective: 1000 }}
                    >
                        <div className="image-circle"></div>

                        <motion.img
                            src={heroImage}
                            alt="Internship Platform"
                            style={{
                                rotateX: imageRotateX,
                                rotateY: imageRotateY,
                                x: imageTranslateX,
                                y: imageTranslateY,
                            }}
                        />

                        {/* Floating Cards */}
                        <motion.div
                            className="floating-card card-one"
                            style={{ x: cardOneX, y: cardOneY }}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <span>
                                🎯
                            </span>
                            <div>
                                <h4>AI Matching</h4>
                                <p>
                                    Find best opportunities
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="floating-card card-two"
                            style={{ x: cardTwoX, y: cardTwoY }}
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        >
                            <span>
                                ⭐
                            </span>
                            <div>
                                <h4>
                                    Top Companies
                                </h4>
                                <p>
                                    Verified internships
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>
            {/* ================= TRUSTED COMPANIES ================= */}
            <section className="companies-section">
                <h3> Trusted by students from leading companies </h3>
                <div className="companies-container">
                    <div>
                        Google
                    </div>
                    <div>
                        Microsoft
                    </div>
                    <div>
                        Amazon
                    </div>
                    <div>
                        Meta
                    </div>
                    <div>
                        IBM
                    </div>
                    <div>
                        Oracle
                    </div>
                </div>
            </section>

            {/* ================= FEATURED INTERNSHIPS ================= */}
<section className="featured-section">
    <div className="section-header">
        <span>
            Explore Opportunities
        </span>
        <h2>
            Featured Internships
        </h2>
        <p>
            Discover the latest internship opportunities
            from companies looking for talented students.
        </p>
    </div>
    <ApplicationsSection />
</section>

{/* ================= WHY CHOOSE US ================= */}
<section className="why-section">
    <div className="section-header">
        <span>
            Why Choose Us
        </span>

        <h2>
  <span className="linetitle">Everything You Need To Start</span>
  <span className="linespan">Your Career</span>
</h2>



        <p>
            Our platform connects students with the best
            internship opportunities and helps companies
            discover talented candidates.
        </p>
    </div>
    <div className="features-container">
        <div className="feature-card">
            <div className="feature-icon">
                🎯
            </div>
            <h3>
                Smart Matching
            </h3>
            <p>
                Find internships that match your skills,
                interests, and career goals.
            </p>
        </div>
        <div className="feature-card">
            <div className="feature-icon">
                🏢
            </div>
            <h3>
                Verified Companies
            </h3>
            <p>
                Apply to trusted companies offering
                real internship experiences.
            </p>
        </div>
        <div className="feature-card">
            <div className="feature-icon">
                ⚡
            </div>
            <h3>
                Easy Application
            </h3>
            <p>
                Apply for internships quickly with
                a simple and smooth process.
            </p>
        </div>
        <div className="feature-card">
            <div className="feature-icon">
                🚀
            </div>
            <h3>
                Career Growth
            </h3>
            <p>
                Gain experience and build your
                professional future.
            </p>
        </div>
    </div>
</section>
{/* ================= STATISTICS SECTION ================= */}
<section className="stats-section">
    <div className="stats-container">
        <div className="stat-item">
            <h2>
                1000+
            </h2>
            <p>
                Internship Opportunities
            </p>
        </div>
        <div className="stat-item">
            <h2>500+</h2>
            <p>Partner Companies</p>
        </div>
        <div className="stat-item">
            <h2>10K+</h2>
            <p>Students Joined</p>
        </div>
        <div className="stat-item">
            <h2>98%</h2>
            <p>Success Rate</p>
        </div>
    </div>
</section>
{/* ================= HOW IT WORKS ================= */}
<section className="how-section">
    <div className="section-header">
        <span>
            How It Works
        </span>
        {/* <h2>
            Start Your Internship Journey In 3 Simple Steps
        </h2> */}

        <h2>
  <span className="linetitle">Start Your Internship Journey</span>
  <span className="linespan">In 3 Simple Steps</span>
</h2>
        <p>
            Our platform makes it easier for students
            to discover opportunities and connect with
            companies.
        </p>
    </div>

    <div className="steps-container">
        <div className="step-card">
            <div className="step-number">
                01
            </div>
            <div className="step-icon">
                👤
            </div>
            <h3>
                Create Your Account
            </h3>
            <p>
                Sign up as a student and build your
                professional profile.
            </p>
        </div>
        <div className="step-card">
            <div className="step-number">
                02
            </div>
            <div className="step-icon">
                🔍
            </div>
            <h3>
                Find Internship
            </h3>
            <p>
                Explore hundreds of internship
                opportunities from companies.
            </p>
        </div>
        <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-icon">🚀</div>
            <h3>Start Your Career</h3>
            <p> Apply, gain experience and grow professionally.</p>
        </div>
    </div>
</section>
{/* ================= TESTIMONIALS ================= */}
<section className="testimonials-section">
    <div className="section-header">
        <span>
            Student Success Stories
        </span>
        <h2>
            What Our Students Say
        </h2>
        <p>
            Thousands of students are building their
            careers through our internship platform.
        </p>
    </div>
    <div className="testimonials-container">
        <div className="testimonial-card">
            <div className="user-info">
                <div className="user-image">
                    👩‍💻
                </div>
                <div>
                    <h4>
                        Sarah Ahmed
                    </h4>
                    <span>
                        Software Engineering Student
                    </span>
                </div>
            </div>
            <p>
                "This platform helped me find my first
                internship opportunity. The application
                process was simple and professional."
            </p>
            <div className="stars">
                ⭐⭐⭐⭐⭐
            </div>
        </div>

        <div className="testimonial-card">
            <div className="user-info">
                <div className="user-image">
                    👨‍💻
                </div>
                <div>
                    <h4>
                        Omar Khaled
                    </h4>
                    <span>
                        Computer Engineering Student
                    </span>
                </div>
            </div>
            <p>
                "I connected with a great company and
                gained real-world experience through
                my internship."
            </p>
            <div className="stars">
                ⭐⭐⭐⭐⭐
            </div>
        </div>

        <div className="testimonial-card">
            <div className="user-info">
                <div className="user-image">
                    👩‍🚀
                </div>
                <div>
                    <h4>
                        Lina Hassan
                    </h4>
                    <span>
                        Web Developer
                    </span>
                </div>
            </div>
            <p>
                "A smooth experience from searching
                internships to getting accepted."
            </p>
            <div className="stars">
                ⭐⭐⭐⭐⭐
            </div>
        </div>
    </div>
</section>

{/* ================= CTA SECTION ================= */}


<section className="cta-section">
    <div className="cta-content">
        <h2>
            Ready To Start Your Career
            <span>Journey?</span>
        </h2>
        <p>
            Join thousands of students and discover
            internship opportunities today.
        </p>
        <button onClick={() => navigate("/get-started")}>
            Create Your Account
        </button>
    </div>
</section>
<ScrollToTop />

        </div>
    );
};

export default Home;