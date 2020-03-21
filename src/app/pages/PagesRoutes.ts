import { ConsultasListComponent } from "./consultas/consultas-list/consultas-list.component";
import { MedicosListComponent } from "./medicos/medicos-list/medicos-list.component";

export const PagesRoutes = [
  {
    path: "consultas",
    component: ConsultasListComponent,
    menuName: "Consultas"
  },
  {
    path: "medicos",
    component: MedicosListComponent,
    menuName: "Médicos"
  }
];
