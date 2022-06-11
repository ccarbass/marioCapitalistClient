import * as React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
type Props = {};

const ProgressBarProduct = () => {
  return (
    <div className="w-full bg-gray rounded-full h-6 dark:bg-gray-700">
      <div className="bg-blue h-6 text-left leading-none rounded-full w-1/2">
        <img src="./asset/coin.png" className="h-6 w-6" />
      </div>
    </div>
  );
};
export default ProgressBarProduct;
