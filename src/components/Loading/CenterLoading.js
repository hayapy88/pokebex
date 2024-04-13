import React from "react";

const CenterLoading = ({ t }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center text-xl font-bold">
      {t("loading")}
    </div>
  );
};

export default CenterLoading;
