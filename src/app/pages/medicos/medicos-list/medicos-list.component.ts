import { Component, OnInit } from "@angular/core";
import { LoadingService } from "src/app/loading/loading.service";
import { ToastService } from "src/app/toast/toast.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { MedicosService } from "../../medicos/medicos.service";
import { Medico } from "../../medicos/Medico";
import { MedicoRequestComponent } from "../medico-request/medico-request.component";
import { AuthService } from "src/app/auth/auth.service";
import { Roles } from "src/app/auth/Roles";

@Component({
  selector: "app-medicos-list",
  templateUrl: "./medicos-list.component.html",
  styleUrls: ["./medicos-list.component.scss"]
})
export class MedicosListComponent implements OnInit {
  medicos: Medico[];
  prevPage: number;
  page: number;
  pageSize: number;
  numberOfResults: number;
  selectedFilterMedico: string;

  subject: Subject<null> = new Subject();

  constructor(
    private medicosService: MedicosService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {
    this.subject.pipe(debounceTime(500)).subscribe(() => this.getMedicosList());
  }

  ngOnInit() {
    this.selectedFilterMedico = "";
    this.page = this.prevPage = 1;
    this.getMedicosList();
  }

  ngDoCheck() {
    if (this.page !== this.prevPage) {
      this.getMedicosList();
      this.prevPage = this.page;
    }
  }

  getMedicosList(): void {
    this.loadingService.setLoadingBoolean(true);

    this.medicosService
      .getMedicosList({
        filter: this.selectedFilterMedico,
        page: this.page
      })
      .subscribe(
        response => {
          this.medicos = response.medicos;
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

  clearMedico(): void {
    this.selectedFilterMedico = "";
  }

  openMedicoModal({
    editMode,
    medicoId
  }: {
    editMode: boolean;
    medicoId?: string;
  }) {
    const modalRef = this.modalService.open(MedicoRequestComponent, {
      centered: true,
      size: "lg",
      scrollable: true
    });
    modalRef.componentInstance.editMode = editMode;
    if (medicoId) modalRef.componentInstance.prefilledMedicoId = medicoId;
    modalRef.componentInstance.updateList.subscribe(() => {
      this.getMedicosList();
    });
  }

  userIsAdmin(): boolean {
    return this.authService.getRole() === Roles.ADMIN;
  }
}
