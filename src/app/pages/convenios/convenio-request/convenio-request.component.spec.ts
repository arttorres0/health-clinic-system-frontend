import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ConvenioRequestComponent } from "./convenio-request.component";

describe("ConvenioRequestComponent", () => {
  let component: ConvenioRequestComponent;
  let fixture: ComponentFixture<ConvenioRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConvenioRequestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvenioRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
