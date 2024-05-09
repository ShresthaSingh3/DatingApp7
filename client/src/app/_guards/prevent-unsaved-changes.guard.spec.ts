import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';
import { preventUnsavedChangesGuard } from './prevent-unsaved-changes.guard';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

// describe('preventUnsavedChangesGuard', () => {
//   const executeGuard: CanDeactivateFn = (...guardParameters) => 
//       TestBed.runInInjectionContext(() => preventUnsavedChangesGuard(...guardParameters));

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//   });

//   it('should be created', () => {
//     expect(executeGuard).toBeTruthy();
//   });
// });


describe('preventUnsavedChangesGuard', () => {
  let component: Partial<MemberEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    component = { editForm: { dirty: false } as any };
  });

  it('should be created', () => {
    expect(preventUnsavedChangesGuard).toBeTruthy();
  });
});

