import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "timeago",
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string): string {
    if (typeof value !== "string") return value;
    const date = new Date(value).getTime();
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;
    const suffix = " ago";
    const elapsed = Math.floor((Date.now() - date) / 1000);

    if (elapsed < minute) {
      return "just now";
    }

    // get an array in the form of [number, string]
    const a = (elapsed < hour && [Math.floor(elapsed / minute), "minute"]) ||
      (elapsed < day && [Math.floor(elapsed / hour), "hour"]) ||
      (elapsed < month && [Math.floor(elapsed / day), "day"]) ||
      (elapsed < year && [Math.floor(elapsed / month), "month"]) || [
        Math.floor(elapsed / year),
        "year",
      ];

    // pluralise and append suffix
    return a[0] + " " + a[1] + (a[0] === 1 ? "" : "s") + suffix;
  }
}
