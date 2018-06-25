export interface IExperiment {
  key: string;
  weights: number[];
}

export class HypothesisTesting {
  public static max: number = 1000000000000000;

  private experiments: IExperiment[];

  constructor(experiments: IExperiment[]) {
    this.experiments = experiments;

    this.validate(this.experiments);
  }

  public segment(experimentKey: string, segId: string): number {
    const targetExperiment: IExperiment = this.experiments.filter(
      (experiment: IExperiment): boolean => {
        return experiment.key === experimentKey;
      },
    )[0];

    if (targetExperiment) {
      const seg: number = Number(segId.replace('SEG', ''));
      const thresholds: number[] = targetExperiment.weights.map(
        (weight: number): number => {
          return HypothesisTesting.max * weight;
        },
      );
      let threshold: number = 0;
      for (let i: number = 0; i < thresholds.length; i += 1) {
        if (threshold < seg && seg <= threshold + thresholds[i]) {
          return i;
        } else {
          threshold += thresholds[i];
        }
      }
    }
  }

  public getSegId(): string {
    // tslint:disable-next-line:insecure-random
    const num: number = Math.floor(Math.random() * HypothesisTesting.max);

    return `SEG${num}`;
  }

  private validate(experiments: IExperiment[]): void {
    experiments.forEach(
      (experiment: IExperiment): void => {
        const total: number = experiment.weights.reduce(
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
