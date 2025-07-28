// src/components/ProfileCard.jsx
import React from "react";
import AuraaLogo from "../images/logo.png";  // your same logo

const ProfileCard = () => {
  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:Waingankar;Devesh;;;
FN:Devesh Waingankar
ORG:Auraa Cards
TITLE:Founder & CEO
EMAIL;type=INTERNET;type=HOME:devesh@auraacards.com
TEL;type=CELL:+1234567890
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Devesh_Waingankar.vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-[#1A1A2E] text-white flex flex-col items-center justify-center min-h-screen p-6">
      <main className="w-full max-w-sm text-center">
        {/* Profile Image/Logo */}
        <div className="mb-8">
          <img
            src={AuraaLogo}
            alt="Auraa Cards Logo"
            className="mx-auto rounded-full w-20 h-20 object-cover"
          />
        </div>

        {/* Name and Title */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-1">Devesh Waingankar</h1>
          <p className="text-md text-gray-400">Founder & CEO, Auraa Cards</p>
        </div>

        {/* Buttons Container */}
        <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
          {/* Send Email Button */}
          <a
            href="mailto:devesh@auraacards.com"
            className="btn flex items-center justify-center gap-2"
          >
            <svg
              className="btn-icon w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22 6c0-1.1-.9-2-2-2H4…"/>
            </svg>
            Send Email
          </a>

          {/* Call Now Button */}
          <a
            href="tel:+1234567890"
            className="btn flex items-center justify-center gap-2"
          >
            <svg
              className="btn-icon w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.01 15.38c-1.23 0-2.42…"/>
            </svg>
            Call Now
          </a>

          {/* Save Contact Button */}
          <button
            onClick={downloadVCard}
            className="btn flex items-center justify-center gap-2"
          >
            <svg
              className="btn-icon w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48…"/>
            </svg>
            Save Contact
          </button>

          {/* Pay via Venmo Button */}
          <a
            href="https://venmo.com/devesh-waingankar"
            target="_blank"
            rel="noopener noreferrer"
            className="btn flex items-center justify-center gap-2"
          >
            <svg
              className="btn-icon w-5 h-5"
              viewBox="0 0 448 512"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path d="M375.2 165.2c-2.4-7.4-11-8.2…"/>
            </svg>
            Pay via Venmo
          </a>
        </div>
      </main>
    </div>
  );
};

export default ProfileCard;
