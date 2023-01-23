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
      <div className="grid grid-cols-4 md:mt-9 lg:mt-9 sm:divide-x-2">
        <div className="text-center">
          <p className="md:text-4xl lg:text-4xl xs:text-xl xxs:text-xl xxxs:text-xl font-light tracking-widest">
            {days}
          </p>
          <p className="text-gray-1 text-base xs:text-sm xxs:text-sm xxxs:text-sm xs:mb-1 xxs:mb-1 xxxs:mb-1 md:mb-2 lg:mb-2 countdown-time-metric">
            DAYS
          </p>
        </div>
        <div className="text-center">
          <p className="md:text-4xl lg:text-4xl xs:text-xl xxs:text-xl xxxs:text-xl font-light tracking-widest">
            {hours}
          </p>
          <p className="text-gray-1 text-base xs:text-sm xxs:text-sm xxxs:text-sm xs:mb-1 xxs:mb-1 xxxs:mb-1 md:mb-2 lg:mb-2 countdown-time-metric">
            HOURS
          </p>
        </div>
        <div className="text-center">
          <p className="md:text-4xl lg:text-4xl xs:text-xl xxs:text-xl xxxs:text-xl font-light tracking-widest">
            {minutes}
          </p>
          <p className="text-gray-1 text-base xs:text-sm xxs:text-sm xxxs:text-sm xs:mb-1 xxs:mb-1 xxxs:mb-1 md:mb-2 lg:mb-2 countdown-time-metric">
            MINUTES
          </p>
        </div>
        <div className="text-center">
          <p className="md:text-4xl lg:text-4xl xs:text-xl xxs:text-xl xxxs:text-xl font-light tracking-widest">
            {seconds}
          </p>
          <p className="text-gray-1 text-base xs:text-sm xxs:text-sm xxxs:text-sm xs:mb-1 xxs:mb-1 xxxs:mb-1 md:mb-2 lg:mb-2 countdown-time-metric">
            SECONDS
          </p>
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
