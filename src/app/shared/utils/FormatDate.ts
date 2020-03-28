import { NgbDate, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

export function formatToNgbDate(date?: string): NgbDate {
  if (date === undefined) return undefined;

  let splitDate = date.split("-");
  return new NgbDate(
    Number(splitDate[0]),
    Number(splitDate[1]),
    Number(splitDate[2])
  );
}

export function formatToStringDate(date: NgbDateStruct): string {
  return moment(new Date(date.year, date.month - 1, date.day)).format(
    "YYYY-MM-DD"
  );
}
