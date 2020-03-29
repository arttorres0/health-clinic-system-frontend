import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RecepcionistaRequestComponent } from "./recepcionista-request.component";

describe("RecepcionistaRequestComponent", () => {
  let component: RecepcionistaRequestComponent;
  let fixture: ComponentFixture<RecepcionistaRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecepcionistaRequestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionistaRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
