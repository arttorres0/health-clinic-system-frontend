import { Component, OnInit, ViewChild } from "@angular/core";
import { ReceitasDeMedicamentoService } from "../receitas-de-medicamento.service";
import { LoadingService } from "src/app/loading/loading.service";
import { ToastService } from "src/app/toast/toast.service";
import {
  NgbDateStruct,
  NgbModal,
  NgbTypeahead,
} from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subject, merge } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  map,
  filter,
} from "rxjs/operators";
import { MedicosService } from "../../medicos/medicos.service";
import { Medico } from "../../medicos/Medico";
import { PacientesService } from "../../pacientes/pacientes.service";
import { Paciente } from "../../pacientes/Paciente";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { ReceitaDeMedicamento } from "../ReceitaDeMedicamento";
import { ReceitaDeMedicamentoRequestComponent } from "../receita-de-medicamento-request/receita-de-medicamento-request.component";
import { Roles } from "src/app/auth/Roles";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-receitas-de-medicamento-list",
  templateUrl: "./receitas-de-medicamento-list.component.html",
  styleUrls: ["./receitas-de-medicamento-list.component.scss"],
})
export class ReceitasDeMedicamentoListComponent implements OnInit {
  receitasDeMedicamento: ReceitaDeMedicamento[];
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

  @ViewChild("instanceFilterMedico", { static: true })
  instanceFilterMedico: NgbTypeahead;
  focusFilterMedico$ = new Subject<string>();
  clickFilterMedico$ = new Subject<string>();

  @ViewChild("instanceFilterPaciente", { static: true })
  instanceFilterPaciente: NgbTypeahead;
  focusFilterPaciente$ = new Subject<string>();
  clickFilterPaciente$ = new Subject<string>();

  calendarIcon = faCalendarAlt;

  constructor(
    private receitasDeMedicamentoService: ReceitasDeMedicamentoService,
    private medicosService: MedicosService,
    private pacientesService: PacientesService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.selectedFilterMedico = this.prevSelectedFilterMedico =
      history.state?.data?.medico || new Medico();
    this.selectedFilterPaciente = this.prevSelectedFilterPaciente =
      history.state?.data?.paciente || new Paciente();

    this.page = this.prevPage = 1;
    this.selectedFilterDate = this.prevSelectedFilterDate = null;
    this.getReceitasDeMedicamentoList();
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
        this.getReceitasDeMedicamentoList();
        this.prevPage = this.page;
        this.prevSelectedFilterDate = this.selectedFilterDate;
        this.prevSelectedFilterMedico = this.selectedFilterMedico;
        this.prevSelectedFilterPaciente = this.selectedFilterPaciente;
      }
    }
  }

  getReceitasDeMedicamentoList(): void {
    this.loadingService.setLoadingBoolean(true);

    this.receitasDeMedicamentoService
      .getReceitasDeMedicamentoList({
        idPaciente: this.selectedFilterPaciente._id,
        idMedico: this.selectedFilterMedico._id,
        data: this.selectedFilterDate,
        page: this.page,
      })
      .subscribe(
        (response) => {
          this.receitasDeMedicamento = response.receitasDeMedicamento;
          this.numberOfResults = response.numberOfResults;
          this.page = Number(response.page);
          this.pageSize = response.pageSize;
          this.loadingService.setLoadingBoolean(false);
        },
        (error) => {
          this.loadingService.setLoadingBoolean(false);
          this.toastService.error(error.error.message);
        }
      );
  }

  formatterMedico = (medico: Medico): string => medico.nome;

  searchMedico = (text$: Observable<string>): Observable<any[]> => {
    const debouncedText$ = text$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.clickFilterMedico$.pipe(
      filter(() => !this.instanceFilterMedico.isPopupOpen())
    );

    return merge(
      debouncedText$,
      this.focusFilterMedico$,
      clicksWithClosedPopup$
    ).pipe(
      switchMap((term) =>
        this.medicosService.getMedicosList({ filter: term }).pipe(
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

  searchPaciente = (text$: Observable<string>): Observable<any[]> => {
    const debouncedText$ = text$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.clickFilterPaciente$.pipe(
      filter(() => !this.instanceFilterPaciente.isPopupOpen())
    );

    return merge(
      debouncedText$,
      this.focusFilterPaciente$,
      clicksWithClosedPopup$
    ).pipe(
      switchMap((term) =>
        this.pacientesService.getPacientesList({ filter: term }).pipe(
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

  clearDate(): void {
    this.selectedFilterDate = null;
  }

  clearMedico(): void {
    this.selectedFilterMedico = new Medico();
  }

  clearPaciente(): void {
    this.selectedFilterPaciente = new Paciente();
  }

  openReceitaDeMedicamentoModal({
    editMode,
    receitaDeMedicamentoId,
  }: {
    editMode: boolean;
    receitaDeMedicamentoId?: string;
  }) {
    const modalRef = this.modalService.open(
      ReceitaDeMedicamentoRequestComponent,
      {
        centered: true,
        size: "lg",
        scrollable: true,
      }
    );

    modalRef.componentInstance.editMode = editMode;
    if (receitaDeMedicamentoId)
      modalRef.componentInstance.prefilledReceitaDeMedicamentoId = receitaDeMedicamentoId;

    modalRef.componentInstance.updateList.subscribe(() => {
      this.getReceitasDeMedicamentoList();
    });
  }

  userIsMedico(): boolean {
    return this.authService.getRole() === Roles.MEDICO;
  }
}
