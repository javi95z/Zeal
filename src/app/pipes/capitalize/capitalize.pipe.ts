import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "capitalize"
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value
      .split("_")
      .map(word => word[0].toUpperCase() + word.substr(1).toLowerCase())
      .join(" ");
  }
}
