
import { createAction, props } from '@ngrx/store';
import { FileContent, FileElement } from 'src/app/models/FileElement';

export const addFile = createAction(
    '[Markdow File] Add file',
    props<{file:FileElement}>()
);

// export const addFolder = createAction(
//     '[Markdow File] Add Folder',
//     props<{ name: string }>()
// );

export const removeFile = createAction(
    '[Markdow File]  remove file',
    props<{ id:string }>()
);

export const moveFile = createAction(
    '[Markdow File] Move file',
    props<{ parent: FileElement, self: FileElement }>()
);

export const updateFile = createAction(
    '[Markdow File] Update file',
    props<{file:FileElement}>()
);

