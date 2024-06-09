import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export const ContactUs = () => {
  const form = useRef();
  const [isSuccess, setIsSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_wdtvxze", "template_o4ibzfi", form.current, {
        publicKey: "dQzHPfYRee9Kd65PL",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setIsSuccess(true);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <>
      {isSuccess ? (
        <div className="alert alert-success" role="alert">
          Your message has been sent successfully.
        </div>
      ) : (
        <form ref={form} onSubmit={sendEmail} className="mt-4">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Your Name <span className="text-danger">*</span>
                </label>
                <input
                  name="user_name"
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Your Email <span className="text-danger">*</span>
                </label>
                <input
                  name="user_email"
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="col-12">
              <div className="mb-3">
                <label className="form-label fw-semibold">Subject</label>
                <input
                  name="user_subject"
                  id="subject"
                  className="form-control"
                  placeholder="Subject"
                />
              </div>
            </div>

            <div className="col-12">
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Comments <span className="text-danger">*</span>
                </label>
                <textarea
                  name="message"
                  id="comments"
                  rows="4"
                  className="form-control"
                  placeholder="Message"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="d-grid">
                <button
                  type="submit"
                  id="submit"
                  value="Send"
                  className="btn btn-primary"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
