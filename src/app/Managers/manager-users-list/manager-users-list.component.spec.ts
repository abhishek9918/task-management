import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerUsersListComponent } from './manager-users-list.component';

describe('ManagerUsersListComponent', () => {
  let component: ManagerUsersListComponent;
  let fixture: ComponentFixture<ManagerUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerUsersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
