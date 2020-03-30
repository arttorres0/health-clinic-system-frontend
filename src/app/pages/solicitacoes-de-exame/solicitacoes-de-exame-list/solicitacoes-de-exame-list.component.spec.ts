import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SolicitacoesDeExameListComponent } from "./solicitacoes-de-exame-list.component";

describe("SolicitacoesDeExameListComponent", () => {
  let component: SolicitacoesDeExameListComponent;
  let fixture: ComponentFixture<SolicitacoesDeExameListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitacoesDeExameListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacoesDeExameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
