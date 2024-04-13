import React from "react";
import "./Navbar.css";

const Navbar = ({ t, i18n }) => {
  return (
    <nav className="fixed w-full top-0 h-12 bg-sky-600 text-white text-xl flex justify-center items-center">
      {t("title")}
      <div className="absolute right-2 text-sm">
        <button onClick={() => i18n.changeLanguage("en")} className="mr-2">
          {t("language.english")}
        </button>
        <button onClick={() => i18n.changeLanguage("ja")}>
          {t("language.japanese")}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
