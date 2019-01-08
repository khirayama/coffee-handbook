// tslint:disable:no-any
import * as React from 'react';

import { CurrentPositionButton } from 'presentations/components/CurrentPositionButton';
import { updateCurrentPosition, updateView } from 'presentations/pages/Shops/actionCreators';
import { IPosition } from 'presentations/pages/Shops/interfaces';
import { connect, IContainerProps } from 'utils/Container';

const geolocationUtils: {
  getCurrentPosition(): Promise<IPosition>;
} = {
  getCurrentPosition: (): Promise<IPosition> => {
    return new Promise(
      (resolve: any): void => {
        window.navigator.geolocation.watchPosition(
          (pos: any): void => {
            resolve({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          },
          (err: any): void => {
            // Noop
          },
          {
            enableHighAccuracy: true,
          },
        );
      },
    );
  },
};

// tslint:disable-next-line:variable-name
export const CurrentPositionButtonContainer: React.ComponentClass = connect(
  class extends React.Component<IContainerProps, {}> {
    constructor(props: IContainerProps) {
      super(props);

      this.onClick = this.onClick.bind(this);
    }

    public render(): JSX.Element {
      return this.props.ui.isShownCurrentPositionButton ? <CurrentPositionButton onClick={this.onClick} /> : null;
    }

    private onClick(): void {
      if (this.props.ui.currentPos) {
        updateView(this.props.dispatch, this.props.ui.currentPos, this.props.ui.zoom, [0, 0]);
      }

      geolocationUtils.getCurrentPosition().then((currentPos: IPosition) => {
        updateCurrentPosition(this.props.dispatch, currentPos);
        if (this.props.ui.currentPos !== null) {
          updateView(this.props.dispatch, this.props.ui.currentPos, this.props.ui.zoom, [0, 0]);
        }
      });
    }
  },
);
