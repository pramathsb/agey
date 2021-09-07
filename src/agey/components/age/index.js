import { useState, useEffect } from "react";
import moment from "moment";
import AnimatedNumber from "animated-number-react";

let sid = [];

export default function Age() {
  const [time, setTime] = useState(null);
  const [init, setInit] = useState(false);
  const [dob, setDob] = useState("1989-11-17");
  const [job, setJob] = useState("2014-05-14");
  const [dobTime, setDobTime] = useState("08:50");

  const changeDob = (e) => {
    setDob(e.target.value);
  };

  const changeDobTime = (e) => {
    setDobTime(e.target.value);
  };
  const changeJob = (e) => {
    setJob(e.target.value);
  };

  useEffect(() => {
    setInit(true);
    sid.forEach((id) => clearTimeout(id));
    sid.length = 0;
    sid.push(
      setTimeout(() => {
        setTime(moment());
      }, 1000)
    );
  }, [time]);

  const currentMoment = moment(),
    currentMoment1 = moment(),
    birthDayMoment = moment(dob + dobTime, "YYYY-MM-DD HH:mm"),
    jobFirstDayMoment = moment(job, "YYYY-MM-DD"),
    nextBirthDayMoment = moment(birthDayMoment).year(currentMoment.year()),
    prevBirthDayMoment = moment(nextBirthDayMoment).subtract(1, "year"),
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
      milliSeconds() {
        return currentMoment
          .subtract(this.months, "months")
          .subtract(this.days() - 1, "days")
          .subtract(this.hours(), "hours")
          .subtract(this.minutes(), "minutes")
          .subtract(this.seconds(), "seconds")
          .diff(prevBirthDayMoment, "milliseconds");
      },
    },
    livedFor = {
      years: currentMoment.diff(birthDayMoment, "years"),
      months: currentMoment.diff(birthDayMoment, "months"),
      days: currentMoment.diff(birthDayMoment, "days"),
      hours: currentMoment.diff(birthDayMoment, "hours"),
      minutes: currentMoment.diff(birthDayMoment, "minutes"),
      seconds: currentMoment.diff(birthDayMoment, "seconds"),
      milliseconds: currentMoment.diff(birthDayMoment, "milliseconds"),
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
    formatValueSingle = (num) => {
      return num.toFixed(0);
    },
    twoDigit = (num) => {
      return num.toString().length > 1 ? num : "0" + num;
    },
    animateNumber = (num) => {
      return <AnimatedNumber duration={init ? 0 : 1000} value={num} formatValue={formatValue} className="nums" />;
    },
    animateNumberNoFormat = (num) => {
      return <AnimatedNumber duration={init ? 0 : 1000} value={num} formatValue={formatValueSingle} className="nums" />;
    },
    renderAnimation = (num, param) => {
      return (
        <>
          {animateNumberNoFormat(num)}
          {<span className="prop"> {param}</span>}
        </>
      );
    },
    renderText = (num, param) => {
      return (
        <div className="item">
          {animateNumber(num)}
          {<span className="prop"> {param}</span>}
        </div>
      );
    };

  const jeM = jobExperience.months(),
    jeD = jobExperience.days();

  return (
    <div>
      <>
        <h1 className="my-4">Whats your Age?</h1>
        <div className="row">
          <div className="col-md-4">
            <div className="input-group my-3">
              <span className="input-group-text">D.O.B</span>
              <input className="form-control" type="date" name="" id="" value={dob} max={`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`} onChange={changeDob} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-group my-3">
              <span className="input-group-text">T.O.B</span>
              <input className="form-control" type="time" name="" id="" value={dobTime} onChange={changeDobTime} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-group my-3">
              <span className="input-group-text">D.O.J</span>
              <input className="form-control" type="date" name="" id="" value={job} max={`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`} onChange={changeJob} />
            </div>
          </div>
        </div>
        <hr className="" />
        <div className="row">
          <div className="col-md-4">
            <h3 className="my-4">Age</h3>
            {renderAnimation(livedFor.years, "")}.{renderAnimation(((livedFor.months % 12) * 10) / 12, "Years")}
          </div>
          <div className="col-md-4">
            <h3 className="my-4">Job Experience</h3>
            {renderAnimation(jobExperience.years, "")}.{renderAnimation((jeM * 10) / 12, "Years")}
          </div>
        </div>
        <hr className="" />
        {livedFor.minutes > 0 && (
          <div className="row">
            <div className="col-md-4">
              <h4 className="my-4">Actual Age:</h4>
              {renderText(livedFor.years, "Years")}
              {renderText(actualAge.months % 12, "Months")}
              {renderText(actualAge.days(), "Days")}
              {renderText(actualAge.hours(), "Hours")}
              {renderText(actualAge.minutes(), "Minutes")}
              {renderText(actualAge.seconds(), "Seconds")}
              {/* {renderText(actualAge.milliSeconds(), "MilliSeconds")} */}
              <div className="ms"></div>
            </div>
            <div className="col-md-4">
              <h4 className="my-4">You have lived for:</h4>
              {renderText(livedFor.years, "Years")}
              {renderText(livedFor.months, "Months")}
              {renderText(livedFor.days, "Days")}
              {renderText(livedFor.hours, "Hours")}
              {renderText(livedFor.minutes, "Minutes")}
              {renderText(livedFor.seconds, "Seconds")}
              {/* {renderText(livedFor.milliseconds, "MilliSeconds")} */}
            </div>
            <div className="col-md-4">
              <h4 className="my-4">Job Experience:</h4>
              {renderText(jobExperience.years, "Years")}
              {renderText(jeM, "Months")}
              {renderText(jeD, "Days")}
            </div>
          </div>
        )}
      </>
    </div>
  );
}
