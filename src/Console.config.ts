export interface Props {
  commands: {
    speed: number;
    command: string;
    isExecutable: boolean;
  }[];
  containerClassName?: string;
  terminalClassName?: string;
}
