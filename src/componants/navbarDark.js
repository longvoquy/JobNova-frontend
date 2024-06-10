import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoDark from "../assets/images/logo-dark.png"
import logoLight from "../assets/images/logo-light.png"
import { LuSearch, FiUser, FiSettings, FiLock, FiLogOut, FiLogIn } from "../assets/icons/vander";

import useUserInfo from '../hook/useUserInfo'
import useEnterpriseInfo from '../hook/useEnterpriseInfo'

export default function NavbarDark() {
    let [isOpen, setMenu] = useState(true);
    let [scroll, setScroll] = useState(false);
    let [search, setSearch] = useState(false);
    let [cartitem, setCartitem] = useState(false);

    let [manu, setManu] = useState('');
    let location = useLocation();
    const cartDropdownRef = useRef(null);
    const navigate = useNavigate();

    const { data: userData } = useUserInfo();
    const { data: enterpriseData } = useEnterpriseInfo();
    
    const userRole = localStorage.getItem("roleUser");
    const enterpriseRole = localStorage.getItem("roleEnterprise");
    const user = userData?.data;
    const enterprise = enterpriseData?.data;

    useEffect(() => {
        let current = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
        setManu(current)
    }, [location.pathname]);

    useEffect(() => {
        function scrollHandler() {
            setScroll(window.scrollY > 50)
        }
        window.addEventListener('scroll', scrollHandler);

        let searchModal = () => { setSearch(false) }
        document.addEventListener('mousedown', searchModal);


        const cartModal = (event) => {
            if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
                setCartitem(false);
            }
        };
        document.addEventListener('mousedown', cartModal);
        window.scrollTo(0, 0);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
            document.removeEventListener('mousedown', searchModal);
            document.removeEventListener('mousedown', cartModal);
        };

    }, []);
    const toggleMenu = () => {
        setMenu(!isOpen)
        if (document.getElementById("navigation")) {
            const anchorArray = Array.from(document.getElementById("navigation").getElementsByTagName("a"));
            anchorArray.forEach(element => {
                element.addEventListener('click', (elem) => {
                    const target = elem.target.getAttribute("href")
                    if (target !== "") {
                        if (elem.target.nextElementSibling) {
                            var submenu = elem.target.nextElementSibling.nextElementSibling;
                            submenu.classList.toggle('open');
                        }
                    }
                })
            });
        }
    }

    const getAvatarUrl = () => {
        if (user?.avatar_url) {
            return user.avatar_url;
        }
         else if (enterprise?.avatar_url) {
            return enterprise.avatar_url;
        }

    };

    const renderUser = () => (
        <div className="dropdown dropdown-primary" ref={cartDropdownRef}>
            <button type="button" onClick={() => setCartitem(!cartitem)} className="dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary">
                <img src={getAvatarUrl()} className="img-fluid rounded-pill" alt="" />
            </button>
            <div style={{ display: cartitem === true ? 'block' : 'none' }}>
                <div className={`dropdown-menu dd-menu dropdown-menu-end bg-white rounded shadow border-0 mt-3 show`}>
                    {userRole && (
                        <Link to="/candidate-profile" className="dropdown-item fw-medium fs-6"><FiUser className="fea icon-sm me-2 align-middle" />Profile</Link>
                    )}{enterpriseRole && (
                        <Link to="/employer-profile" className="dropdown-item fw-medium fs-6"><FiUser className="fea icon-sm me-2 align-middle" />Profile</Link>
                    )}
                    {userRole && (
                        <Link to="/candidate-profile-setting" className="dropdown-item fw-medium fs-6"><FiSettings className="fea icon-sm me-2 align-middle" />Settings</Link>
                    )}{enterpriseRole && (
                        <Link to="/employer-profile-setting" className="dropdown-item fw-medium fs-6"><FiSettings className="fea icon-sm me-2 align-middle" />Settings</Link>
                    )}
                    <div className="dropdown-divider border-top"></div>

                    {/* <Link to="/lock-screen" className="dropdown-item fw-medium fs-6"><FiLock className="fea icon-sm me-2 align-middle" />Lockscreen</Link> */}

                    <span onClick={() => {
                        localStorage.clear();
                        navigate("/");
                        window.location.reload();
                    }} className="dropdown-item fw-medium fs-6"><FiLogOut className="fea icon-sm me-2 align-middle" />Logout</span>
                </div>
            </div>
        </div>
    );

    return (
        <header id="topnav" className={`${scroll ? 'nav-sticky' : ''} defaultscroll sticky`}>
            <div className="container">
                <Link className="logo" to="/">
                    <img src={logoDark} className="logo-light-mode" alt="" />
                    <img src={logoLight} className="logo-dark-mode" alt="" />
                </Link>
                <div className="menu-extras">
                    <div className="menu-item">
                        <Link to='#' className="navbar-toggle" id="isToggle" onClick={toggleMenu}>
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Link>
                    </div>
                </div>

                <ul className="buy-button list-inline mb-0">
                    <li className="list-inline-item ps-1 mb-0">
                        <div className="dropdown">
                            <button type="button" onClick={() => setSearch(!search)} className="dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary">
                                <LuSearch className="icons" />
                            </button>
                            <div style={{ display: search === true ? 'block' : 'none' }}>
                                <div className={`dropdown-menu dd-menu dropdown-menu-end bg-white rounded border-0 mt-3 p-0 show`} style={{ width: '240px', position: 'absolute', right: '0' }}>
                                    <div className="search-bar">
                                        <div id="itemSearch" className="menu-search mb-0">
                                            <form role="search" method="get" id="searchItemform" className="searchform">
                                                <input type="text" className="form-control rounded border" name="s" id="searchItem" placeholder="Search..." />
                                                <input type="submit" id="searchItemsubmit" value="Search" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li className="list-inline-item ps-1 mb-0">
                        {user || enterprise ? (
                            renderUser()
                        ) : (
                            <Link to="/login" className="btn btn-sm btn-icon btn-pills btn-primary">
                                <FiLogIn className="icons" />
                            </Link>
                        )}
                    </li>
                </ul>

                <div id="navigation">
                    <ul className="navigation-menu nav-right">
                        <li className={manu === "index-two" ? "active" : ""}>
                            <Link to="/index-two">Home</Link>
                        </li>

                        <li className={`${["job-categories", "job-grid-two", "job-list-one", "job-detail-three", "job-apply", "job-post", "career"].includes(manu) ? "active" : ""} has-submenu parent-menu-item`}><Link to="#"> Jobs </Link><span className="menu-arrow"></span>

                            <ul className="submenu">
                                {/* Job Categories */}
                                <li className={manu === "job-categories" ? "active" : ""}><Link to="/job-categories" className="sub-menu-item">Job Categories</Link></li>
                                {/* Job Grids Two */}
                                <li className={manu === "job-grid-two" ? "active" : ""}>
                                    <Link to="/job-grid-two"
                                        className="sub-menu-item"> Job Grids</Link>
                                </li>
                                {/* Job Lists One */}
                                <li className={manu === "job-list-one" ? "active" : ""}>
                                    <Link to="/job-list-one"
                                        className="sub-menu-item"> Job Lists</Link>

                                </li>
                                
                            </ul>
                        </li>
                        

                        <li className={`${["aboutus", "services", "pricing", "helpcenter-overview", "helpcenter-faqs", "helpcenter-guides", 'helpcenter-support'].includes(manu) ? "active" : ""} has-submenu parent-menu-item,"blogs", "blog-sidebar","blog-detail","login", "signup","reset-password","lock-screen","terms", "privacy"`}>
                            <Link to="#">Support</Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                <li className={manu === "aboutus" ? "active" : ""}><Link to="/aboutus" className="sub-menu-item">About Us</Link></li>
                                <li className={manu === "services" ? "active" : ""}><Link to="/services" className="sub-menu-item">Services</Link></li>
                                <li className={manu === "pricing" ? "active" : ""}><Link to="/pricing" className="sub-menu-item">Pricing </Link></li>

                                <li className={`${["helpcenter-overview", "helpcenter-faqs", "helpcenter-guides", 'helpcenter-support'].includes(manu) ? "active" : ""} has-submenu parent-menu-item`}>
                                    <Link to="#"> Helpcenter </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li className={manu === "helpcenter-overview" ? "active" : ""}><Link to="/helpcenter-overview" className="sub-menu-item">Overview</Link></li>
                                        <li className={manu === "helpcenter-faqs" ? "active" : ""}><Link to="/helpcenter-faqs" className="sub-menu-item">FAQs</Link></li>
                                        <li className={manu === "helpcenter-guides" ? "active" : ""}><Link to="/helpcenter-guides" className="sub-menu-item">Guides</Link></li>
                                        <li className={manu === "helpcenter-support" ? "active" : ""}><Link to="/helpcenter-support" className="sub-menu-item">Support</Link></li>
                                    </ul>
                                </li>

                                <li className={`${["blogs", "blog-sidebar", "blog-detail"].includes(manu) ? "active" : ""} has-submenu parent-menu-item`}><Link to="#"> Blog </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li className={manu === "blogs" ? "active" : ""}><Link to="/blogs" className="sub-menu-item"> Blogs</Link></li>
                                        <li className={manu === "blog-sidebar" ? "active" : ""}><Link to="/blog-sidebar" className="sub-menu-item"> Blog Sidebar</Link></li>
                                        <li className={manu === "blog-detail" ? "active" : ""}><Link to="/blog-detail" className="sub-menu-item"> Blog Detail</Link></li>
                                    </ul>
                                </li>

                                {/* <li className={`${["login", "signup", "reset-password", "lock-screen"].includes(manu) ? "active" : ""} has-submenu parent-menu-item`}><Link to="#"> Auth Pages </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li className={manu === "login" ? "active" : ""}><Link to="/login" className="sub-menu-item"> Login</Link></li>
                                        <li className={manu === "signup" ? "active" : ""}><Link to="/signup" className="sub-menu-item"> Signup</Link></li>
                                        <li className={manu === "reset-password" ? "active" : ""}><Link to="/reset-password" className="sub-menu-item"> Forgot Password</Link></li>
                                        <li className={manu === "lock-screen" ? "active" : ""}><Link to="/lock-screen" className="sub-menu-item"> Lock Screen</Link></li>
                                    </ul>
                                </li> */}

                                {/* <li className={`${["terms", "privacy"].includes(manu) ? "active" : ""} has-submenu parent-menu-item`}><Link to="#"> Utility </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li className={manu === "terms" ? "active" : ""}><Link to="/terms" className="sub-menu-item">Terms of Services</Link></li>
                                        <li className={manu === "privacy" ? "active" : ""}><Link to="/privacy" className="sub-menu-item">Privacy Policy</Link></li>
                                    </ul>
                                </li> */}

                                {/* <li className={`${["comingsoon", "maintenance", "error"].includes(manu) ? "active" : ""} has-submenu parent-menu-item`}><Link to="#"> Special </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li className={manu === "comingsoon" ? "active" : ""}><Link to="/comingsoon" className="sub-menu-item"> Coming Soon</Link></li>
                                        <li className={manu === "maintenance" ? "active" : ""}><Link to="/maintenance" className="sub-menu-item"> Maintenance</Link></li>
                                        <li className={manu === "error" ? "active" : ""}><Link to="/error" className="sub-menu-item"> 404! Error</Link></li>
                                    </ul>
                                </li> */}
                            </ul>
                        </li>
                        <li className={`${["blogs", "blog-sidebar", "blog-detail"].includes(manu) ? "active" : ""} has-submenu parent-menu-item`}><Link to="#"> Blog </Link><span className="submenu-arrow"></span>
                            <ul className="submenu">
                                <li className={manu === "blogs" ? "active" : ""}><Link to="/blogs" className="sub-menu-item"> Blogs</Link></li>
                                <li className={manu === "blog-sidebar" ? "active" : ""}><Link to="/blog-sidebar" className="sub-menu-item"> Blog Sidebar</Link></li>
                                <li className={manu === "blog-detail" ? "active" : ""}><Link to="/blog-detail" className="sub-menu-item"> Blog Detail</Link></li>
                            </ul>
                        </li>
                        <li className={manu === "contactus" ? "active" : ""}><Link to="/contactus" className="sub-menu-item">Contact Us</Link></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}