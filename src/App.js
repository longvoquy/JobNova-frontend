import React from "react";
import { Route, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./assets/scss/style.scss"
import "./assets/css/materialdesignicons.min.css"
import Index from "./pages";
import IndexTwo from "./pages/index-two";

import JobCategories from "./pages/job-categories";
import JobGridTwo from "./pages/job-grid-two";
import JobListOne from "./pages/job-list-one";
import JobApply from "./pages/job-apply";
import JobPost from "./pages/job-post";
import Career from "./pages/career";
import JobDetailThree from "./pages/job-detail-three";

import Employers from "./pages/employers";
import EmployerProfile from "./pages/employer-profile";
import Candidates from "./pages/candidates";
import CandidateProfile from "./pages/candidate-profile";
import CandidateProfileSetting from "./pages/candidate-profile-setting";
import AboutUs from "./pages/aboutus";
import Services from "./pages/services";
import Pricing from "./pages/pricing";
import HelpcenterOverview from "./pages/helpcenter-overview";
import HelpcenterFaq from "./pages/helpcenter-faqs";
import HelpcenterGuides from "./pages/helpcenter-guides";
import HelpcenterSupport from "./pages/helpcenter-support";
import Blogs from "./pages/blogs";
import BlogSidebar from "./pages/blog-sidebar";
import BlogDetail from "./pages/blog-detail";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import ResetPassword from "./pages/reset-password/reset-password";
import LockScreen from "./pages/lock-screen";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import ContactUs from "./pages/contactus";
import Error from "./pages/error";
import Comingsoom from "./pages/comingsoon";
import Maintenance from "./pages/maintenance";

import LoginEn from "./pages/login/loginAsEn";
import SignupEn from "./pages/signup/signupAsEn";
import ResetPasswordEn from "./pages/reset-password/reset-passwordAsEn";
import UpdatePassword from "./pages/update-password/update-password";
import UpdatePasswordEn from "./pages/update-password/update-passwordAsEn";
import CreatePassword from "./pages/change-password/create-password"
import CreatePasswordEn from "./pages/change-password/create-passwordAsEn";
import ProtectedRoute from './hook/useProtectRoute';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' exact element={<Index />} />
        <Route path='/index-two' element={<IndexTwo />}  />
        <Route path='/job-categories' element={<JobCategories/>}  />
        <Route path='/job-grid-two'  element={<JobGridTwo/>}  />
        <Route path='/job-list-one'  element={<JobListOne/>} />
        <Route path='/job-apply' element={<ProtectedRoute element={JobApply} />} />
        <Route path='/job-post' element={<ProtectedRoute element={JobPost} />} />
        <Route path='/career' element={<ProtectedRoute element={Career} />} />
        <Route path='/job-detail-three' element={<JobDetailThree/>} />
        <Route path='/job-detail-three/:id'  element={<JobDetailThree/>} />

        <Route path='/employers' element={<ProtectedRoute element={Employers} />} />
        <Route path='/employer-profile'  element={<EmployerProfile/>} />
        <Route path='/employer-profile/:id' element={<ProtectedRoute element={EmployerProfile} />} />

        <Route path='/candidates' element={<ProtectedRoute element={Candidates} />} />
        <Route path='/candidate-profile' element={<ProtectedRoute element={CandidateProfile} />} />
        <Route path='/candidate-profile/:id' element={<ProtectedRoute element={CandidateProfile} />} />
        <Route path='/candidate-profile-setting' element={<ProtectedRoute element={CandidateProfileSetting} />} />

        <Route path='/aboutus'  element={<AboutUs/>} />
        <Route path='/services'  element={<Services/>}  />
        <Route path='/pricing' element={<Pricing/>}  />
        <Route path='/helpcenter-overview'  element={<HelpcenterOverview/>}  />
        <Route path='/helpcenter-faqs' element={<HelpcenterFaq/>} />
        <Route path='/helpcenter-guides' element={<HelpcenterGuides/>} />
        <Route path='/helpcenter-support'  element={<HelpcenterSupport/>}  />
        <Route path='/blogs' element={<Blogs/>} />
        <Route path='/blog-sidebar' element={<BlogSidebar/>}  />
        <Route path='/blog-detail'  element={<BlogDetail/>}  />
        <Route path='/blog-detail/:id'  element={<BlogDetail/>}  />
        <Route path='/login' element={<Login />} />
        <Route path='/En-login' element={<LoginEn />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/En-signup' element={<SignupEn />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/En-reset-password' element={<ResetPasswordEn />} />
        <Route path='/lock-screen' element={<LockScreen />} />

        <Route path='/terms'  element={<Terms/>}  />
        <Route path='/privacy' element={<Privacy/>}  />
        <Route path='/contactus' element={<ContactUs/>}  />
        <Route path='*'  element={<Error/>}  />
        <Route path='/error'  element={<Error/>}  />
        <Route path='/comingsoon'  element={<Comingsoom/>}  />
        <Route path='/maintenance'  element={<Maintenance/>}  />
        <Route path='/update-password' element={<ProtectedRoute element={UpdatePassword} />} />
        <Route path='/En-update-password' element={<ProtectedRoute element={UpdatePasswordEn} />} />
        <Route path='/change-password' element={<ProtectedRoute element={CreatePassword} />} />
        <Route path='/En-change-password' element={<ProtectedRoute element={CreatePasswordEn} />} />
      </Routes>
    </>
  );
}

export default App;
