import moment from "moment";

const timeHelper = {
  getDiffFromNow: (date: any) => {
    var now = moment(new Date());
    var end = moment(date);

    var duration = moment.duration(now.diff(end));
    var days = duration.asDays();
    var hours = duration.asHours();
    var mins = duration.asHours();

    if (days < 1) {
      if (hours < 1) {
        return `${Math.floor(mins)} minute${mins == 1 ? "" : "s"} ago`;
      }
      return `${Math.floor(hours)} hour${hours == 1 ? "" : "s"} ago`;
    } else {
      return `${Math.floor(days)} day${days == 1 ? "" : "s"} ago`;
    }
  },
};

export default timeHelper;
