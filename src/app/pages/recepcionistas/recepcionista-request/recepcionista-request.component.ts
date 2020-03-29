import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Recepcionista } from "../Recepcionista";
import { RecepcionistasService } from "../recepcionistas.service";
import { ToastService } from "src/app/toast/toast.service";
import { LoadingService } from "src/app/loading/loading.service";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import * as moment from "moment";
import { AuthService } from "src/app/auth/auth.service";
import { Roles } from "src/app/auth/Roles";

@Component({
  selector: "app-recepcionista-request",
  templateUrl: "./recepcionista-request.component.html",
  styleUrls: ["./recepcionista-request.component.scss"]
})
export class RecepcionistaRequestComponent implements OnInit {
  @Input() prefilledRecepcionistaId: string;
  @Input() editMode: boolean;

  @Output() updateList: EventEmitter<any> = new EventEmitter();

  calendarIcon = faCalendarAlt;
  minCalendarDate: NgbDateStruct;
  maxCalendarDate: NgbDateStruct;

  recepcionista: Recepcionista;
  title: string;

  constructor(
    public activeModal: NgbActiveModal,
    private recepcionistasService: RecepcionistasService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.recepcionista = new Recepcionista();

    if (this.prefilledRecepcionistaId) {
      this.getRecepcionista(this.prefilledRecepcionistaId);
    }

    let currentYear = moment(new Date()).year();
    this.minCalendarDate = { year: currentYear - 120, month: 1, day: 1 };
    this.maxCalendarDate = { year: currentYear + 120, month: 1, day: 1 };
  }

  getRecepcionista(recepcionistaId: string) {
    this.editMode = false;
    this.loadingService.setLoadingBoolean(true);

    this.recepcionistasService.getRecepcionista(recepcionistaId).subscribe(
      response => {
        this.recepcionista = new Recepcionista(response.recepcionista);
        this.loadingService.setLoadingBoolean(false);
      },
      error => {
        this.loadingService.setLoadingBoolean(false);
        this.toastService.error(error.error.message);
      }
    );
  }

  saveRecepcionista() {
    this.loadingService.setLoadingBoolean(true);

    this.recepcionistasService.saveRecepcionista(this.recepcionista).subscribe(
      response => {
        this.getRecepcionista(response.recepcionista._id);
        this.updateList.next();
        this.toastService.success(response.message);
      },
      error => {
        this.loadingService.setLoadingBoolean(false);
        this.toastService.error(error.error.message);
      }
    );
  }

  updateRecepcionista(ativo?: boolean) {
    this.loadingService.setLoadingBoolean(true);

    this.recepcionistasService
      .updateRecepcionista(this.recepcionista, ativo)
      .subscribe(
        response => {
          this.getRecepcionista(response.recepcionista._id);
          this.updateList.next();
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
