import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ConveniosListComponent } from "./convenios-list.component";

describe("ConveniosListComponent", () => {
  let component: ConveniosListComponent;
  let fixture: ComponentFixture<ConveniosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConveniosListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConveniosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
