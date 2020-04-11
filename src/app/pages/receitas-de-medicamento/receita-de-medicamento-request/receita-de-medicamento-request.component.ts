import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { NgbActiveModal, NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { ReceitaDeMedicamento } from "../ReceitaDeMedicamento";
import { Medico } from "../../medicos/Medico";
import { Paciente } from "../../pacientes/Paciente";
import { Medicamento } from "../../medicamentos/Medicamento";
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
import { ReceitasDeMedicamentoService } from "../receitas-de-medicamento.service";
import { LoadingService } from "src/app/loading/loading.service";
import { MedicamentosService } from "../../medicamentos/medicamentos.service";

@Component({
  selector: "app-receita-de-medicamento-request",
  templateUrl: "./receita-de-medicamento-request.component.html",
  styleUrls: ["./receita-de-medicamento-request.component.scss"],
})
export class ReceitaDeMedicamentoRequestComponent implements OnInit {
  calendarIcon = faCalendarAlt;

  @Input() prefilledReceitaDeMedicamentoId: string;
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

  @ViewChild("instanceFilterMedicamento", { static: true })
  instanceFilterMedicamento: NgbTypeahead;
  focusFilterMedicamento$ = new Subject<string>();
  clickFilterMedicamento$ = new Subject<string>();

  receitaDeMedicamento: ReceitaDeMedicamento;
  title: string;

  constructor(
    public activeModal: NgbActiveModal,
    private receitasDeMedicamentoService: ReceitasDeMedicamentoService,
    private medicosService: MedicosService,
    private pacientesService: PacientesService,
    private medicamentosService: MedicamentosService,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.receitaDeMedicamento = new ReceitaDeMedicamento();

    if (this.prefilledReceitaDeMedicamentoId) {
      this.getReceitaDeMedicamento(this.prefilledReceitaDeMedicamentoId);
    }
  }

  getReceitaDeMedicamento(receitaDeMedicamentoId: string) {
    this.editMode = false;
    this.loadingService.setLoadingBoolean(true);

    this.receitasDeMedicamentoService
      .getReceitaDeMedicamento(receitaDeMedicamentoId)
      .subscribe(
        (response) => {
          this.receitaDeMedicamento = new ReceitaDeMedicamento(
            response.receitaDeMedicamento
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

  formatterMedicamento = (medicamento: Medicamento): string =>
    medicamento.nomeGenerico && medicamento.nomeDeFabrica
      ? medicamento.nomeGenerico + " | " + medicamento.nomeDeFabrica
      : null;

  clickFilterMedicamentoEvent($event, typeaheadInstance) {
    if (typeaheadInstance.isPopupOpen()) {
      this.clickFilterMedicamento$.next($event.target.value);
    }
  }

  searchMedicamento = (text$: Observable<string>): Observable<any[]> => {
    const debouncedText$ = text$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );

    return merge(
      debouncedText$,
      this.focusFilterMedicamento$,
      this.clickFilterMedicamento$
    ).pipe(
      switchMap((term) =>
        this.medicamentosService
          .getMedicamentosList({ filter: term, ativo: true })
          .pipe(
            map((response) => {
              return response.medicamentos;
            }),
            catchError((error) => {
              this.toastService.error(error.error.message);
              return [];
            })
          )
      )
    );
  };

  saveReceitaDeMedicamento() {
    this.loadingService.setLoadingBoolean(true);

    this.receitasDeMedicamentoService
      .saveReceitaDeMedicamento(this.receitaDeMedicamento)
      .subscribe(
        (response) => {
          this.getReceitaDeMedicamento(response.receitaDeMedicamento._id);
          this.updateList.next();
          this.toastService.success(response.message);
        },
        (error) => {
          this.loadingService.setLoadingBoolean(false);
          this.toastService.error(error.error.message);
        }
      );
  }
}
