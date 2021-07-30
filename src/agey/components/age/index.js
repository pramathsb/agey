import { useState, useEffect } from "react";
import moment from "moment";
import AnimatedNumber from "animated-number-react";

let sid = [];

export default function Age() {
  const [time, setTime] = useState(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
    sid.forEach((id) => clearTimeout(id));
    sid.length = 0;
    sid.push(
      setTimeout(() => {
        setTime(new Date());
      }, 1000)
    );
  }, [time]);

  const currentMoment = moment(),
    currentMoment1 = moment(),
    birthDayMoment = moment("17/11/1989 08:50AM", "DD/MM/YYYY HH:mm"),
    jobFirstDayMoment = moment("14/05/2014", "DD/MM/YYYY"),
    nextBirthDayMoment = moment(birthDayMoment).year(currentMoment.year()),
    prevBirthDayMoment = moment(nextBirthDayMoment).subtract(1, "year"),
    livedFor = {
      years: currentMoment.diff(birthDayMoment, "years"),
      months: currentMoment.diff(birthDayMoment, "months"),
      days: currentMoment.diff(birthDayMoment, "days"),
      hours: currentMoment.diff(birthDayMoment, "hours"),
      minutes: currentMoment.diff(birthDayMoment, "minutes"),
      seconds: currentMoment.diff(birthDayMoment, "seconds"),
    },
    actualAge = {
      months: currentMoment.diff(prevBirthDayMoment, "months"),
      days() {
        return currentMoment.subtract(this.months, "months").diff(prevBirthDayMoment, "days");
      },
      hours() {
        return currentMoment
          .subtract(this.months, "months")
          .subtract(this.days() - 1, "days")
          .diff(prevBirthDayMoment, "hours");
      },
      minutes() {
        return currentMoment
          .subtract(this.months, "months")
          .subtract(this.days() - 1, "days")
          .subtract(this.hours(), "hours")
          .diff(prevBirthDayMoment, "minutes");
      },
      seconds() {
        return currentMoment
          .subtract(this.months, "months")
          .subtract(this.days() - 1, "days")
          .subtract(this.hours(), "hours")
          .subtract(this.minutes(), "minutes")
          .diff(prevBirthDayMoment, "seconds");
      },
    },
    jobExperience = {
      years: currentMoment1.diff(jobFirstDayMoment, "years"),
      months() {
        return currentMoment1.subtract(this.years, "years").diff(jobFirstDayMoment, "months");
      },
      days() {
        return currentMoment1.subtract(this.months() - 1, "months").diff(jobFirstDayMoment, "days");
      },
    },
    formatValue = (num) => {
      return twoDigit(num.toFixed(0));
    },
    twoDigit = (num) => {
      return num.toString().length > 1 ? num : "0" + num;
    },
    animateNumber = (num) => {
      function animateText(num) {
        return <AnimatedNumber duration={init ? 0 : 1000} value={num} formatValue={formatValue} className="nums" />;
      }

      return animateText(num);
    },
    renderText = (num, param) => {
      return (
        <div className="item">
          {animateNumber(num)}
          <span className="prop">{param}</span>
        </div>
      );
    };

  return (
    <div>
      <>
        <h1 className="my-4">Whats your Age?</h1>
        <hr />
        <div className="row">
          <div className="col">
            <h4 className="my-4">Actual Age:</h4>
            {renderText(livedFor.years, "Years")}
            {renderText(actualAge.months % 12, "Months")}
            {renderText(actualAge.days(), "Days")}
            {renderText(actualAge.hours(), "Hours")}
            {renderText(actualAge.minutes(), "Minutes")}
            {renderText(actualAge.seconds(), "Seconds")}
            <div className="ms"></div>
          </div>
          <div className="col">
            <h4 className="my-4">You have lived for:</h4>
            {renderText(livedFor.years, "Years")}
            {renderText(livedFor.months, "Months")}
            {renderText(livedFor.days, "Days")}
            {renderText(livedFor.hours, "Hours")}
            {renderText(livedFor.minutes, "Minutes")}
            {renderText(livedFor.seconds, "Seconds")}
          </div>
          <div className="col">
            <h4 className="my-4">Job Experience:</h4>
            {renderText(jobExperience.years, "Years")}
            {renderText(jobExperience.months(), "Months")}
            {renderText(jobExperience.days(), "Days")}
          </div>
        </div>
      </>
    </div>
  );
}
