import { Component, OnInit } from "@angular/core";
import { ConsultasService } from "../consultas.service";
import { LoadingService } from "src/app/loading/loading.service";
import { ToastService } from "src/app/toast/toast.service";
import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
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
import { Consulta } from "../Consulta";

@Component({
  selector: "app-consultas-list",
  templateUrl: "./consultas-list.component.html",
  styleUrls: ["./consultas-list.component.scss"]
})
export class ConsultasListComponent implements OnInit {
  consultas: Consulta[];
  prevPage: number;
  page: number;
  pageSize: number;
  numberOfResults: number;
  hours: number[] = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  prevSelectedFilterDate: NgbDateStruct;
  selectedFilterDate: NgbDateStruct;
  prevSelectedFilterPaciente: Paciente;
  selectedFilterPaciente: Paciente;
  prevSelectedFilterMedico: Medico;
  selectedFilterMedico: Medico;
  viewMode: string;

  calendarIcon = faCalendarAlt;

  constructor(
    private consultasService: ConsultasService,
    private medicosService: MedicosService,
    private pacientesService: PacientesService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private calendar: NgbCalendar
  ) {}

  ngOnInit() {
    this.selectedFilterMedico = this.prevSelectedFilterMedico = history.state
      ?.data?.medico
      ? new Medico(
          history.state?.data?.medico.id,
          history.state?.data?.medico.nome
        )
      : new Medico();
    this.selectedFilterPaciente = this.prevSelectedFilterPaciente = history
      .state?.data?.paciente
      ? new Paciente(
          history.state?.data?.paciente.id,
          history.state?.data?.paciente.nome
        )
      : new Paciente();

    if (history.state?.data?.medico || history.state?.data?.paciente) {
      this.viewMode = "list";
    } else {
      this.viewMode = "day";
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

  switchViewMode(viewMode: string): void {
    this.viewMode = viewMode;
    this.getConsultasList();
  }

  getConsultasList(): void {
    this.loadingService.setLoadingBoolean(true);

    switch (this.viewMode) {
      case "day":
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

      case "list":
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
        this.medicosService.getMedicos({ filter: term }).pipe(
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
        this.pacientesService.getPacientes({ filter: term }).pipe(
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

  clearDate(): void {
    this.selectedFilterDate = null;
  }

  clearMedico(): void {
    this.selectedFilterMedico = new Medico();
  }

  clearPaciente(): void {
    this.selectedFilterPaciente = new Paciente();
  }
}
