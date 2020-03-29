import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { ConsultasListComponent } from "./consultas/consultas-list/consultas-list.component";
import { FormsModule } from "@angular/forms";
import { MedicosListComponent } from "./medicos/medicos-list/medicos-list.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PacientesListComponent } from "./pacientes/pacientes-list/pacientes-list.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "../shared/shared.module";
import { ConsultaRequestComponent } from "./consultas/consulta-request/consulta-request.component";
import { MedicoRequestComponent } from "./medicos/medico-request/medico-request.component";
import { PacienteRequestComponent } from "./pacientes/paciente-request/paciente-request.component";
import { RecepcionistasListComponent } from "./recepcionistas/recepcionistas-list/recepcionistas-list.component";
import { RecepcionistaRequestComponent } from "./recepcionistas/recepcionista-request/recepcionista-request.component";
import { ConveniosListComponent } from "./convenios/convenios-list/convenios-list.component";
import { ConvenioRequestComponent } from "./convenios/convenio-request/convenio-request.component";
import { MedicamentosListComponent } from "./medicamentos/medicamentos-list/medicamentos-list.component";
import { MedicamentoRequestComponent } from "./medicamentos/medicamento-request/medicamento-request.component";

@NgModule({
  declarations: [
    PagesComponent,
    ConsultasListComponent,
    MedicosListComponent,
    PacientesListComponent,
    ConsultaRequestComponent,
    MedicoRequestComponent,
    PacienteRequestComponent,
    RecepcionistasListComponent,
    RecepcionistaRequestComponent,
    ConveniosListComponent,
    ConvenioRequestComponent,
    MedicamentosListComponent,
    MedicamentoRequestComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class PagesModule {}
