import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredenciaisAdminComponent } from './credenciais-admin.component';

describe('CredenciaisAdminComponent', () => {
  let component: CredenciaisAdminComponent;
  let fixture: ComponentFixture<CredenciaisAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredenciaisAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredenciaisAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
