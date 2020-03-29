import { ConsultasListComponent } from "./consultas/consultas-list/consultas-list.component";
import { MedicosListComponent } from "./medicos/medicos-list/medicos-list.component";
import { PacientesListComponent } from "./pacientes/pacientes-list/pacientes-list.component";

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
    menuName: "Médicos"
  }
];
