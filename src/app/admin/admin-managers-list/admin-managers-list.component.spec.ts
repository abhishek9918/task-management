import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagersListComponent } from './admin-managers-list.component';

describe('AdminManagersListComponent', () => {
  let component: AdminManagersListComponent;
  let fixture: ComponentFixture<AdminManagersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminManagersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManagersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
