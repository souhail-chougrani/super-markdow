import { createAction, props } from '@ngrx/store';


export const actionSettingsChangeTheme = createAction(
  '[Settings] Change Theme',
  props<{ theme: string }>()
);
export const actionSettingsChangeAutoNightMode = createAction(
  '[Settings] Change Auto Night Mode',
  props<{ autoNightMode: boolean }>()
);


export const actionSettingsChangeHour = createAction(
  '[Settings] Change Hours',
  props<{ hour: number }>()
);

export const actionSttingsToggle = createAction(
    '[Settings] TOGGLE'
);

export const actionSttingsSaving = createAction(
    '[Settings] Saving'
);