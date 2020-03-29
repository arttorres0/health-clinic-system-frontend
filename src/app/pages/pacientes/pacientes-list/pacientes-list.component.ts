import { Component, OnInit } from "@angular/core";
import { LoadingService } from "src/app/loading/loading.service";
import { ToastService } from "src/app/toast/toast.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { PacientesService } from "../../pacientes/pacientes.service";
import { Paciente } from "../../pacientes/Paciente";
import { PacienteRequestComponent } from "../paciente-request/paciente-request.component";
import { AuthService } from "src/app/auth/auth.service";
import { Roles } from "src/app/auth/Roles";

@Component({
  selector: "app-pacientes-list",
  templateUrl: "./pacientes-list.component.html",
  styleUrls: ["./pacientes-list.component.scss"]
})
export class PacientesListComponent implements OnInit {
  pacientes: Paciente[];
  prevPage: number;
  page: number;
  pageSize: number;
  numberOfResults: number;
  selectedFilterPaciente: string;

  subject: Subject<null> = new Subject();

  constructor(
    private pacientesService: PacientesService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {
    this.subject
      .pipe(debounceTime(500))
      .subscribe(() => this.getPacientesList());
  }

  ngOnInit() {
    this.selectedFilterPaciente = "";
    this.page = this.prevPage = 1;
    this.getPacientesList();
  }

  ngDoCheck() {
    if (this.page !== this.prevPage) {
      this.getPacientesList();
      this.prevPage = this.page;
    }
  }

  getPacientesList(): void {
    this.loadingService.setLoadingBoolean(true);

    this.pacientesService
      .getPacientesList({
        filter: this.selectedFilterPaciente,
        page: this.page
      })
      .subscribe(
        response => {
          this.pacientes = response.pacientes;
          this.numberOfResults = response.numberOfResults;
          this.page = Number(response.page);
          this.pageSize = response.pageSize;
          this.loadingService.setLoadingBoolean(false);
        },
        error => {
          this.loadingService.setLoadingBoolean(false);
          this.toastService.error(error.error.message);
        }
      );
  }

  clearPaciente(): void {
    this.selectedFilterPaciente = "";
  }

  openPacienteModal({
    editMode,
    pacienteId
  }: {
    editMode: boolean;
    pacienteId?: string;
  }) {
    const modalRef = this.modalService.open(PacienteRequestComponent, {
      centered: true,
      size: "lg",
      scrollable: true
    });
    modalRef.componentInstance.editMode = editMode;
    if (pacienteId) modalRef.componentInstance.prefilledPacienteId = pacienteId;
    modalRef.componentInstance.updateList.subscribe(() => {
      this.getPacientesList();
    });
  }

  userIsAdmin(): boolean {
    return this.authService.getRole() === Roles.ADMIN;
  }
}
