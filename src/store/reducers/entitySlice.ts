
import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';
import { API_URL } from '../../types/Const';
import { EntitiesState } from '../../types/Entities';

const initialState: EntitiesState = {
  result: undefined,
  loading: false,
  error: null,
  selected: undefined
};


const slice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    entitiesReceived: (entities, action) => {
      entities.result = action.payload
      entities.selected = undefined
      entities.loading = false
    },
    entitiesRequested: (entities, action) => {
      entities.loading = true
    },
    entitiesRequestFailed: (entities, action) => {
      entities.loading = false
    },
    entityReceived: (entities, action) => {
      entities.selected = action.payload
      entities.loading = false
    },
    entityRequested: (entities, action) => {
      entities.loading = true
    },
    entityRequestFailed: (entities, action) => {
      entities.loading = false
    },
    entitiesClean: (entities) => {
      entities.loading = false
      entities.selected = undefined
      entities.result = undefined
    }
  },

});


export const {
  entitiesReceived,
  entitiesRequested,
  entitiesRequestFailed,
  entityReceived,
  entityRequested,
  entityRequestFailed,
  entitiesClean
} = slice.actions;

export const fetchEntities = (entity: string, page: string) => {
  return apiCallBegan({
    url: `${API_URL}${entity}/?page=${page}`,
    onStart: entitiesRequested.type,
    onSuccess: entitiesReceived.type,
    onError: entitiesRequestFailed.type
  })
}

export const fetchEntity = (entity: string) => {
  return apiCallBegan({
    url: `${API_URL}${entity}`,
    onStart: entityRequested.type,
    onSuccess: entityReceived.type,
    onError: entityRequestFailed.type
  })
}

export default slice.reducer;
