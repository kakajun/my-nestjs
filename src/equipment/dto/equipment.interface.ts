export interface Equipment {
  id: number;
  name: string;
  parameters: {
    name: string;
    value: string;
  }[];
}
