// tslint:disable:react-a11y-role-has-required-aria-props react-a11y-no-onchange react-this-binding-issue no-any
import * as React from 'react';

interface IShopAttribute {
  name: string;
  address: string;
  hoursNote: string;
}

export interface IProps {
  shopkey: string;
  email: string;
  tel: string;
  permanentClosed: boolean;
  transferTo: string;
  // media
  web: string;
  ec: string;
  facebook: string;
  twitter: string;
  instagram: string;
  instagramTag: string;
  googleMaps: string;
  // services
  hasRoaster: 0 | 2;
  hasSpeciality: 0 | 2;
  hasBeans: 0 | 2;
  hasCredit: 0 | 1 | 2;
  hasPower: 0 | 1 | 2;
  hasWifi: 0 | 2;
  hasBarrierFree: 0 | 1 | 2;
  hasPet: 0 | 1 | 2;
  hasSmoking: 0 | 1 | 2;
  // attributes
  en: IShopAttribute;
  ja: IShopAttribute;
  // openHours
  openHours: string[][][];
  // handlers
  onChange(event: React.FormEvent<HTMLInputElement | HTMLSelectElement>): void;
  onSubmit(event: React.FormEvent<HTMLFormElement>): void;
}

export class ShopForm extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // tslint:disable-next-line:max-func-body-length
  public render(): JSX.Element {
    return (
      <form className="ShopForm" onSubmit={this.onSubmit}>
        <table>
          <thead>
            <tr>
              <th colSpan={2}>column</th>
              <th>value</th>
              <th>hint</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={2}>Shop Key(ID)</th>
              <td>
                <input
                  type="text"
                  name="shopkey"
                  value={this.props.shopkey}
                  onChange={this.onChange}
                  placeholder="coffee-handbook"
                />
              </td>
              <td />
            </tr>
            <tr>
              <th rowSpan={2}>Name</th>
              <th>日本語</th>
              <td>
                <input
                  type="text"
                  name="ja.name"
                  value={this.props.ja.name}
                  onChange={this.onChange}
                  placeholder="珈琲手帖"
                />
              </td>
            </tr>
            <tr>
              <th>English</th>
              <td>
                <input
                  type="text"
                  name="en.name"
                  value={this.props.en.name}
                  onChange={this.onChange}
                  placeholder="COFFEE HANDBOOK"
                />
              </td>
            </tr>
            <tr>
              <th rowSpan={2}>Address</th>
              <th>日本語</th>
              <td>
                <input
                  type="text"
                  name="ja.address"
                  value={this.props.ja.address}
                  onChange={this.onChange}
                  placeholder="手帖珈琲111-1"
                />
              </td>
            </tr>
            <tr>
              <th>English</th>
              <td>
                <input
                  type="text"
                  name="en.address"
                  value={this.props.en.address}
                  onChange={this.onChange}
                  placeholder="111-1, COFFEE, HANDBOOK"
                />
              </td>
            </tr>
            <tr>
              <th rowSpan={2}>Contact</th>
              <th>E-MAIL</th>
              <td>
                <input
                  type="text"
                  name="email"
                  value={this.props.email}
                  onChange={this.onChange}
                  placeholder="coffee-handbook@coffeehandbook.com"
                />
              </td>
            </tr>
            <tr>
              <th>TEL</th>
              <td>
                <input
                  type="text"
                  name="tel"
                  value={this.props.tel}
                  onChange={this.onChange}
                  placeholder="09012345678"
                />
              </td>
            </tr>
            <tr>
              <th colSpan={2}>WEB</th>
              <td>
                <input
                  type="text"
                  name="web"
                  value={this.props.web}
                  onChange={this.onChange}
                  placeholder="https://coffee-handbook.com"
                />
              </td>
            </tr>
            <tr>
              <th colSpan={2}>EC</th>
              <td>
                <input
                  type="text"
                  name="ec"
                  value={this.props.ec}
                  onChange={this.onChange}
                  placeholder="https://ec.coffee-handbook.com"
                />
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Facebook</th>
              <td>
                <input
                  type="text"
                  name="facebook"
                  value={this.props.facebook}
                  onChange={this.onChange}
                  placeholder="https://www.facebook.com/coffeehandbook"
                />
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Twitter</th>
              <td>
                <input
                  type="text"
                  name="twitter"
                  value={this.props.twitter}
                  onChange={this.onChange}
                  placeholder="https://twitter.com/coffeehandbook_"
                />
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Instagram</th>
              <td>
                <input
                  type="text"
                  name="instagram"
                  value={this.props.instagram}
                  onChange={this.onChange}
                  placeholder="https://www.instagram.com/coffee_handbook"
                />
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Instagram Tag</th>
              <td>
                <input
                  type="text"
                  name="instagramTag"
                  value={this.props.instagramTag}
                  onChange={this.onChange}
                  placeholder="https://www.instagram.com/explore/tags/coffeehandbook/"
                />
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Google Maps</th>
              <td>
                <input
                  type="text"
                  name="googleMaps"
                  value={this.props.googleMaps}
                  onChange={this.onChange}
                  placeholder="https://goo.gl/maps/coffee-handbook"
                />
              </td>
            </tr>
            <tr>
              <th rowSpan={9}>Services</th>
              <th>Has roaster?</th>
              <td>
                <select name="hasRoaster" onChange={this.onChange} value={this.props.hasRoaster}>
                  <option value="0">No</option>
                  <option value="2">Yes</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Serve speciality coffee?</th>
              <td>
                <select name="hasSpeciality" onChange={this.onChange} value={this.props.hasSpeciality}>
                  <option value="0">No</option>
                  <option value="2">Yes</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Sell coffee beans?</th>
              <td>
                <select name="hasBeans" onChange={this.onChange} value={this.props.hasBeans}>
                  <option value="0">No</option>
                  <option value="2">Yes</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Use creadit card?</th>
              <td>
                <select name="hasCredit" onChange={this.onChange} value={this.props.hasCredit}>
                  <option value="0">No</option>
                  <option value="1">Yes, but partially</option>
                  <option value="2">Yes</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Has power?</th>
              <td>
                <select name="hasPower" onChange={this.onChange} value={this.props.hasPower}>
                  <option value="0">No</option>
                  <option value="1">Yes, but partially</option>
                  <option value="2">Yes</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Has wifi?</th>
              <td>
                <select name="hasWifi" onChange={this.onChange} value={this.props.hasWifi}>
                  <option value="0">No</option>
                  <option value="2">Yes</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Barrier free shop?</th>
              <td>
                <select name="hasBarrierFree" onChange={this.onChange} value={this.props.hasBarrierFree}>
                  <option value="0">No</option>
                  <option value="1">Yes, but partially</option>
                  <option value="2">Yes</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Can customers take pets?</th>
              <td>
                <select name="hasPet" onChange={this.onChange} value={this.props.hasPet}>
                  <option value="0">No</option>
                  <option value="1">Yes, but partially</option>
                  <option value="2">Yes</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Can customers smoke?</th>
              <td>
                <select name="hasSmoking" onChange={this.onChange} value={this.props.hasSmoking}>
                  <option value="0">No</option>
                  <option value="1">Yes, but partially</option>
                  <option value="2">Yes</option>
                </select>
              </td>
            </tr>
            {this.props.openHours.map((dayOpenHours: string[][], i: number) => {
              const headElement: JSX.Element = (
                <th
                  rowSpan={this.props.openHours
                    .map((tmp: string[][]) => tmp.length || 1)
                    .reduce((m: number, n: number = 0) => m + n)}
                >
                  Open Hours
                </th>
              );
              const dayElement: JSX.Element = (
                <th rowSpan={Math.max(this.props.openHours[i].length, 1)}>
                  {i}
                  <div
                    className="Icon"
                    role="button"
                    onClick={(event: React.MouseEvent<HTMLElement>): void => {
                      event.preventDefault();
                      const newState: any = JSON.parse(JSON.stringify(this.props));
                      newState.openHours[i].push(
                        newState.openHours[i][newState.openHours[i].length - 1] || ['07:00', '20:00'],
                      );
                      this.setState(newState);
                    }}
                  >
                    add
                  </div>
                </th>
              );

              return dayOpenHours.length ? (
                dayOpenHours.map((openHours: string[], j: number) => {
                  const contentElement: JSX.Element = (
                    <td key={j}>
                      <input
                        type="time"
                        value={this.props.openHours[i][j][0]}
                        name={`openHours.${i}.${j}.0`}
                        onChange={this.onChange}
                      />
                      <input
                        type="time"
                        value={this.props.openHours[i][j][1]}
                        name={`openHours.${i}.${j}.1`}
                        onChange={this.onChange}
                      />
                      <div
                        className="Icon"
                        role="button"
                        onClick={(event: React.MouseEvent<HTMLElement>): void => {
                          event.preventDefault();
                          const newState: any = JSON.parse(JSON.stringify(this.props));
                          newState.openHours[i].splice(j, 1);
                          this.setState(newState);
                        }}
                      >
                        clear
                      </div>
                    </td>
                  );

                  return (
                    <tr key={`${i}-${j}`}>
                      {i === 0 && j === 0 ? headElement : null}
                      {j === 0 ? dayElement : null}
                      {contentElement}
                    </tr>
                  );
                })
              ) : (
                <tr key={`${i}-0`}>
                  {i === 0 ? headElement : null}
                  {dayElement}
                  <td />
                </tr>
              );
            })}
            <tr>
              <th rowSpan={2}>Hours Note</th>
              <th>日本語</th>
              <td>
                <input
                  type="text"
                  name="ja.hoursNote"
                  value={this.props.ja.hoursNote}
                  onChange={this.onChange}
                  placeholder="祝日 10:00 - 18:00"
                />
              </td>
            </tr>
            <tr>
              <th>English</th>
              <td>
                <input
                  type="text"
                  name="en.hoursNote"
                  value={this.props.en.hoursNote}
                  onChange={this.onChange}
                  placeholder="Holiday 10:00 - 18:00"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button>Submit</button>
      </form>
    );
  }

  private onChange(event: React.FormEvent<HTMLInputElement | HTMLSelectElement>): void {
    this.props.onChange(event);
  }

  private onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    this.props.onSubmit(event);
  }
}
