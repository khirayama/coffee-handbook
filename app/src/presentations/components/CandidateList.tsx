import * as React from 'react';

// tslint:disable-next-line:function-name
export function CandidateList(props: { children?: React.ReactNode }): JSX.Element {
  return <ul className="CandidateList">{props.children}</ul>;
}
