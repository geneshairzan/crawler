// d = object ; dt : key to find
export function dataFind(d, dt) {
  if (dt.includes(".")) {
    dt.split(".").forEach((e) => {
      d[e] ? (d = d[e]) : (d = "");
    });
    return d;
  } else return d[dt];
}
