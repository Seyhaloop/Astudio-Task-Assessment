import React from "react";

export default function Footer() {
  return (
    <footer className="py-4 mt-5">
      <div className="container text-center">
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <a
            href="https://github.com/yahongie2014/Astudio-Task-Assessment"
            target="_blank"
            rel="noopener noreferrer"
            className="btn d-flex align-items-center text-white"
            style={{
              backgroundColor: "#000",
              padding: "8px 16px",
              borderRadius: "8px",
            }}
          >
            <img
              src="https://www.logo.wine/a/logo/GitHub/GitHub-Icon-White-Dark-Background-Logo.wine.svg"
              alt="GitHub"
              width="40"
              height="40"
              className="me-2"
              style={{ objectFit: "contain" }}
            />
            <span>GitHub</span>
          </a>
          <a
            href="https://documenter.getpostman.com/view/2836787/2sB3QKtAm1"
            download
            className="btn d-flex align-items-center text-white"
            style={{
              backgroundColor: "#FF6C37",
              padding: "8px 16px",
              borderRadius: "8px",
            }}
          >
            <img
              src="https://www.svgrepo.com/show/354202/postman-icon.svg"
              alt="Postman"
              width="32"
              height="32"
              className="me-2"
              style={{ objectFit: "contain" }}
            />
            <span>Download Postman</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
