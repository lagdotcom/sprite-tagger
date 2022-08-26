type AppEventTypes = {
  fileAdded: (name: string) => void;
  imageLoaded: (image: HTMLImageElement) => void;
  open: (name: string) => void;
};
export default AppEventTypes;
