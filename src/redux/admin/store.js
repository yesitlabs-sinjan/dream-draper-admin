import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlices";
import libraryReducer from './slices/libraryCategorySlice'
import projectReducer from './slices/projectManagemetSlice'
import TutorialAndMediaReducer from './slices/TutorialAndMediaSlices'

export const store = configureStore({
  reducer: {
    user: adminReducer,
    libCategory: libraryReducer,
    project: projectReducer,
    TutorialAndMedia: TutorialAndMediaReducer
  },
});