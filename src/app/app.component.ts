import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AppState } from './app-store/app.state';
import { actionSettingsChangeAutoNightMode, actionSettingsChangeTheme, actionSttingsToggle } from './app-store/settings/actions/settings.action';
import { selectAutoNightMode, selectEffectiveTheme, selectSettings } from './app-store/settings/selectors/settings.selector';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  theme = new FormControl("default-theme");

  themes = [
    { value: 'default-theme', label: 'Blue' },
    { value: 'light-theme', label: 'Light' },
    { value: 'black-theme', label: 'Dark' }
  ];

  settings$: any;
  
  theme$: Observable<string> | undefined;
  autoNightMode$: Observable<boolean> | undefined;
 

  constructor(
    private storageService: LocalStorageService,
    private store: Store<AppState>
  ) {

  }

  ngOnInit(): void {
    this.storageService.testLocalStorage();
    this.settings$ = this.store.pipe(select(selectSettings))
    this.theme$ = this.store.pipe(select(selectEffectiveTheme),tap((value)=>this.theme.setValue(value)))

  }

  onThemeSelect(event: MatSelectChange) {
    this.store.dispatch(actionSettingsChangeTheme({ theme: event.value }));
  }
  onAutoNightModeToggle(event: MatSlideToggleChange) {
    this.store.dispatch(
      actionSettingsChangeAutoNightMode({ autoNightMode: event.checked })
    );
  }
  onToggleSidebar(){
    this.store.dispatch(actionSttingsToggle())
  }

  ngOnDestroy(): void {
  }
}
