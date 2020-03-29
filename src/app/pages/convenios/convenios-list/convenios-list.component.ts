import { Component, OnInit } from "@angular/core";
import { LoadingService } from "src/app/loading/loading.service";
import { ToastService } from "src/app/toast/toast.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { ConveniosService } from "../../convenios/convenios.service";
import { Convenio } from "../../convenios/Convenio";
import { ConvenioRequestComponent } from "../convenio-request/convenio-request.component";
import { AuthService } from "src/app/auth/auth.service";
import { Roles } from "src/app/auth/Roles";

@Component({
  selector: "app-convenios-list",
  templateUrl: "./convenios-list.component.html",
  styleUrls: ["./convenios-list.component.scss"]
})
export class ConveniosListComponent implements OnInit {
  convenios: Convenio[];
  prevPage: number;
  page: number;
  pageSize: number;
  numberOfResults: number;
  selectedFilterConvenio: string;

  subject: Subject<null> = new Subject();

  constructor(
    private conveniosService: ConveniosService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {
    this.subject
      .pipe(debounceTime(500))
      .subscribe(() => this.getConveniosList());
  }

  ngOnInit() {
    this.selectedFilterConvenio = "";
    this.page = this.prevPage = 1;
    this.getConveniosList();
  }

  ngDoCheck() {
    if (this.page !== this.prevPage) {
      this.getConveniosList();
      this.prevPage = this.page;
    }
  }

  getConveniosList(): void {
    this.loadingService.setLoadingBoolean(true);

    this.conveniosService
      .getConveniosList({
        filter: this.selectedFilterConvenio,
        page: this.page
      })
      .subscribe(
        response => {
          this.convenios = response.convenios;
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

  clearConvenio(): void {
    this.selectedFilterConvenio = "";
  }

  openConvenioModal({
    editMode,
    convenioId
  }: {
    editMode: boolean;
    convenioId?: string;
  }) {
    const modalRef = this.modalService.open(ConvenioRequestComponent, {
      centered: true,
      size: "lg",
      scrollable: true
    });
    modalRef.componentInstance.editMode = editMode;
    if (convenioId) modalRef.componentInstance.prefilledConvenioId = convenioId;
    modalRef.componentInstance.updateList.subscribe(() => {
      this.getConveniosList();
    });
  }

  userIsAdmin(): boolean {
    return this.authService.getRole() === Roles.ADMIN;
  }
}
