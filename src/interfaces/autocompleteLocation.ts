export default interface AutocompleteLocation {
  id: string;
  title: string;
  position: {
    lat: number;
    lon: number;
  };
}
