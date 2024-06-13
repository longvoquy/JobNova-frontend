import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import bg1 from "../assets/images/hero/bg.jpg";
import logo1 from "../assets/images/company/lenovo-logo.png";
import useUserInfo from "../hook/useUserInfo";
import Navbar from "../componants/navbar";
import Footer from "../componants/footer";
import ScrollTop from "../componants/scrollTop";
import api from "../api/http";

export default function JobApply() {
  const { id: eidFromUrl } = useParams(); // Extract eid from URL
  const location = useLocation();
  const jobData = location.state?.job;
  const { data: userData } = useUserInfo();
  const user = userData?.data;
  const token = localStorage.getItem("token");

  const [eid, setEid] = useState("10"); // Default eid to 9 if not in URL
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [jobType, setJobType] = useState("All Jobs");
  const [description, setDescription] = useState("");
  const [resume, setResume] = useState(null);

  const applyResumeMutation = useMutation({
    mutationFn: (formData) => {
      return api.post(`/apply-cv/${eid}`, formData, {
        headers: {
          Authorization: token,
        },
      });
    },
  });

  useEffect(() => {
    if (eidFromUrl) {
      setEid(eidFromUrl);
    }

    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setPhone(user.phone);
      setOccupation(user.occupation);
      setFullName(firstName + " " + lastName);
    }
  }, [user, firstName, lastName, eidFromUrl]);

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!isAccepted) {
      setShowWarning(true);
    } else {
      // Proceed with form submission logic
      setShowWarning(false);
      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("job", occupation);
      formData.append("jobType", jobType);
      formData.append("description", `<p>${description}</p>`);
      // Add other form data as necessary
      applyResumeMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Applying successfully");
        },
        onError: (error) => {
          // Handle error (e.g., display an error message)
          toast.error("Error applying:" + error.message);
        },
      });
    }
  };

  //Handle Checkbox
  const [isAccepted, setIsAccepted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsAccepted(event.target.checked);
    setShowWarning(false); // Reset warning when checkbox state changes
  };

  return (
    <>
      <Navbar navClass="defaultscroll sticky" navLight={true} />
      <section
        className="bg-half-170 d-table w-100"
        style={{ backgroundImage: `url(${bg1})`, backgroundPosition: "top" }}
      >
        <div className="bg-overlay bg-gradient-overlay"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <img
                  src={jobData?.image ? jobData.image : logo1}
                  className="avatar avatar-small rounded-pill p-2 bg-white"
                  alt=""
                />
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark mt-3">
                  {jobData?.title ? jobData.title : "Back-End Developer"}
                </h5>
              </div>
            </div>
          </div>

          <div className="position-middle-bottom">
            <nav aria-label="breadcrumb" className="d-block">
              <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                <li className="breadcrumb-item">
                  <Link to="/">Jobnova</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/job-grid-two">Job</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Job Apply
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <div className="position-relative">
        <div className="shape overflow-hidden text-white">
          <svg
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>

      <section className="section bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-7">
              <div className="card border-0">
                <form
                  className="rounded shadow p-4"
                  onSubmit={handleApplySubmit}
                >
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Your Name :<span className="text-danger">*</span>
                        </label>
                        <input
                          name="name"
                          id="name2"
                          type="text"
                          className="form-control"
                          placeholder="First Name :"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb3">
                        <label className="form-label fw-semibold">
                          Your Email :<span className="text-danger">*</span>
                        </label>
                        <input
                          name="email"
                          id="email2"
                          type="email"
                          className="form-control"
                          placeholder="Your email :"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Your Phone no. :<span className="text-danger">*</span>
                        </label>
                        <input
                          name="number"
                          id="number2"
                          type="text"
                          className="form-control"
                          placeholder="Your phone no. :"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Job Title :
                        </label>
                        <input
                          name="subject"
                          id="subject2"
                          className="form-control"
                          placeholder="Title :"
                          value={occupation}
                          onChange={(e) => setOccupation(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Types of jobs :
                        </label>
                        <select
                          className="form-control form-select"
                          id="Sortbylist-Shop"
                          value={jobType}
                          onChange={(e) => setJobType(e.target.value)}
                        >
                          <option value="All Jobs">All Jobs</option>
                          <option value="Full Time">Full Time</option>
                          <option value="Half Time">Half Time</option>
                          <option value="Remote">Remote</option>
                          <option value="In Office">In Office</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Description :
                        </label>
                        <textarea
                          name="comments"
                          id="comments2"
                          rows="4"
                          className="form-control"
                          placeholder="Describe the job :"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label
                          htmlFor="formFile"
                          className="form-label fw-semibold"
                        >
                          Upload Your Cv / Resume :
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="formFile"
                          onChange={(e) => setResume(e.target.files[0])}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            checked={isAccepted}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            I Accept{" "}
                            <Link to="#" className="text-primary">
                              Terms And Condition
                            </Link>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <input
                          type="submit"
                          id="submit2"
                          name="send"
                          className="submitBtn btn btn-primary"
                          value="Apply Now"
                          style={{
                            opacity: isAccepted ? 1 : 0.5,
                          }}
                        />
                      </div>
                    </div>
                    {showWarning && (
                      <div className="row">
                        <div className="col-12">
                          <p className="text-danger">
                            You need to accept the terms and conditions before
                            applying.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer top={true} />
      <ScrollTop />
    </>
  );
}
