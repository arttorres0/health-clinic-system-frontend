import { Component, OnInit } from "@angular/core";
import { LoadingService } from "src/app/loading/loading.service";
import { ToastService } from "src/app/toast/toast.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { MedicamentosService } from "../../medicamentos/medicamentos.service";
import { Medicamento } from "../../medicamentos/Medicamento";
import { MedicamentoRequestComponent } from "../medicamento-request/medicamento-request.component";
import { AuthService } from "src/app/auth/auth.service";
import { Roles } from "src/app/auth/Roles";

@Component({
  selector: "app-medicamentos-list",
  templateUrl: "./medicamentos-list.component.html",
  styleUrls: ["./medicamentos-list.component.scss"]
})
export class MedicamentosListComponent implements OnInit {
  medicamentos: Medicamento[];
  prevPage: number;
  page: number;
  pageSize: number;
  numberOfResults: number;
  selectedFilterMedicamento: string;

  subject: Subject<null> = new Subject();

  constructor(
    private medicamentosService: MedicamentosService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {
    this.subject
      .pipe(debounceTime(500))
      .subscribe(() => this.getMedicamentosList());
  }

  ngOnInit() {
    this.selectedFilterMedicamento = "";
    this.page = this.prevPage = 1;
    this.getMedicamentosList();
  }

  ngDoCheck() {
    if (this.page !== this.prevPage) {
      this.getMedicamentosList();
      this.prevPage = this.page;
    }
  }

  getMedicamentosList(): void {
    this.loadingService.setLoadingBoolean(true);

    this.medicamentosService
      .getMedicamentosList({
        filter: this.selectedFilterMedicamento,
        page: this.page
      })
      .subscribe(
        response => {
          this.medicamentos = response.medicamentos;
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

  clearMedicamento(): void {
    this.selectedFilterMedicamento = "";
  }

  openMedicamentoModal({
    editMode,
    medicamentoId
  }: {
    editMode: boolean;
    medicamentoId?: string;
  }) {
    const modalRef = this.modalService.open(MedicamentoRequestComponent, {
      centered: true,
      size: "lg",
      scrollable: true
    });
    modalRef.componentInstance.editMode = editMode;
    if (medicamentoId)
      modalRef.componentInstance.prefilledMedicamentoId = medicamentoId;
    modalRef.componentInstance.updateList.subscribe(() => {
      this.getMedicamentosList();
    });
  }

  userIsAdmin(): boolean {
    return this.authService.getRole() === Roles.ADMIN;
  }
}
