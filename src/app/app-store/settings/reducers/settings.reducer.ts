import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { actionSettingsChangeAutoNightMode, actionSettingsChangeHour, actionSettingsChangeTheme, actionSttingsToggle } from '../actions/settings.action';
import { NIGHT_MODE_THEME, SettingsState } from '../models/settings.models';

export const initialState: SettingsState = {
  theme: 'default-theme',
  autoNightMode: false,
  nightTheme: NIGHT_MODE_THEME,
  hour: 0,
  open:true
};

const reducer = createReducer(
  initialState,
  on(
    actionSettingsChangeTheme,
    actionSettingsChangeAutoNightMode,
    actionSettingsChangeHour,
    (state, action) => ({ ...state, ...action })
  ),
  on(actionSttingsToggle,(state,_)=>({...state,open:!state.open}))
 
);

export function settingsReducer(
  state: SettingsState | undefined,
  action: Action
) {
  return reducer(state, action);
}