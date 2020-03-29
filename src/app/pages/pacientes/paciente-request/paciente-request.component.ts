import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Paciente } from "../Paciente";
import { PacientesService } from "../pacientes.service";
import { ToastService } from "src/app/toast/toast.service";
import { LoadingService } from "src/app/loading/loading.service";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import * as moment from "moment";
import { AuthService } from "src/app/auth/auth.service";
import { Roles } from "src/app/auth/Roles";

@Component({
  selector: "app-paciente-request",
  templateUrl: "./paciente-request.component.html",
  styleUrls: ["./paciente-request.component.scss"]
})
export class PacienteRequestComponent implements OnInit {
  @Input() prefilledPacienteId: string;
  @Input() editMode: boolean;

  @Output() updateList: EventEmitter<any> = new EventEmitter();

  calendarIcon = faCalendarAlt;
  minCalendarDate: NgbDateStruct;
  maxCalendarDate: NgbDateStruct;

  paciente: Paciente;
  title: string;

  constructor(
    public activeModal: NgbActiveModal,
    private pacientesService: PacientesService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.paciente = new Paciente();

    if (this.prefilledPacienteId) {
      this.getPaciente(this.prefilledPacienteId);
    }

    let currentYear = moment(new Date()).year();
    this.minCalendarDate = { year: currentYear - 120, month: 1, day: 1 };
    this.maxCalendarDate = { year: currentYear + 120, month: 1, day: 1 };
  }

  getPaciente(pacienteId: string) {
    this.loadingService.setLoadingBoolean(true);

    this.pacientesService.getPaciente(pacienteId).subscribe(
      response => {
        this.paciente = new Paciente(response.paciente);
        this.loadingService.setLoadingBoolean(false);
      },
      error => {
        this.loadingService.setLoadingBoolean(false);
        this.toastService.error(error.error.message);
      }
    );
  }

  savePaciente() {
    this.loadingService.setLoadingBoolean(true);

    this.pacientesService.savePaciente(this.paciente).subscribe(
      response => {
        this.getPaciente(response.paciente._id);
        this.updateList.next();
        this.editMode = false;
        this.toastService.success(response.message);
      },
      error => {
        this.loadingService.setLoadingBoolean(false);
        this.toastService.error(error.error.message);
      }
    );
  }

  updatePaciente(ativo?: boolean) {
    this.loadingService.setLoadingBoolean(true);

    this.pacientesService.updatePaciente(this.paciente, ativo).subscribe(
      response => {
        this.getPaciente(response.paciente._id);
        this.updateList.next();
        this.editMode = false;
        this.toastService.success(response.message);
      },
      error => {
        this.loadingService.setLoadingBoolean(false);
        this.toastService.error(error.error.message);
      }
    );
  }

  userIsAdmin(): boolean {
    return this.authService.getRole() === Roles.ADMIN;
  }
}
