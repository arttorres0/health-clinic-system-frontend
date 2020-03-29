import { ConsultasListComponent } from "./consultas/consultas-list/consultas-list.component";
import { MedicosListComponent } from "./medicos/medicos-list/medicos-list.component";
import { PacientesListComponent } from "./pacientes/pacientes-list/pacientes-list.component";
import { RecepcionistasListComponent } from "./recepcionistas/recepcionistas-list/recepcionistas-list.component";
import { ConveniosListComponent } from "./convenios/convenios-list/convenios-list.component";
import { MedicamentosListComponent } from "./medicamentos/medicamentos-list/medicamentos-list.component";

export const PagesRoutes = [
  {
    path: "consultas",
    component: ConsultasListComponent,
    menuName: "Consultas"
  },
  {
    path: "pacientes",
    component: PacientesListComponent,
    menuName: "Pacientes"
  },
  {
    path: "medicos",
    component: MedicosListComponent,
    menuName: "Médicos(as)"
  },
  {
    path: "recepcionistas",
    component: RecepcionistasListComponent,
    menuName: "Recepcionistas"
  },
  {
    path: "convenios",
    component: ConveniosListComponent,
    menuName: "Convênios"
  },
  {
    path: "medicamentos",
    component: MedicamentosListComponent,
    menuName: "Medicamentos"
  }
];
