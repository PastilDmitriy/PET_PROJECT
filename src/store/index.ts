import ProjectsReducer from '@/app/projects/components/Projects/store/Projects.store';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    projects: ProjectsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
