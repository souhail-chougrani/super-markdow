import { AppState } from "../../app.state";

export const NIGHT_MODE_THEME = 'black-theme';


export interface SettingsState {
  theme: string;
  autoNightMode: boolean;
  nightTheme: string;
  hour: number;
  open:boolean
}

export interface State extends AppState {
  settings: SettingsState;
}
