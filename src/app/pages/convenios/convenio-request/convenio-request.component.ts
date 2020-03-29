import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Convenio } from "../Convenio";
import { ConveniosService } from "../convenios.service";
import { ToastService } from "src/app/toast/toast.service";
import { LoadingService } from "src/app/loading/loading.service";
import { AuthService } from "src/app/auth/auth.service";
import { Roles } from "src/app/auth/Roles";

@Component({
  selector: "app-convenio-request",
  templateUrl: "./convenio-request.component.html",
  styleUrls: ["./convenio-request.component.scss"]
})
export class ConvenioRequestComponent implements OnInit {
  @Input() prefilledConvenioId: string;
  @Input() editMode: boolean;

  @Output() updateList: EventEmitter<any> = new EventEmitter();

  convenio: Convenio;
  title: string;

  constructor(
    public activeModal: NgbActiveModal,
    private conveniosService: ConveniosService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.convenio = new Convenio();

    if (this.prefilledConvenioId) {
      this.getConvenio(this.prefilledConvenioId);
    }
  }

  getConvenio(convenioId: string) {
    this.loadingService.setLoadingBoolean(true);

    this.conveniosService.getConvenio(convenioId).subscribe(
      response => {
        this.convenio = new Convenio(response.convenio);
        this.loadingService.setLoadingBoolean(false);
      },
      error => {
        this.loadingService.setLoadingBoolean(false);
        this.toastService.error(error.error.message);
      }
    );
  }

  saveConvenio() {
    this.loadingService.setLoadingBoolean(true);

    this.conveniosService.saveConvenio(this.convenio).subscribe(
      response => {
        this.getConvenio(response.convenio._id);
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

  updateConvenio(ativo?: boolean) {
    this.loadingService.setLoadingBoolean(true);

    this.conveniosService.updateConvenio(this.convenio, ativo).subscribe(
      response => {
        this.getConvenio(response.convenio._id);
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
