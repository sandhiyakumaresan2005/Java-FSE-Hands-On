import { CanDeactivateFn } from '@angular/router';

export interface ComponentWithUnsavedChanges {
  hasUnsavedChanges?: () => boolean;
  enrollForm?: { dirty: boolean };
}

export const unsavedChangesGuard: CanDeactivateFn<ComponentWithUnsavedChanges> = (component) => {
  let isDirty = false;
  if (component.hasUnsavedChanges) {
    isDirty = component.hasUnsavedChanges();
  } else if (component.enrollForm) {
    isDirty = component.enrollForm.dirty;
  }

  if (isDirty) {
    return confirm('You have unsaved changes. Do you really want to leave?');
  }
  return true;
};
