import React from "react";

// Initial loading message
const CenterLoading = ({ t }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center text-xl font-bold">
      {t("loading")}
    </div>
  );
};

export default CenterLoading;
