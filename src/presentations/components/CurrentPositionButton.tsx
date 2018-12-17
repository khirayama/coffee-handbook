import * as React from 'react';

interface IProps {
  onClick(event: React.MouseEvent<HTMLDivElement>): void;
}

// tslint:disable-next-line:function-name
export function CurrentPositionButton(props: IProps): JSX.Element {
  return (
    <div className="CurrentPositionButton" onClick={props.onClick} role="button">
      <i className="Icon">my_location</i>
    </div>
  );
}
