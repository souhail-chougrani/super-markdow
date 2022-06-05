import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromFile from './file.reducer';

export interface MarkdownState {
  files: fromFile.FileState;
}

export const reducers: ActionReducerMap<MarkdownState> = {
    files: fromFile.reducer,
};

export const getFileState = createFeatureSelector<MarkdownState>(
  'files'
);