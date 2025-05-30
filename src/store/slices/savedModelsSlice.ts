// Project: course-fit

import { StateCreator } from 'zustand';
import { SavedModel } from '../../types/courseFit.js';

export interface SavedModelsSlice {
  savedModels: SavedModel[];
  saveModel: (data: { name: string; description?: string }) => void;
  loadModel: (id: string) => void;
  deleteModel: (id: string) => void;
}

// This slice manages the saved models in the store
// It allows saving, loading, and deleting models from the state
export const createSavedModelsSlice: StateCreator<SavedModelsSlice> = (set, get, api) => ({
  savedModels: [],
  
  saveModel: (data) => set((state) => ({
    savedModels: [
      ...state.savedModels,
      {
        id: crypto.randomUUID(),
        name: data.name,
        description: data.description,
        createdAt: new Date().toISOString(),
        courseId: '', // Add current course ID
        comparisonCourseId: '', // Add comparison course ID if exists
        attributes: {
          drivingImportance: 0,
          approachImportance: 0,
          puttingImportance: 0,
        },
      },
    ],
  })),
  
  loadModel: (id) => {
    const model = get().savedModels.find(m => m.id === id);
    if (model) {
      // Implement loading logic
    }
  },
  
  deleteModel: (id) => set((state) => ({
    savedModels: state.savedModels.filter(m => m.id !== id),
  })),
});