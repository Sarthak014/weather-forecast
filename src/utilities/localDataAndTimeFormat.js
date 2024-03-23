import { DateTime } from "luxon";

export const getFotmattedLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local Time: ' hh:mm a"
) => {
  return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
};
