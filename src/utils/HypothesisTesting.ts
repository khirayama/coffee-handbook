export interface ICase {
  name: string;
  weight: number;
}

interface IThreshold {
  name: string;
  value: number;
}

export interface IExperiment {
  key: string;
  cases: ICase[];
}

export class HypothesisTesting {
  public static max: number = 1000000000000000;

  private experiments: IExperiment[];

  constructor(experiments: IExperiment[]) {
    this.experiments = experiments;

    this.valid(this.experiments);
  }

  public segment(experimentKey: string, segId: string): string | null {
    const targetExperiment: IExperiment = this.experiments.filter(
      (experiment: IExperiment): boolean => {
        return experiment.key === experimentKey;
      },
    )[0];

    if (targetExperiment) {
      const seg: number = Number(segId.replace('SEG', ''));
      const thresholds: IThreshold[] = targetExperiment.cases.map(
        (experimentCase: ICase): IThreshold => {
          return {
            name: experimentCase.name,
            value: HypothesisTesting.max * experimentCase.weight,
          };
        },
      );

      let thresholdWeight: number = 0;
      for (const threshold of thresholds) {
        if (thresholdWeight < seg && seg <= thresholdWeight + threshold.value) {
          return threshold.name;
        } else {
          thresholdWeight += threshold.value;
        }
      }
    }

    return null;
  }

  public getSegId(): string {
    // tslint:disable-next-line:insecure-random
    const num: number = Math.floor(Math.random() * HypothesisTesting.max);

    return `SEG${num}`;
  }

  private valid(experiments: IExperiment[]): void {
    experiments.forEach(
      (experiment: IExperiment): void => {
        const total: number = experiment.cases
          .map((experimentCase: ICase) => experimentCase.weight)
          .reduce(
            (weight: number, totalWeight: number): number => {
              return weight + totalWeight;
            },
          );
        if (total !== 1) {
          throw new Error('Please adjust weights to be 1.');
        }
      },
    );
  }
}
