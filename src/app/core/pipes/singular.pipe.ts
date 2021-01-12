import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "singular",
})
export class SingularPipe implements PipeTransform {
  transform(value: string): string {
    if (typeof value !== "string") return value;
    return value.substring(0, value.length - 1);
  }
}
