import moment from "moment";

function excelDateParse(data) {
  return new Date(Math.round((data - 25569) * 86400 * 1000));
}

const fdate = {
  today: new Date(),
  todayYear: new Date().getFullYear(),

  formatToday: () => moment(new Date()).format("DD MMM YYYY"),
  format: (data) => moment(data).format("DD MMM YYYY"),
  format2: (data) => moment(data).format("DD/MM/YYYY"),
  format3: (data) => moment(data).format("MMM DD, YYYY"),
  format4: (data) => moment(data).format("h.mma"),
  format5: (data) => moment(data).format("MMM YYYY"),
  format6: (data) => moment(excelDateParse(data)).format("MMM YYYY"),

  format_time: (data) => moment(data).format("DD MMM YYYY h.mma"),
  isToday: (data) => {
    return new Date(data).toDateString() === new Date().toDateString()
      ? true
      : false;
  },
};

// ==================================================================================================================
const fcurr = {
  format: (data) => "IDR " + formatter.format(data),
  format2: (data) => formatter2.format(data),
  formatDec0: (data) => data.toFixed(0),
  formatDec2: (data) => data.toFixed(2),
};

//with dot .
var formatter = new Intl.NumberFormat("de-DE", {
  undefined,
});

//with comma ,
var formatter2 = new Intl.NumberFormat("en-US", {
  undefined,
});

// ==================================================================================================================

// const time_format = "h:mma";

const ftime = {
  format: (data) => moment(data, "HH:mm:ss").format("h:mm a"),
};

// ==================================================================================================================

export { fdate, fcurr, ftime };
