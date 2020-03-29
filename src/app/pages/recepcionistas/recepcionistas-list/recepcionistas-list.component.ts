import { Component, OnInit } from "@angular/core";
import { LoadingService } from "src/app/loading/loading.service";
import { ToastService } from "src/app/toast/toast.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { RecepcionistasService } from "../../recepcionistas/recepcionistas.service";
import { Recepcionista } from "../../recepcionistas/Recepcionista";
import { RecepcionistaRequestComponent } from "../recepcionista-request/recepcionista-request.component";
import { AuthService } from "src/app/auth/auth.service";
import { Roles } from "src/app/auth/Roles";

@Component({
  selector: "app-recepcionistas-list",
  templateUrl: "./recepcionistas-list.component.html",
  styleUrls: ["./recepcionistas-list.component.scss"]
})
export class RecepcionistasListComponent implements OnInit {
  recepcionistas: Recepcionista[];
  prevPage: number;
  page: number;
  pageSize: number;
  numberOfResults: number;
  selectedFilterRecepcionista: string;

  subject: Subject<null> = new Subject();

  constructor(
    private recepcionistasService: RecepcionistasService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {
    this.subject
      .pipe(debounceTime(500))
      .subscribe(() => this.getRecepcionistasList());
  }

  ngOnInit() {
    this.selectedFilterRecepcionista = "";
    this.page = this.prevPage = 1;
    this.getRecepcionistasList();
  }

  ngDoCheck() {
    if (this.page !== this.prevPage) {
      this.getRecepcionistasList();
      this.prevPage = this.page;
    }
  }

  getRecepcionistasList(): void {
    this.loadingService.setLoadingBoolean(true);

    this.recepcionistasService
      .getRecepcionistasList({
        filter: this.selectedFilterRecepcionista,
        page: this.page
      })
      .subscribe(
        response => {
          this.recepcionistas = response.recepcionistas;
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

  clearRecepcionista(): void {
    this.selectedFilterRecepcionista = "";
  }

  openRecepcionistaModal({
    editMode,
    recepcionistaId
  }: {
    editMode: boolean;
    recepcionistaId?: string;
  }) {
    const modalRef = this.modalService.open(RecepcionistaRequestComponent, {
      centered: true,
      size: "lg",
      scrollable: true
    });
    modalRef.componentInstance.editMode = editMode;
    if (recepcionistaId)
      modalRef.componentInstance.prefilledRecepcionistaId = recepcionistaId;
    modalRef.componentInstance.updateList.subscribe(() => {
      this.getRecepcionistasList();
    });
  }

  userIsAdmin(): boolean {
    return this.authService.getRole() === Roles.ADMIN;
  }
}
