import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DateFormatPipe } from "./pipes/date-format.pipe";
import { TipoConsultaFormatPipe } from "./pipes/tipo-consulta-format.pipe";
import { TogglePasswordDirective } from "./directives/toggle-password.directive";

@NgModule({
  declarations: [
    DateFormatPipe,
    TipoConsultaFormatPipe,
    TogglePasswordDirective
  ],
  imports: [CommonModule],
  exports: [DateFormatPipe, TipoConsultaFormatPipe, TogglePasswordDirective]
})
export class SharedModule {}
