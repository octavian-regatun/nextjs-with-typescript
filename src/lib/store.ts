import create from "zustand";
import LatLon from "../interfaces/latLon";
import { devtools } from "zustand/middleware";
import { Location } from "./states";
import AutocompleteLocation from "@/interfaces/autocompleteLocation";
import Queue from "@/classes/Queue";

interface CurrentLocationStore {
  currentLocation: LatLon;
  setCurrentLocation: (location: LatLon) => void;
}

export const useCurrentLocationStore = create<CurrentLocationStore>(
  devtools(set => ({
    currentLocation: {
      lat: null,
      lon: null,
    },
    setCurrentLocation: location => set({ currentLocation: location }),
  }))
);

interface HistoryLocationStore {
  historyLocation: Queue<AutocompleteLocation>;
  addHistoryLocation: (location: AutocompleteLocation) => void;
}

export const useHistoryLocationStore = create<HistoryLocationStore>(
  devtools(set => ({
    historyLocation: new Queue([], 5),
    addHistoryLocation: location =>
      set(state => {
        state.historyLocation.add(location);
      }),
  }))
);
