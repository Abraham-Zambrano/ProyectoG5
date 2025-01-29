import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarTransferenciaComponent } from './realizar-transferencia.component';
//archivo generado por Angular cli
describe('RealizarTransferenciaComponent', () => {
  let component: RealizarTransferenciaComponent;
  let fixture: ComponentFixture<RealizarTransferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealizarTransferenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealizarTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
