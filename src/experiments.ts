import { IExperiment } from 'utils/HypothesisTesting';

export const experiments: IExperiment[] = [
  {
    key: 'top-page1',
    cases: [
      {
        name: 'A',
        weight: 0.67,
      },
      {
        name: 'B',
        weight: 0.23,
      },
      {
        name: 'C',
        weight: 0.09,
      },
      {
        name: 'D',
        weight: 0.01,
      },
    ],
  },
  {
    key: 'top-page2',
    cases: [
      {
        name: 'A',
        weight: 0.5,
      },
      {
        name: 'B',
        weight: 0.5,
      },
    ],
  },
];
