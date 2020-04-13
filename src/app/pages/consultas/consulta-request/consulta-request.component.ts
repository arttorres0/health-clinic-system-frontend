import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import {
  NgbActiveModal,
  NgbDateStruct,
  NgbTypeahead,
} from "@ng-bootstrap/ng-bootstrap";
import { Consulta, WorkingHours, ConsultaTypes } from "../Consulta";
import { Medico } from "../../medicos/Medico";
import { Paciente } from "../../pacientes/Paciente";
import { Convenio } from "../../convenios/Convenio";
import { MedicosService } from "../../medicos/medicos.service";
import { PacientesService } from "../../pacientes/pacientes.service";
import { Observable, Subject, merge } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  catchError,
  switchMap,
  filter,
} from "rxjs/operators";
import { ToastService } from "src/app/toast/toast.service";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { ConsultasService } from "../consultas.service";
import { LoadingService } from "src/app/loading/loading.service";
import { ConveniosService } from "../../convenios/convenios.service";

@Component({
  selector: "app-consulta-request",
  templateUrl: "./consulta-request.component.html",
  styleUrls: ["./consulta-request.component.scss"],
})
export class ConsultaRequestComponent implements OnInit {
  readonly workingHours: number[] = WorkingHours;
  readonly consultasTypes: string[] = ConsultaTypes;
  calendarIcon = faCalendarAlt;

  @Input() prefilledConsultaId: string;
  @Input() prefilledHora: number;
  @Input() prefilledData: NgbDateStruct;
  @Input() prefilledMedico: Medico;
  @Input() prefilledPaciente: Paciente;
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

  @ViewChild("instanceFilterConvenio", { static: true })
  instanceFilterConvenio: NgbTypeahead;
  focusFilterConvenio$ = new Subject<string>();
  clickFilterConvenio$ = new Subject<string>();

  consulta: Consulta;
  title: string;

  constructor(
    public activeModal: NgbActiveModal,
    private consultasService: ConsultasService,
    private medicosService: MedicosService,
    private pacientesService: PacientesService,
    private conveniosService: ConveniosService,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.consulta = new Consulta();

    if (this.prefilledConsultaId) {
      this.getConsulta(this.prefilledConsultaId);
    } else {
      this.prefilledData && (this.consulta.data = this.prefilledData);
      this.prefilledHora && (this.consulta.hora = this.prefilledHora);
      this.prefilledMedico && (this.consulta.idMedico = this.prefilledMedico);
      this.prefilledPaciente &&
        (this.consulta.idPaciente = this.prefilledPaciente);
    }
  }

  getConsulta(consultaId: string) {
    this.editMode = false;
    this.loadingService.setLoadingBoolean(true);

    this.consultasService.getConsulta(consultaId).subscribe(
      (response) => {
        this.consulta = new Consulta(response.consulta);
        this.loadingService.setLoadingBoolean(false);
      },
      (error) => {
        this.loadingService.setLoadingBoolean(false);
        this.toastService.error(error.error.message);
      }
    );
  }

  formatterMedico = (medico: Medico): string => medico?.nome;

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

  formatterPaciente = (paciente: Paciente): string => paciente?.nome;

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

  formatterConvenio = (convenio: Convenio): string => convenio?.nome;

  clickFilterConvenioEvent($event, typeaheadInstance) {
    if (typeaheadInstance.isPopupOpen()) {
      this.clickFilterConvenio$.next($event.target.value);
    }
  }

  searchConvenio = (text$: Observable<string>): Observable<any[]> => {
    const debouncedText$ = text$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );

    return merge(
      debouncedText$,
      this.focusFilterConvenio$,
      this.clickFilterConvenio$
    ).pipe(
      switchMap((term) =>
        this.conveniosService
          .getConveniosList({ filter: term, ativo: true })
          .pipe(
            map((response) => {
              return response.convenios;
            }),
            catchError((error) => {
              this.toastService.error(error.error.message);
              return [];
            })
          )
      )
    );
  };

  saveConsulta() {
    this.loadingService.setLoadingBoolean(true);

    this.consultasService.saveConsulta(this.consulta).subscribe(
      (response) => {
        this.getConsulta(response.consulta._id);
        this.updateList.next();
        this.toastService.success(response.message);
      },
      (error) => {
        this.loadingService.setLoadingBoolean(false);
        this.toastService.error(error.error.message);
      }
    );
  }

  updateConsulta(status?: string) {
    this.loadingService.setLoadingBoolean(true);

    this.consultasService.updateConsulta(this.consulta, status).subscribe(
      (response) => {
        this.getConsulta(response.consulta._id);
        this.updateList.next();
        this.toastService.success(response.message);
      },
      (error) => {
        this.loadingService.setLoadingBoolean(false);
        this.toastService.error(error.error.message);
      }
    );
  }

  deleteConsulta() {
    this.loadingService.setLoadingBoolean(true);

    this.consultasService.deleteConsulta(this.consulta).subscribe(
      (response) => {
        this.updateList.next();
        this.activeModal.close();
        this.toastService.success(response.message);
      },
      (error) => {
        this.loadingService.setLoadingBoolean(false);
        this.toastService.error(error.error.message);
      }
    );
  }
}
