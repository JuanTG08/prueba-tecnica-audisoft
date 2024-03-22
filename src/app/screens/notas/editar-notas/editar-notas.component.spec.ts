import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarNotasComponent } from './editar-notas.component';

describe('EditarNotasComponent', () => {
  let component: EditarNotasComponent;
  let fixture: ComponentFixture<EditarNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarNotasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
