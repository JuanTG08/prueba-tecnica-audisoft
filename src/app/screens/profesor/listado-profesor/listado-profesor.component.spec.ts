import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoProfesorComponent } from './listado-profesor.component';

describe('ListadoProfesorComponent', () => {
  let component: ListadoProfesorComponent;
  let fixture: ComponentFixture<ListadoProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoProfesorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
