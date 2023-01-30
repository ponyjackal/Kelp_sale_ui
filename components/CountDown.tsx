import { FunctionComponent } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import Countdown from "react-countdown";

interface CountDownRendererProps {
  hours: any;
  minutes: any;
  seconds: any;
  completed: any;
  days: any;
}

interface CountDownProps {
  date: string;
}

const CountDownRenderer: FunctionComponent<CountDownRendererProps> = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}) => {
  return (
    <>
      <div>
        <p className="text-gray-1 text-xl xs:text-lg xxs:text-lg xxxs:text-lg xs:mb-1 xxs:mb-1 xxxs:mb-1 md:mb-2 lg:mb-2 m-0">
          ENDS IN
        </p>
        <div className="flex justify-between md:mt-6 lg:mt-6">
          <div className="text-center">
            <p className="md:text-2xl xxxs:text-xl font-bold">{days}</p>
            <p className="text-gray-1 md:text-base xxxs:text-xs xs:mb-1 xxs:mb-1 xxxs:mb-1 md:mb-2 lg:mb-2 countdown-time-metric">
              DAYS
            </p>
          </div>
          <div className="text-center">
            <p className="md:text-2xl xxxs:text-xl font-bold">
              {hours}
            </p>
            <p className="text-gray-1 md:text-base xxxs:text-xs xs:mb-1 xxs:mb-1 xxxs:mb-1 md:mb-2 lg:mb-2 countdown-time-metric">
              HOURS
            </p>
          </div>
          <div className="text-center">
            <p className="md:text-2xl xxxs:text-xl font-bold">
              {minutes}
            </p>
            <p className="text-gray-1 md:text-base xxxs:text-xs xs:mb-1 xxs:mb-1 xxxs:mb-1 md:mb-2 lg:mb-2 countdown-time-metric">
              MINUTES
            </p>
          </div>
          <div className="text-center">
            <p className="md:text-2xl lg:text-2xl xs:text-xl xxs:text-xl xxxs:text-xl font-bold">
              {seconds}
            </p>
            <p className="text-gray-1 md:text-base xxxs:text-xs xs:mb-1 xxs:mb-1 xxxs:mb-1 md:mb-2 lg:mb-2 countdown-time-metric">
              SECONDS
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const CountDown = ({ date }: CountDownProps) => {
  return (
    <Countdown
      date={date}
      daysInHours={true}
      zeroPadTime={2}
      zeroPadDays={2}
      renderer={CountDownRenderer}
      precision={3}
      intervalDelay={0}
    />
  );
};

export default CountDown;
