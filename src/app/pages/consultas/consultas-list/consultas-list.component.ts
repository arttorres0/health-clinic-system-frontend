import { Component, OnInit } from "@angular/core";
import { ConsultasService } from "../consultas.service";
import { LoadingService } from "src/app/loading/loading.service";
import { ToastService } from "src/app/toast/toast.service";
import {
  NgbDateStruct,
  NgbCalendar,
  NgbModal
} from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  map
} from "rxjs/operators";
import { MedicosService } from "../../medicos/medicos.service";
import { Medico } from "../../medicos/Medico";
import { PacientesService } from "../../pacientes/pacientes.service";
import { Paciente } from "../../pacientes/Paciente";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Consulta, ViewModeTypes, WorkingHours } from "../Consulta";
import { ConsultaRequestComponent } from "../consulta-request/consulta-request.component";

@Component({
  selector: "app-consultas-list",
  templateUrl: "./consultas-list.component.html",
  styleUrls: ["./consultas-list.component.scss"]
})
export class ConsultasListComponent implements OnInit {
  readonly viewModeTypes: typeof ViewModeTypes = ViewModeTypes;
  selectedViewMode: ViewModeTypes;
  workingHours: number[] = WorkingHours;

  consultas: Consulta[];
  prevPage: number;
  page: number;
  pageSize: number;
  numberOfResults: number;
  prevSelectedFilterDate: NgbDateStruct;
  selectedFilterDate: NgbDateStruct;
  prevSelectedFilterPaciente: Paciente;
  selectedFilterPaciente: Paciente;
  prevSelectedFilterMedico: Medico;
  selectedFilterMedico: Medico;

  calendarIcon = faCalendarAlt;

  constructor(
    private consultasService: ConsultasService,
    private medicosService: MedicosService,
    private pacientesService: PacientesService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private calendar: NgbCalendar,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.selectedFilterMedico = this.prevSelectedFilterMedico =
      history.state?.data?.medico || new Medico();
    this.selectedFilterPaciente = this.prevSelectedFilterPaciente =
      history.state?.data?.paciente || new Paciente();

    if (history.state?.data?.medico || history.state?.data?.paciente) {
      this.selectedViewMode = this.viewModeTypes.List;
    } else {
      this.selectedViewMode = this.viewModeTypes.Day;
    }

    this.page = this.prevPage = 1;
    this.selectedFilterDate = this.prevSelectedFilterDate = this.calendar.getToday();
    this.getConsultasList();
  }

  ngDoCheck() {
    if (
      this.prevSelectedFilterMedico &&
      this.selectedFilterMedico &&
      this.prevSelectedFilterPaciente &&
      this.selectedFilterPaciente
    ) {
      if (
        this.page !== this.prevPage ||
        this.selectedFilterDate !== this.prevSelectedFilterDate ||
        this.selectedFilterMedico._id !== this.prevSelectedFilterMedico._id ||
        this.selectedFilterPaciente._id !== this.prevSelectedFilterPaciente._id
      ) {
        this.getConsultasList();
        this.prevPage = this.page;
        this.prevSelectedFilterDate = this.selectedFilterDate;
        this.prevSelectedFilterMedico = this.selectedFilterMedico;
        this.prevSelectedFilterPaciente = this.selectedFilterPaciente;
      }
    }
  }

  switchViewMode(selectedViewMode: ViewModeTypes): void {
    this.selectedViewMode = selectedViewMode;
    this.getConsultasList();
  }

  getConsultasList(): void {
    this.loadingService.setLoadingBoolean(true);

    switch (this.selectedViewMode) {
      case this.viewModeTypes.Day:
        this.consultasService
          .getConsultasDay({
            idPaciente: this.selectedFilterPaciente._id,
            idMedico: this.selectedFilterMedico._id,
            data: this.selectedFilterDate
          })
          .subscribe(
            response => {
              this.consultas = response.consultas;
              this.numberOfResults = response.numberOfResults;
              this.loadingService.setLoadingBoolean(false);
            },
            error => {
              this.loadingService.setLoadingBoolean(false);
              this.toastService.error(error.error.message);
            }
          );
        break;

      case this.viewModeTypes.List:
        this.consultasService
          .getConsultasList({
            idPaciente: this.selectedFilterPaciente._id,
            idMedico: this.selectedFilterMedico._id,
            page: this.page
          })
          .subscribe(
            response => {
              this.consultas = response.consultas;
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
        break;
    }
  }

  formatterMedico = (medico: Medico): string => medico.nome;

  searchMedico = (text$: Observable<string>): Observable<any[]> =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.medicosService.getMedicosList({ filter: term }).pipe(
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
        this.pacientesService.getPacientesList({ filter: term }).pipe(
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

  filterConsultasListByHour(hour: number): any[] {
    if (this.consultas) {
      return this.consultas.filter(consulta => {
        return consulta.hora === hour;
      });
    } else {
      return [];
    }
  }

  clearMedico(): void {
    this.selectedFilterMedico = new Medico();
  }

  clearPaciente(): void {
    this.selectedFilterPaciente = new Paciente();
  }

  openConsultaModal({
    medico,
    paciente,
    data,
    hora,
    editMode,
    consultaId
  }: {
    medico?: Medico;
    paciente?: Paciente;
    hora?: number;
    data?: NgbDateStruct;
    editMode: boolean;
    consultaId?: string;
  }) {
    const modalRef = this.modalService.open(ConsultaRequestComponent, {
      centered: true,
      size: "lg",
      scrollable: true
    });

    modalRef.componentInstance.editMode = editMode;
    if (consultaId) modalRef.componentInstance.prefilledConsultaId = consultaId;
    if (medico) modalRef.componentInstance.prefilledMedico = medico;
    if (paciente) modalRef.componentInstance.prefilledPaciente = paciente;
    if (data) modalRef.componentInstance.prefilledData = data;
    if (hora) modalRef.componentInstance.prefilledHora = hora;

    modalRef.componentInstance.updateList.subscribe(() => {
      this.getConsultasList();
    });
  }
}
