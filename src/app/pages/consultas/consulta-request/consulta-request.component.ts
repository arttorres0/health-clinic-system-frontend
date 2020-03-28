import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Consulta, WorkingHours, ConsultaTypes } from "../Consulta";
import { Medico } from "../../medicos/Medico";
import { Paciente } from "../../pacientes/Paciente";
import { Convenio } from "../../convenios/Convenio";
import { MedicosService } from "../../medicos/medicos.service";
import { PacientesService } from "../../pacientes/pacientes.service";
import { Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  catchError,
  switchMap
} from "rxjs/operators";
import { ToastService } from "src/app/toast/toast.service";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { ConsultasService } from "../consultas.service";
import { LoadingService } from "src/app/loading/loading.service";
import { ConveniosService } from "../../convenios/convenios.service";

@Component({
  selector: "app-consulta-request",
  templateUrl: "./consulta-request.component.html",
  styleUrls: ["./consulta-request.component.scss"]
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
      this.prefilledData
        ? (this.consulta.data = this.prefilledData)
        : new Date();
      if (this.prefilledHora) this.consulta.hora = this.prefilledHora;
      this.prefilledMedico
        ? (this.consulta.idMedico = this.prefilledMedico)
        : (this.consulta.idMedico = new Medico());
      this.prefilledPaciente
        ? (this.consulta.idPaciente = this.prefilledPaciente)
        : (this.consulta.idPaciente = new Paciente());
    }
  }

  getConsulta(consultaId: string) {
    this.loadingService.setLoadingBoolean(true);

    this.consultasService.getConsulta(consultaId).subscribe(
      response => {
        this.consulta = new Consulta(response.consulta);
        this.loadingService.setLoadingBoolean(false);
      },
      error => {
        this.loadingService.setLoadingBoolean(false);
        this.toastService.error(error.error.message);
      }
    );
  }

  formatterMedico = (medico: Medico): string => medico.nome;

  searchMedico = (text$: Observable<string>): Observable<any[]> =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.medicosService.getMedicosList({ filter: term, ativo: true }).pipe(
          map(response => {
            return response.medicos;
          }),
          catchError(error => {
            this.toastService.error(error.error.message);
            return [];
          })
        )
      )
    );

  formatterPaciente = (paciente: Paciente): string => paciente.nome;

  searchPaciente = (text$: Observable<string>): Observable<any[]> =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.pacientesService.getPacientes({ filter: term, ativo: true }).pipe(
          map(response => {
            return response.pacientes;
          }),
          catchError(error => {
            this.toastService.error(error.error.message);
            return [];
          })
        )
      )
    );

  formatterConvenio = (convenio: Convenio): string => convenio.nome;

  searchConvenio = (text$: Observable<string>): Observable<any[]> =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.conveniosService.getConvenios({ filter: term, ativo: true }).pipe(
          map(response => {
            return response.convenios;
          }),
          catchError(error => {
            this.toastService.error(error.error.message);
            return [];
          })
        )
      )
    );

  saveConsulta() {
    this.loadingService.setLoadingBoolean(true);

    this.consultasService.saveConsulta(this.consulta).subscribe(
      response => {
        this.getConsulta(response.consulta._id);
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

  updateConsulta(status?: string) {
    this.loadingService.setLoadingBoolean(true);

    this.consultasService.updateConsulta(this.consulta, status).subscribe(
      response => {
        this.getConsulta(response.consulta._id);
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

  deleteConsulta() {
    this.loadingService.setLoadingBoolean(true);

    this.consultasService.deleteConsulta(this.consulta).subscribe(
      response => {
        this.updateList.next();
        this.activeModal.close();
        this.toastService.success(response.message);
      },
      error => {
        this.loadingService.setLoadingBoolean(false);
        this.toastService.error(error.error.message);
      }
    );
  }
}
