import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MedicoRequestComponent } from "./medico-request.component";

describe("MedicoRequestComponent", () => {
  let component: MedicoRequestComponent;
  let fixture: ComponentFixture<MedicoRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MedicoRequestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
