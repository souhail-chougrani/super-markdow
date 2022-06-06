import { createSelector } from "@ngrx/store";
import { selectRouterState } from "src/app/app-store/app.state";
import { FileElement } from "src/app/models/FileElement";
import * as fromFeature from '../reducers';



export const selectFilesState = createSelector(
    fromFeature.getFileState,
    (state: fromFeature.MarkdownState) => state.files
);


export const selectFilesEntities =  createSelector(
    selectFilesState,
    (state)=>state.entities
);
  
  export const getSelectedFile = createSelector(
    selectFilesEntities,
    selectRouterState,
    (entities, router):FileElement => {
      return router.state && entities[router.state.params['id']] as FileElement;
    }
  );

  export const getAllFiles = createSelector(selectFilesEntities, entities => {
    return Object.keys(entities).map(id => entities[id]);
  });

  export const selectFolders = createSelector(
    getAllFiles,
    state => state.filter(folder=>folder.isFolder)
  )
  
  export const getFilesVisualised = createSelector(
    getAllFiles,
    (state) => {
        let result :any;
        state.forEach(element => {
            if(element.isFolder || (!element.isFolder && element.parent==='root')){
                result ={...result,[element.id as string]:{...element,children:[]}};
            }
            state.forEach(e=>{
                if (e.parent === element.id) {
                    result[e.parent as string].children = [...result[e.parent as string].children,e]
                }
            })
        })
        return  Object.values(result ?? {})
    }
  );
  

  
