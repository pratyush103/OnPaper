import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Homestyles.css'; // Assuming you have a CSS file for additional styles

const Home = () => {
    return (
        <div id="page-top">
            {/* Navigation */}
            {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                <div className="container px-4">
                    <a className="navbar-brand" href="#page-top">Start Bootstrap</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                            <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
                            <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </nav> */}

            {/* Header */}
            <header className="bg-primary bg-gradient text-white">
                <div className="container px-4 text-center">
                    <h1 className="fw-bolder">Welcome to Scrolling Nav</h1>
                    <p className="lead">A functional Bootstrap 5 boilerplate for one page scrolling websites</p>
                    <a className="btn btn-lg btn-light" href="#about">Start scrolling!</a>
                </div>
            </header>

            {/* About section */}
            <section id="about">
                <div className="container px-4">
                    <div className="row gx-4 justify-content-center">
                        <div className="col-lg-8">
                            <h2>About this page</h2>
                            <p className="lead">This is a great place to talk about your webpage. This template is purposefully unstyled so you can use it as a boilerplate or starting point for you own landing page designs! This template features:</p>
                            <ul>
                                <li>Clickable nav links that smooth scroll to page sections</li>
                                <li>Responsive behavior when clicking nav links perfect for a one page website</li>
                                <li>Bootstrap's scrollspy feature which highlights which section of the page you're on in the navbar</li>
                                <li>Minimal custom CSS so you are free to explore your own unique design options</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services section */}
            <section className="bg-light" id="services">
                <div className="container px-4">
                    <div className="row gx-4 justify-content-center">
                        <div className="col-lg-8">
                            <h2>Services we offer</h2>
                            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut optio velit inventore, expedita quo laboriosam possimus ea consequatur vitae, doloribus consequuntur ex. Nemo assumenda laborum vel, labore ut velit dignissimos.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact section */}
            <section id="contact">
                <div className="container px-4">
                    <div className="row gx-4 justify-content-center">
                        <div className="col-lg-8">
                            <h2>Contact us</h2>
                            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero odio fugiat voluptatem dolor, provident officiis, id iusto! Obcaecati incidunt, qui nihil beatae magnam et repudiandae ipsa exercitationem, in, quo totam.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-5 bg-dark">
                <div className="container px-4">
                    <p className="m-0 text-center text-white">Copyright &copy; Your Website 2023</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;