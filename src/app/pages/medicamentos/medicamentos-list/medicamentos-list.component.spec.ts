import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MedicamentosListComponent } from "./medicamentos-list.component";

describe("MedicamentosListComponent", () => {
  let component: MedicamentosListComponent;
  let fixture: ComponentFixture<MedicamentosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MedicamentosListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
