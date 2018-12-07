// tslint:disable:no-any
import * as classNames from 'classnames';
import * as React from 'react';

import { connect, IContainerProps } from 'presentations/containers/Container';
import { updateCurrentPosition, updateView } from 'presentations/pages/Maps/actionCreators';
import { IPosition } from 'presentations/pages/Maps/interfaces';

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

export class CurrentPositionButton extends React.Component<IContainerProps, {}> {
  constructor(props: IContainerProps) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div
        className={classNames('CurrentPositionButton', {
          CurrentPositionButton__Hidden: !this.props.ui.isShownCurrentPositionButton,
        })}
        onClick={this.onClick}
        role="button"
      >
        <i className="Icon">my_location</i>
      </div>
    );
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
}

// tslint:disable-next-line:variable-name
export const CurrentPositionButtonContainer: React.ComponentClass = connect(CurrentPositionButton);
