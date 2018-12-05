import * as React from 'react';

export class FreeSpace extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className="FreeSpace">
        <ul className="FreeSpace--ConditionList">
          <li className="FreeSpace--ConditionList--Item">
            開店中の
            <br />
            近くの
          </li>
          <li className="FreeSpace--ConditionList--Item">こだわり</li>
          <li className="FreeSpace--ConditionList--Item">仕事に</li>
          <li className="FreeSpace--ConditionList--Item">
            ペット
            <br />
            と一緒に
          </li>
        </ul>
        <div className="FreeSpace--Ad">
          <div className="FreeSpace--Ad--Content">Advertisingt Space</div>
        </div>
      </div>
    );
  }
}
