import { IExperiment } from 'utils/HypothesisTesting';

export const experiments: IExperiment[] = [
  {
    key: 'top-page1',
    weights: [0.67, 0.23, 0.1],
  },
  {
    key: 'top-page2',
    weights: [0.5, 0.5],
  },
];
