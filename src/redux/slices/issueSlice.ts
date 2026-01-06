
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Issue } from '../../services/issueService';

interface IssueState {
  issues: Issue[];
  statusCounts: Record<string, number>;
  loading: boolean;
}

const initialState: IssueState = {
  issues: [],
  statusCounts: {},
  loading: false,
};

const issueSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setIssues: (state, action: PayloadAction<Issue[]>) => {
      state.issues = action.payload;
    },
    addIssue: (state, action: PayloadAction<Issue>) => {
      state.issues.push(action.payload);
    },
    updateIssue: (state, action: PayloadAction<Issue>) => {
      const index = state.issues.findIndex(i => i.id === action.payload.id);
      if (index !== -1) state.issues[index] = action.payload;
    },
    deleteIssue: (state, action: PayloadAction<number>) => {
      state.issues = state.issues.filter(i => i.id !== action.payload);
    },
    setStatusCounts: (state, action: PayloadAction<Record<string, number>>) => {
      state.statusCounts = action.payload;
    },
  },
});

export const { setIssues, addIssue, updateIssue, deleteIssue, setStatusCounts } = issueSlice.actions;
export default issueSlice.reducer;
