import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UtilsService {
  constructor() {}

  public processFieldKeys(data: any): Field[] {
    const allowedTypes = ["string", "number"];
    const hiddenFields = ["id", "api_token", "img"];
    const entries = Object.entries(data);

    let result = [];
    entries.forEach(item => {
      if (
        allowedTypes.includes(typeof item[1]) &&
        !hiddenFields.includes(item[0])
      )
        result.push({
          name: item[0],
          value: item[1],
          type: typeof item[1] === "string" ? "text" : "number"
        });
    });
    console.log(result);
    return result;
  }
}

interface Field {
  name: string;
  value: any;
}
