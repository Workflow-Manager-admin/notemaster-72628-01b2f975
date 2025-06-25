import React from "react";

/**
 * PUBLIC_INTERFACE
 * The top header of the app displaying the app title.
 */
const Header = () => (
  <header className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white shadow-sm z-10">
    <div className="font-bold text-xl tracking-tight text-[color:var(--primary)]" style={{ color: "var(--primary-color)" }}>
      <span role="img" aria-label="note">📝</span> NoteMaster
    </div>
    {/* Placeholder for User/Login if implemented */}
  </header>
);

export default Header;
