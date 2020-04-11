import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { NgbActiveModal, NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { SolicitacaoDeExame } from "../SolicitacaoDeExame";
import { Medico } from "../../medicos/Medico";
import { Paciente } from "../../pacientes/Paciente";
import { MedicosService } from "../../medicos/medicos.service";
import { PacientesService } from "../../pacientes/pacientes.service";
import { Observable, Subject, merge } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  catchError,
  switchMap,
} from "rxjs/operators";
import { ToastService } from "src/app/toast/toast.service";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { SolicitacoesDeExameService } from "../solicitacoes-de-exame.service";
import { LoadingService } from "src/app/loading/loading.service";
import { Roles } from "src/app/auth/Roles";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-solicitacao-de-exame-request",
  templateUrl: "./solicitacao-de-exame-request.component.html",
  styleUrls: ["./solicitacao-de-exame-request.component.scss"],
})
export class SolicitacaoDeExameRequestComponent implements OnInit {
  calendarIcon = faCalendarAlt;

  @Input() prefilledSolicitacaoDeExameId: string;
  @Input() editMode: boolean;

  @Output() updateList: EventEmitter<any> = new EventEmitter();

  @ViewChild("instanceFilterMedico", { static: true })
  instanceFilterMedico: NgbTypeahead;
  focusFilterMedico$ = new Subject<string>();
  clickFilterMedico$ = new Subject<string>();

  @ViewChild("instanceFilterPaciente", { static: true })
  instanceFilterPaciente: NgbTypeahead;
  focusFilterPaciente$ = new Subject<string>();
  clickFilterPaciente$ = new Subject<string>();

  examTypesList: string[];
  solicitacaoDeExame: SolicitacaoDeExame;
  resultFile: File;
  title: string;

  constructor(
    public activeModal: NgbActiveModal,
    private solicitacoesDeExameService: SolicitacoesDeExameService,
    private medicosService: MedicosService,
    private pacientesService: PacientesService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.solicitacaoDeExame = new SolicitacaoDeExame();
    this.resultFile = null;

    if (this.prefilledSolicitacaoDeExameId) {
      this.getSolicitacaoDeExame(this.prefilledSolicitacaoDeExameId);
    } else {
      this.getExamTypesList();
    }
  }

  getSolicitacaoDeExame(solicitacaoDeExameId: string) {
    this.editMode = false;
    this.loadingService.setLoadingBoolean(true);

    this.solicitacoesDeExameService
      .getSolicitacaoDeExame(solicitacaoDeExameId)
      .subscribe(
        (response) => {
          this.solicitacaoDeExame = new SolicitacaoDeExame(
            response.solicitacaoDeExame
          );
          this.loadingService.setLoadingBoolean(false);
        },
        (error) => {
          this.loadingService.setLoadingBoolean(false);
          this.toastService.error(error.error.message);
        }
      );
  }

  getExamTypesList(): void {
    this.loadingService.setLoadingBoolean(true);

    this.solicitacoesDeExameService.getExamTypesList().subscribe(
      (response) => {
        this.examTypesList = response.listaDeTiposDeExame.sort((a, b) =>
          a > b ? 1 : -1
        );
        this.loadingService.setLoadingBoolean(false);
      },
      (error) => {
        this.loadingService.setLoadingBoolean(false);
        this.toastService.error(error.error.message);
      }
    );
  }

  formatterMedico = (medico: Medico): string => medico.nome;

  clickFilterMedicoEvent($event, typeaheadInstance) {
    if (typeaheadInstance.isPopupOpen()) {
      this.clickFilterMedico$.next($event.target.value);
    }
  }

  searchMedico = (text$: Observable<string>): Observable<any[]> => {
    const debouncedText$ = text$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );

    return merge(
      debouncedText$,
      this.focusFilterMedico$,
      this.clickFilterMedico$
    ).pipe(
      switchMap((term) =>
        this.medicosService.getMedicosList({ filter: term, ativo: true }).pipe(
          map((response) => {
            return response.medicos;
          }),
          catchError((error) => {
            this.toastService.error(error.error.message);
            return [];
          })
        )
      )
    );
  };

  formatterPaciente = (paciente: Paciente): string => paciente.nome;

  clickFilterPacienteEvent($event, typeaheadInstance) {
    if (typeaheadInstance.isPopupOpen()) {
      this.clickFilterPaciente$.next($event.target.value);
    }
  }

  searchPaciente = (text$: Observable<string>): Observable<any[]> => {
    const debouncedText$ = text$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );

    return merge(
      debouncedText$,
      this.focusFilterPaciente$,
      this.clickFilterPaciente$
    ).pipe(
      switchMap((term) =>
        this.pacientesService
          .getPacientesList({ filter: term, ativo: true })
          .pipe(
            map((response) => {
              return response.pacientes;
            }),
            catchError((error) => {
              this.toastService.error(error.error.message);
              return [];
            })
          )
      )
    );
  };

  saveSolicitacaoDeExame() {
    this.loadingService.setLoadingBoolean(true);

    this.solicitacoesDeExameService
      .saveSolicitacaoDeExame(this.solicitacaoDeExame)
      .subscribe(
        (response) => {
          this.getSolicitacaoDeExame(response.solicitacaoDeExame._id);
          this.updateList.next();
          this.toastService.success(response.message);
        },
        (error) => {
          this.loadingService.setLoadingBoolean(false);
          this.toastService.error(error.error.message);
        }
      );
  }

  userIsMedico(): boolean {
    return this.authService.getRole() === Roles.MEDICO;
  }

  handleResultInput(files: FileList): void {
    this.resultFile = files.item(0);
  }

  saveSolicitacaoDeExameResultFile(): void {
    this.loadingService.setLoadingBoolean(true);

    this.solicitacoesDeExameService
      .saveResultSolicitacaoDeExame(
        this.solicitacaoDeExame._id,
        this.resultFile
      )
      .subscribe(
        (response) => {
          this.getSolicitacaoDeExame(this.solicitacaoDeExame._id);
          this.updateList.next();
          this.toastService.success(response.message);
        },
        (error) => {
          this.loadingService.setLoadingBoolean(false);
          this.toastService.error(error.error.message);
        }
      );
  }

  getSolicitacaoDeExameResultFile(): void {
    this.loadingService.setLoadingBoolean(true);

    this.solicitacoesDeExameService
      .getResultSolicitacaoDeExame(this.solicitacaoDeExame._id)
      .subscribe(
        (response) => {
          let newBlob = new Blob([response]);

          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
          }

          const data = window.URL.createObjectURL(newBlob);

          var link = document.createElement("a");
          link.href = data;
          link.download = this.solicitacaoDeExame.nomeArquivoResultado;
          link.dispatchEvent(
            new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              view: window,
            })
          );

          setTimeout(function () {
            window.URL.revokeObjectURL(data);
            link.remove();
          }, 100);
          this.loadingService.setLoadingBoolean(false);
        },
        (error) => {
          this.loadingService.setLoadingBoolean(false);
          this.toastService.error(error.error.message);
        }
      );
  }
}
