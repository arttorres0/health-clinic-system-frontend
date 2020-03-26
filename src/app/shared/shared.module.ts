import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DateFormatPipe } from "./pipes/date-format.pipe";
import { TipoConsultaFormatPipe } from "./pipes/tipo-consulta-format.pipe";

@NgModule({
  declarations: [DateFormatPipe, TipoConsultaFormatPipe],
  imports: [CommonModule],
  exports: [DateFormatPipe, TipoConsultaFormatPipe]
})
export class SharedModule {}
