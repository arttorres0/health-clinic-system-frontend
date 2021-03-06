import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "dateFormat"
})
export class DateFormatPipe implements PipeTransform {
  transform(date: string): string {
    return moment(date, "YYYY-MM-DD").format("DD/M/YYYY");
  }
}
