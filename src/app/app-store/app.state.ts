import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { ActionReducerMap, MetaReducer, createFeatureSelector } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { debug } from "./meta-reducers/debug.reducer";
import { initStateFromLocalStorage } from "./meta-reducers/init-state-from-local-storage.reducer";
import { RouterStateUrl } from "./router/router.state";
import { SettingsState } from "./settings/models/settings.models";
import { settingsReducer } from "./settings/reducers/settings.reducer";

export const reducers: ActionReducerMap<AppState> = {
    settings: settingsReducer,
    router: routerReducer
  };
  
  export const metaReducers: MetaReducer<AppState>[] = [
    initStateFromLocalStorage
  ];
  
  if (!environment.production) {
    if (!environment.production) {
      metaReducers.unshift(debug);
    }
  }
  

  
  export const selectSettingsState = createFeatureSelector<
    AppState,
    SettingsState
  >('settings');
  
  export const selectRouterState = createFeatureSelector<
    AppState,
    RouterReducerState<RouterStateUrl>
  >('router');
  
  export interface AppState {
   settings: SettingsState;    
   router: RouterReducerState<RouterStateUrl>;
  }
  