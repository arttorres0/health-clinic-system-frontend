import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RecepcionistasListComponent } from "./recepcionistas-list.component";

describe("RecepcionistasListComponent", () => {
  let component: RecepcionistasListComponent;
  let fixture: ComponentFixture<RecepcionistasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecepcionistasListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionistasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
