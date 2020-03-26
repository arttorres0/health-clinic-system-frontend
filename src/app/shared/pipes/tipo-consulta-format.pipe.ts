import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "tipoConsultaFormat"
})
export class TipoConsultaFormatPipe implements PipeTransform {
  transform(tipoConsulta: string): string {
    if (tipoConsulta === "CONVENIO") return "convênio";
    return tipoConsulta.toLowerCase();
  }
}
