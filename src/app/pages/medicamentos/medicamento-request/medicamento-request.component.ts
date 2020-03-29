import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Medicamento } from "../Medicamento";
import { MedicamentosService } from "../medicamentos.service";
import { ToastService } from "src/app/toast/toast.service";
import { LoadingService } from "src/app/loading/loading.service";
import { AuthService } from "src/app/auth/auth.service";
import { Roles } from "src/app/auth/Roles";

@Component({
  selector: "app-medicamento-request",
  templateUrl: "./medicamento-request.component.html",
  styleUrls: ["./medicamento-request.component.scss"]
})
export class MedicamentoRequestComponent implements OnInit {
  @Input() prefilledMedicamentoId: string;
  @Input() editMode: boolean;

  @Output() updateList: EventEmitter<any> = new EventEmitter();

  medicamento: Medicamento;
  title: string;

  constructor(
    public activeModal: NgbActiveModal,
    private medicamentosService: MedicamentosService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.medicamento = new Medicamento();

    if (this.prefilledMedicamentoId) {
      this.getMedicamento(this.prefilledMedicamentoId);
    }
  }

  getMedicamento(medicamentoId: string) {
    this.editMode = false;
    this.loadingService.setLoadingBoolean(true);

    this.medicamentosService.getMedicamento(medicamentoId).subscribe(
      response => {
        this.medicamento = new Medicamento(response.medicamento);
        this.loadingService.setLoadingBoolean(false);
      },
      error => {
        this.loadingService.setLoadingBoolean(false);
        this.toastService.error(error.error.message);
      }
    );
  }

  saveMedicamento() {
    this.loadingService.setLoadingBoolean(true);

    this.medicamentosService.saveMedicamento(this.medicamento).subscribe(
      response => {
        this.getMedicamento(response.medicamento._id);
        this.updateList.next();
        this.toastService.success(response.message);
      },
      error => {
        this.loadingService.setLoadingBoolean(false);
        this.toastService.error(error.error.message);
      }
    );
  }

  updateMedicamento(ativo?: boolean) {
    this.loadingService.setLoadingBoolean(true);

    this.medicamentosService
      .updateMedicamento(this.medicamento, ativo)
      .subscribe(
        response => {
          this.getMedicamento(response.medicamento._id);
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
