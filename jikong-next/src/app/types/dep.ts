export type IdeplistData = {
  id: number;
  label: string;
  children: IdeplistData[];
  isSelected?: number;
};

export type leftDepMenu = {
  key: string;
  label: string;
  children: leftDepMenu[];
};
