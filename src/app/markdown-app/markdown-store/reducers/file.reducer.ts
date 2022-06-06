import { createReducer, on } from '@ngrx/store';
import { FileElement } from 'src/app/models/FileElement';
import * as formFilesAction from '../actions/file.actions';
import * as uuid from 'uuid';

export interface FileState {
    entities: { [id: string]: FileElement }
};

const initialState: FileState = {
    entities: {


    }
};

export const reducer = createReducer(
    initialState,
    on(
        formFilesAction.addFile,
        (state, action) => {
            const id = uuid.v4()
            return { ...state, entities: { ...state.entities, [id]: { id, ...action.file } } }
        }
    ),
    on(
        formFilesAction.updateFile,
        (state, action) => ({ ...state, entities: { ...state.entities, [action.file.id as string]: action.file } }),
    ),
    on(
        formFilesAction.removeFile,
        (state, action) => {
            const { [action.id]: removed, ...entities } = state.entities;
            return {
                ...state,
                entities,
            };
        }),
);


export const getFileEntities = (state: FileState) => state.entities;
