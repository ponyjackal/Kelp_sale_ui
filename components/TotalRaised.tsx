import { ProgressBar } from "react-bootstrap";
import useWeiRaised from "../hooks/useWeiRaised";
import { parseBalance } from "../util";

const TotalRaised = () => {
  const { data, error, isLoading } = useWeiRaised();

  if (error) {
    return "something went wrong";
  }

  if (isLoading) {
    return "loading";
  }

  console.log("Data", data);

  return (
    <div className="text-left mt-10">
      <p className="text-gray-1 text-sm sm:text-lg mb-1">TOTAL RAISED</p>
      <p className="text-primary font-bold text-lg sm:text-2xl mb-2.5 md:mb-6">
        $1,412,456.00
      </p>
      <div className="relative progress-container">
        <ProgressBar now={10} />
      </div>
      <p className="text-base text-right text-gray-1 font-medium mt-3">
        $1,000,000 HARD CAP
      </p>
    </div>
  );
};

export default TotalRaised;
