import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Medico } from "../Medico";
import { MedicosService } from "../medicos.service";
import { ToastService } from "src/app/toast/toast.service";
import { LoadingService } from "src/app/loading/loading.service";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import * as moment from "moment";
import { AuthService } from "src/app/auth/auth.service";
import { Roles } from "src/app/auth/Roles";

@Component({
  selector: "app-medico-request",
  templateUrl: "./medico-request.component.html",
  styleUrls: ["./medico-request.component.scss"]
})
export class MedicoRequestComponent implements OnInit {
  @Input() prefilledMedicoId: string;
  @Input() editMode: boolean;

  @Output() updateList: EventEmitter<any> = new EventEmitter();

  calendarIcon = faCalendarAlt;
  minCalendarDate: NgbDateStruct;
  maxCalendarDate: NgbDateStruct;

  medico: Medico;
  title: string;

  constructor(
    public activeModal: NgbActiveModal,
    private medicosService: MedicosService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.medico = new Medico();

    if (this.prefilledMedicoId) {
      this.getMedico(this.prefilledMedicoId);
    }

    let currentYear = moment(new Date()).year();
    this.minCalendarDate = { year: currentYear - 120, month: 1, day: 1 };
    this.maxCalendarDate = { year: currentYear + 120, month: 1, day: 1 };
  }

  getMedico(medicoId: string) {
    this.loadingService.setLoadingBoolean(true);

    this.medicosService.getMedico(medicoId).subscribe(
      response => {
        this.medico = new Medico(response.medico);
        this.loadingService.setLoadingBoolean(false);
        console.log(this.medico);
      },
      error => {
        this.loadingService.setLoadingBoolean(false);
        this.toastService.error(error.error.message);
      }
    );
  }

  saveMedico() {
    this.loadingService.setLoadingBoolean(true);

    this.medicosService.saveMedico(this.medico).subscribe(
      response => {
        this.getMedico(response.medico._id);
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

  updateMedico(ativo?: boolean) {
    this.loadingService.setLoadingBoolean(true);

    this.medicosService.updateMedico(this.medico, ativo).subscribe(
      response => {
        this.getMedico(response.medico._id);
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
