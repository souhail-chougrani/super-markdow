import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { merge, of, tap, withLatestFrom } from 'rxjs';
import { AppState, selectSettingsState } from 'src/app/app-store/app.state';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { addFile, getFiles, removeFile, updateFile } from '../actions';
import { getFilesVisualised, selectFilesState } from '../selectors';



const FILS_KEY = "FILES";
const INIT = of('app-init-effect-trigger');

@Injectable({
    providedIn: 'root'
})
export class FileEffects {
    constructor(private localStorageService: LocalStorageService, private store: Store<AppState>, private actions$: Actions) { }

    persistFiles = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    addFile,
                    updateFile,
                    removeFile
                ),
                withLatestFrom(this.store.pipe(select(selectFilesState))),
                tap(([action, settings]) => {
                    this.localStorageService.setItem(FILS_KEY, {files:settings})
                })
            ),
        { dispatch: false }
    );

    getinitFiles = createEffect(
        () =>
            merge(INIT, this.actions$.pipe(ofType(getFiles))).pipe(

            ),
        { dispatch: false }
    );


}