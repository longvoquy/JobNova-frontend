import { useEffect, useState } from "react";

import api from "../api/http";
import bg1 from "../assets/images/hero/bg5.jpg";
import useEnterpriseInfo from "../hook/useEnterpriseInfo";
import NavbarDark from "../componants/navbarDark";
import Footer from "../componants/footer";
import ScrollTop from "../componants/scrollTop";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input, Modal, notification } from "antd";
import Loading from "../componants/loading";
import { FiCamera } from "../assets/icons/vander";
import NotificationSettings from "../componants/notification-setting/notificationSettings";

export default function EmployerProfileSetting() {
  //   let [file, setFile] = useState(image1);
  
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  const { data: enterpriseData } = useEnterpriseInfo();
  const enterprise = enterpriseData?.data;
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [phone, setPhone] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [intro, setIntro] = useState("");
  const [errors, setErrors] = useState({}); // Define errors state

  const updateEnterpriseInfoMutation = useMutation({
    mutationFn: (body) => {
      return api.patch("/enterprise/update-info", body, {
        headers: {
          Authorization: token,
        },
      });
    },
  });

  useEffect(() => {
    if (enterprise) {
      setFirstName(enterprise.first_name);
      setLastName(enterprise.last_name);
      setEmail(enterprise.email);
      setSelectedState(enterprise.state);
      setIntro(enterprise.intro);
      setOccupation(enterprise.occupation);
      setPhone(enterprise.phone);
      setWebUrl(enterprise.web_url);
    }
  }, [enterprise]);

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    updateEnterpriseInfo(); // Trigger user info update
  };

  function updateEnterpriseInfo() {
    if (validateForm()) {
      const body = {
        state: selectedState,
        first_name: firstName,
        last_name: lastName,
        email: email,
        occupation: occupation,
        intro: intro,
        resume: resume,
      };

      updateEnterpriseInfoMutation.mutate(body, {
        onSuccess: (data) => {
          notification.success({ message: "User info updated successfully:" });
          // Optionally, you can perform any other actions here after updating the user info
        },
        onError: (error) => {
          notification.error({ message: "Error updating user info:" });
          // Optionally, handle the error or show a notification to the user
        },
      });
    }
  }

  const firstNameRegex = /^[a-zA-ZÀ-ÿ\- ']+$/;
  const lastNameRegex = /^[a-zA-ZÀ-ÿ\- ']+$/;
  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    // Validate First Name using regex
    if (!firstNameRegex.test(firstName.trim())) {
      errorsCopy.firstName = "Invalid First Name";
      valid = false;
      notification.error({ message: "Please enter a valid first name!" });
    }

    // Validate Last Name using regex
    if (!lastNameRegex.test(lastName.trim())) {
      errorsCopy.lastName = "Invalid Last Name";
      valid = false;
      notification.error({ message: "Please enter a valid last name!" });
    }

    // Validate Email
    if (!email.trim()) {
      errorsCopy.email = "Email is Required";
      valid = false;
      notification.error({ message: "Please enter email address!" });
    } else {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        errorsCopy.email = "Invalid Email Format";
        valid = false;
        notification.error({ message: "Please enter a valid email address!" });
      } else {
        errorsCopy.email = "";
      }
    }

    setErrors(errorsCopy);

    return valid;
  }

  //Contact Info Update
  const updateContactInfo = useMutation({
    mutationFn: (body) => {
      return api.patch("/enterprise/update-contact-info", body, {
        headers: {
          Authorization: token,
        },
      });
    },
  });

  const handleSubmitContactInfo = (e) => {
    e.preventDefault();
    if (validateContactForm()) {
      const body = {
        phone: phone,
        web_url: webUrl,
      };

      updateContactInfo.mutate(body, {
        onSuccess: (data) => {
          notification.success({
            message: "Contact info updated successfully:",
          });
          // Optionally, you can perform any other actions here after updating the contact info
        },
        onError: (error) => {
          notification.error({ message: "Error updating contact info:" });
          // Optionally, handle the error or show a notification to the user
        },
      });
    }
  };

  function validateContactForm() {
    let valid = true;
    const errorsCopy = {};

    // Validate Phone Number
    if (phone.trim()) {
      // Check if the phone number is in a valid format
      const phoneRegex = /^[0-9]{10}$/; // Assuming a 10-digit phone number format
      if (!phoneRegex.test(phone)) {
        errorsCopy.phone = "Invalid Phone Number Format";
        valid = false;
        notification.error({ message: "Please enter correct phone number" });
      } else {
        errorsCopy.phone = "";
      }
    } else {
      errorsCopy.phone = "Phone Number is Required";
      valid = false;
    }

    // Validate Website URL
    if (webUrl.trim()) {
      // Check if the website URL is in a valid format
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!urlRegex.test(webUrl)) {
        errorsCopy.webUrl = "Invalid Website URL Format";
        valid = false;
      } else {
        errorsCopy.webUrl = "";
      }
    } else {
      errorsCopy.webUrl = "Website URL is Required";
      valid = false;
    }

    // Set the updated errors object to the state
    setErrors(errorsCopy);

    return valid;
  }
  //  update password

  // Function to handle form submission
  const updatePasswordMutation = useMutation({
    mutationFn: (body) => {
      return api.patch("/update-password", body, {
        headers: {
          Authorization: token,
        },
      });
    },
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePasswrodForm()) {
      const body = { oldPassword, newPassword };
      updatePasswordMutation.mutate(body, {
        onSuccess() {
          notification.success({ message: "Updated password successfully" });
        },
        onError(error) {
          const errorMessage =
            error.response?.data?.message || "An error occurred";
          notification.error({ message: errorMessage });
        },
      });
    }
  };

  const validatePasswrodForm = () => {
    let valid = true;
    const errorsCopy = {};

    if (!oldPassword.trim()) {
      errorsCopy.oldPassword = "Old Password is Required";
      valid = false;
    }

    if (!newPassword.trim()) {
      errorsCopy.newPassword = "New Password is Required";
      notification.error({ message: "New Password is Required" });
      valid = false;
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]).{8,}/.test(
        newPassword
      )
    ) {
      errorsCopy.newPassword =
        "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.";
      valid = false;
      notification.error({
        message:
          "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.",
      });
    }

    if (!confirmPassword.trim()) {
      errorsCopy.confirmPassword = "Confirm Password is Required";
      valid = false;
      notification.error({ message: "New Password is Required" });
    } else if (newPassword !== confirmPassword) {
      errorsCopy.confirmPassword = "Passwords do not match";
      valid = false;
      notification.error({ message: "New Passwords do not match" });
    }

    // Check if new password is same as old password
    if (oldPassword === newPassword) {
      errorsCopy.newPassword =
        "New Password must be different from Old Password";
      valid = false;
      notification.error({
        message: "New Password must be different from Old Password",
      });
    }

    setErrors(errorsCopy);
    return valid;
  };
  //delete

  // State to track deletion status
  const [showDelModal, setShowDelModal] = useState(false);
  const [deletionStatus, setDeletionStatus] = useState("");

  // Mutation to handle user deletion
  const deleteMutation = useMutation({
    mutationFn: () => {
      return api.delete("/delete-account", {
        headers: {
          Authorization: token,
        },
      });
    },
  });

  // Function to handle user deletion
  const handleDeleteUser = async () => {
    try {
      const response = await deleteMutation.mutateAsync();
      if (response.status === 200) {
        setDeletionStatus("User deleted successfully.");
      } else {
        setDeletionStatus("Error deleting user. Please try again.");
      }
    } catch (error) {
      setDeletionStatus("Error deleting user. Please try again.");
    }
  };
  //
  //Upload CV
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [resume, setResume] = useState(null);

  const uploadAvatar = useMutation({
    mutationFn: (formData) => {
      return api.patch("/update-avatar", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("USER_PROFILE");
      notification.success({ message: "Update avatar successfully" });
    },
    onError: () => {
      notification.error({ message: "Update avatar failed" });
    },
  });

  const uploadResume = useMutation({
    mutationFn: (formData) => {
      return api.patch("/update-resume", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("USER_PROFILE");
      notification.success({ message: "Upload resume successfully" });
    },
    onError: () => {
      notification.error({ message: "Upload resume failed" });
    },
  });

  // Function to handle file selection
  const handleFileChange = (e) => {
    setResume(e.target.files[0]); // Update state with the selected resume file
  };

  // Function to handle form submission or other action to upload resume
  const handleUploadResume = () => {
    const formData = new FormData();
    formData.append("resume", resume);
    console.log("FormData:", formData);
    uploadResume.mutate(formData);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (!file && !resume) {
      return;
    }

    if (file) {
      let formData = new FormData();
      formData.append("image", file);
      uploadAvatar.mutate(formData);
    }

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const changeNameMutation = useMutation({
    mutationFn: (body) => {
      return api.patch("/update-profile", body, {
        headers: {
          Authorization: token,
        },
      });
    },
  });

  const showModalName = () => {
    setIsModalNameOpen(true);
  };
  const [isModalNameOpen, setIsModalNameOpen] = useState(false);
  const [name, setName] = useState(user?.user_name);

  useEffect(() => {
    setName(user?.user_name);
    // setAbout(user?.about);
  }, [user]);

  const handleNameOk = () => {
    const body = { puser_name: name };
    changeNameMutation.mutate(body, {
      onSuccess() {
        queryClient.invalidateQueries("USER_PROFILE");
        notification.success({ message: "Edit name successfully" });
      },
      onError() {
        notification.error({ message: "Edit name failed, Try again later" });
      },
    });
    setIsModalNameOpen(false);
  };

  const handleNameCancel = () => {
    setIsModalNameOpen(false);
  };

  return (
    <>
      <>
        <NavbarDark />
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="position-relative">
                  <div className="candidate-cover">
                    <div className="profile-banner relative text-transparent">
                      <input id="pro-banner" />
                      <div className="relative shrink-0">
                        <img
                          src={bg1}
                          className="rounded shadow"
                          id="profile-banner"
                          alt=""
                        />
                        <label
                          className="profile-image-label"
                          htmlFor="pro-banner"
                        ></label>
                      </div>
                    </div>
                  </div>
                  <div className="candidate-profile d-flex align-items-end mx-2">
                    {uploadAvatar.isPending ? (
                      <Loading />
                    ) : (
                      <div className="position-relative">
                        <input
                          type="button"
                          onClick={showModal}
                          style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            opacity: "0.01",
                            zIndex: "11",
                          }}
                        />
                        <div className="position-relative d-inline-block">
                          <img
                            src={user?.avatar_url}
                            className="avatar avatar-medium img-thumbnail rounded-pill shadow-sm"
                            id="profile-image"
                            alt=""
                          />
                          <label
                            className="icons position-absolute bottom-0 end-0"
                            htmlFor="pro-img"
                          >
                            <span className="btn btn-icon btn-sm btn-pills btn-primary">
                              <FiCamera className="icons" />
                            </span>
                          </label>
                        </div>
                      </div>
                    )}
                    <div className="ms-2">
                      <h5 className="mb-0">
                        {user?.gender == 0 ? "Mr. " : "Mrs. "}
                        {""}
                        {user?.firstName == null && user?.last_name == null
                          ? user?.user_name
                          : user?.first_name + " " + user?.last_name}
                      </h5>
                      <p className="text-muted mb-0">{user?.occupation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="rounded shadow p-4">
                  <form onSubmit={handleInfoSubmit}>
                    <h5>Personal Detail :</h5>
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-semibold">
                            First Name:<span className="text-danger">*</span>
                          </label>
                          <input
                            name="name"
                            id="firstname"
                            type="text"
                            className={`form-control ${errors.firstName} ? "is-invalid" :""`}
                            placeholder="First Name :"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                          {errors.firstName && (
                            <div className="invalid-feedback">
                              {errors.firstName}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-semibold">
                            Last Name:<span className="text-danger">*</span>
                          </label>
                          <input
                            name="name"
                            id="lastname"
                            type="text"
                            className={`form-control ${errors.lastName} ? "is-invalid" :""`}
                            placeholder="Last Name :"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                          {errors.lastName && (
                            <div className="invalid-feedback">
                              {errors.lastName}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-semibold">
                            Your Email:<span className="text-danger">*</span>
                          </label>
                          <input
                            name="email"
                            id="email2"
                            type="email"
                            className="form-control"
                            placeholder="Your email :"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />{" "}
                          {errors.email && (
                            <div className="invalid-feedback">
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-semibold">
                            Occupation:
                          </label>
                          <select
                            className="form-control form-select"
                            id="Type"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                          >
                            <option value="Web Designer">Web Designer</option>
                            <option value="Web Developer">Web Developer</option>
                            <option value="UI/UX Designer">
                              UI/UX Designer
                            </option>
                            <option value="Project Manager">
                              Project Manager
                            </option>
                            <option value="Data Scientist">
                              Data Scientist
                            </option>
                            <option value="Product Manager">
                              Product Manager
                            </option>
                            <option value="System Administrator">
                              System Administrator
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-semibold">
                            Province:
                          </label>
                          <select
                            className="form-control form-select"
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                          >
                            <option value="">Select Province</option>
                            <option value="An Giang">An Giang</option>
                            <option value="Bà Rịa-Vũng Tàu">
                              Bà Rịa-Vũng Tàu
                            </option>
                            <option value="Bạc Liêu">Bạc Liêu</option>
                            <option value="Bắc Kạn">Bắc Kạn</option>
                            <option value="Bắc Giang">Bắc Giang</option>
                            <option value="Bắc Ninh">Bắc Ninh</option>
                            <option value="Bến Tre">Bến Tre</option>
                            <option value="Bình Dương">Bình Dương</option>
                            <option value="Bình Định">Bình Định</option>
                            <option value="Bình Phước">Bình Phước</option>
                            <option value="Bình Thuận">Bình Thuận</option>
                            <option value="Cà Mau">Cà Mau</option>
                            <option value="Cần Thơ">Cần Thơ</option>
                            <option value="Cao Bằng">Cao Bằng</option>
                            <option value="Đà Nẵng">Đà Nẵng</option>
                            <option value="Đắk Lắk">Đắk Lắk</option>
                            <option value="Đắk Nông">Đắk Nông</option>
                            <option value="Điện Biên">Điện Biên</option>
                            <option value="Đồng Nai">Đồng Nai</option>
                            <option value="Đồng Tháp">Đồng Tháp</option>
                            <option value="Gia Lai">Gia Lai</option>
                            <option value="Hà Giang">Hà Giang</option>
                            <option value="Hà Nam">Hà Nam</option>
                            <option value="Hà Nội">Hà Nội</option>
                            <option value="Hà Tĩnh">Hà Tĩnh</option>
                            <option value="Hải Dương">Hải Dương</option>
                            <option value="Hải Phòng">Hải Phòng</option>
                            <option value="Hậu Giang">Hậu Giang</option>
                            <option value="Hòa Bình">Hòa Bình</option>
                            <option value="Hồ Chí Minh (Sài Gòn)">
                              Hồ Chí Minh (Sài Gòn)
                            </option>
                            <option value="Hưng Yên">Hưng Yên</option>
                            <option value="Khánh Hòa">Khánh Hòa</option>
                            <option value="Kiên Giang">Kiên Giang</option>
                            <option value="Kon Tum">Kon Tum</option>
                            <option value="Lai Châu">Lai Châu</option>
                            <option value="Lâm Đồng">Lâm Đồng</option>
                            <option value="Lạng Sơn">Lạng Sơn</option>
                            <option value="Lào Cai">Lào Cai</option>
                            <option value="Long An">Long An</option>
                            <option value="Nam Định">Nam Định</option>
                            <option value="Nghệ An">Nghệ An</option>
                            <option value="Ninh Bình">Ninh Bình</option>
                            <option value="Ninh Thuận">Ninh Thuận</option>
                            <option value="Phú Thọ">Phú Thọ</option>
                            <option value="Phú Yên">Phú Yên</option>
                            <option value="Quảng Bình">Quảng Bình</option>
                            <option value="Quảng Nam">Quảng Nam</option>
                            <option value="Quảng Ngãi">Quảng Ngãi</option>
                            <option value="Quảng Ninh">Quảng Ninh</option>
                            <option value="Quảng Trị">Quảng Trị</option>
                            <option value="Sóc Trăng">Sóc Trăng</option>
                            <option value="Sơn La">Sơn La</option>
                            <option value="Tây Ninh">Tây Ninh</option>
                            <option value="Thái Bình">Thái Bình</option>
                            <option value="Thái Nguyên">Thái Nguyên</option>
                            <option value="Thanh Hóa">Thanh Hóa</option>
                            <option value="Thừa Thiên Huế">
                              Thừa Thiên Huế
                            </option>
                            <option value="Tiền Giang">Tiền Giang</option>
                            <option value="Trà Vinh">Trà Vinh</option>
                            <option value="Tuyên Quang">Tuyên Quang</option>
                            <option value="Vĩnh Long">Vĩnh Long</option>
                            <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                            <option value="Yên Bái">Yên Bái</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
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
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label fw-semibold">
                            Introduction :
                          </label>
                          <textarea
                            name="comments"
                            id="comments2"
                            rows="4"
                            className="form-control"
                            placeholder="Introduction :"
                            value={intro}
                            onChange={(e) => setIntro(e.target.value)}
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-12">
                        <input
                          type="submit"
                          id="submit2"
                          name="send"
                          className="submitBnt btn btn-primary"
                          value="Save Changes"
                        />
                      </div>
                    </div>
                  </form>
                </div>

                <div className="rounded shadow p-4 mt-4">
                  <div className="row">
                    <div className="col-md-6 mt-4 pt-2">
                      <h5>Contact Info :</h5>

                      <form onSubmit={handleSubmitContactInfo}>
                        <div className="row mt-4">
                          <div className="col-lg-12">
                            <div className="mb-3">
                              <label className="form-label fw-semibold">
                                Phone No.:
                              </label>
                              <input
                                name="number"
                                id="number"
                                type="text"
                                className="form-control"
                                placeholder="Phone :"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                              />
                              {errors.phone && (
                                <div className="invalid-feedback">
                                  {errors.phone}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="mb-3">
                              <label className="form-label fw-semibold">
                                Website:
                              </label>
                              <input
                                name="url"
                                id="url"
                                type="url"
                                className="form-control"
                                placeholder="Url :"
                                value={webUrl}
                                onChange={(e) => setWebUrl(e.target.value)}
                              />
                              {errors.webUrl && (
                                <div className="invalid-feedback">
                                  {errors.webUrl}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-lg-12 mt-2 mb-0">
                            <button type="submit" className="btn btn-primary">
                              Update Contact Info
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div className="col-md-6 mt-4 pt-2">
                      <h5>Change password :</h5>
                      <form onSubmit={handleSubmit}>
                        <div className="row mt-4">
                          <div className="col-lg-12">
                            <div className="mb-3">
                              <label className="form-label fw-semibold">
                                Old password :
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                placeholder="Old password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                              />
                              {errors.oldPassword && (
                                <div className="invalid-feedback">
                                  {errors.oldPassword}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="mb-3">
                              <label className="form-label fw-semibold">
                                New password :
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                placeholder="New password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                              />
                              {errors.newPassword && (
                                <div className="invalid-feedback">
                                  {errors.newPassword}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="mb-3">
                              <label className="form-label fw-semibold">
                                Confirm password :
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                              />
                              {errors.confirmPassword && (
                                <div className="invalid-feedback">
                                  {errors.confirmPassword}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-12 mt-2 mb-0">
                            <button type="submit" className="btn btn-primary">
                              Save password
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="rounded shadow p-4 mt-4">
                  <NotificationSettings />
                </div>
                <div>
                  <form>
                    <h5 className="text-danger">Delete Account :</h5>
                    <div className="row mt-4">
                      <h6 className="mb-0">
                        Do you want to delete the account? Please press below
                        "Delete" button
                      </h6>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => setShowDelModal(true)}
                          disabled={deleteMutation.isLoading}
                        >
                          {deleteMutation.isLoading
                            ? "Deleting..."
                            : "Delete Account"}
                        </button>
                        {deletionStatus && <p>{deletionStatus}</p>}
                      </div>
                    </div>
                  </form>
                  {showDelModal && (
                    <div
                      className="modal"
                      tabIndex="-1"
                      role="dialog"
                      style={{ display: "block" }}
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Confirm Deletion</h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setShowDelModal(false)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            Are you sure you want to delete your account?
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => setShowDelModal(false)}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={handleDeleteUser}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer top={true} />
        <ScrollTop />
      </>{" "}
      <Modal
        title="Update avatar ?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          type="file"
          placeholder="Choose avatar"
        />
      </Modal>
      <Modal
        title="Edit name"
        open={isModalNameOpen}
        onOk={handleNameOk}
        onCancel={handleNameCancel}
      >
        <Input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="New name"
        />
      </Modal>
    </>
  );
}
