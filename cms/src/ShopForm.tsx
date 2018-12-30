// tslint:disable:react-a11y-role-has-required-aria-props react-a11y-no-onchange react-this-binding-issue
import * as React from 'react';

interface IShopAttribute {
  name: string;
  address: string;
  hoursNote: string;
}

interface IState {
  key: string;
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
}

export class ShopForm extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // shops
      key: '',
      email: '',
      tel: '',
      permanentClosed: false,
      transferTo: '',
      web: '',
      ec: '',
      facebook: '',
      twitter: '',
      instagram: '',
      instagramTag: '',
      googleMaps: '',
      hasRoaster: 0,
      hasSpeciality: 0,
      hasBeans: 0,
      hasCredit: 0,
      hasPower: 0,
      hasWifi: 0,
      hasBarrierFree: 0,
      hasPet: 0,
      hasSmoking: 0,
      // shop attributes
      en: {
        name: '',
        address: '',
        hoursNote: '',
      },
      ja: {
        name: '',
        address: '',
        hoursNote: '',
      },
      // shop open hours
      openHours: [
        [['07:00', '20:00']],
        [['07:00', '20:00']],
        [['07:00', '20:00']],
        [['07:00', '20:00']],
        [['07:00', '20:00']],
        [['07:00', '20:00']],
        [['07:00', '20:00']],
      ],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // tslint:disable-next-line:max-func-body-length
  public render(): JSX.Element {
    return (
      <form className="ShopForm" onSubmit={this.onSubmit}>
        <table>
          <tbody>
            <tr>
              <th colSpan={2}>Shop Key(ID)</th>
              <td>
                <input
                  type="text"
                  name="key"
                  value={this.state.key}
                  onChange={this.onChange}
                  placeholder="coffee-handbook"
                />
              </td>
            </tr>
            <tr>
              <th rowSpan={2}>Name</th>
              <th>English</th>
              <td>
                <input
                  type="text"
                  name="en.name"
                  value={this.state.en.name}
                  onChange={this.onChange}
                  placeholder="COFFEE HANDBOOK"
                />
              </td>
            </tr>
            <tr>
              <th>日本語</th>
              <td>
                <input
                  type="text"
                  name="ja.name"
                  value={this.state.ja.name}
                  onChange={this.onChange}
                  placeholder="珈琲手帖"
                />
              </td>
            </tr>
            <tr>
              <th rowSpan={2}>Address</th>
              <th>English</th>
              <td>
                <input
                  type="text"
                  name="en.address"
                  value={this.state.en.address}
                  onChange={this.onChange}
                  placeholder="111-1, COFFEE, HANDBOOK"
                />
              </td>
            </tr>
            <tr>
              <th>日本語</th>
              <td>
                <input
                  type="text"
                  name="ja.address"
                  value={this.state.ja.address}
                  onChange={this.onChange}
                  placeholder="手帖珈琲111-1"
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
                  value={this.state.email}
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
                  value={this.state.tel}
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
                  value={this.state.web}
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
                  value={this.state.ec}
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
                  value={this.state.facebook}
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
                  value={this.state.twitter}
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
                  value={this.state.instagram}
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
                  value={this.state.instagramTag}
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
                  value={this.state.googleMaps}
                  onChange={this.onChange}
                  placeholder="https://goo.gl/maps/coffee-handbook"
                />
              </td>
            </tr>
            <tr>
              <th rowSpan={9}>Services</th>
              <th>Has roaster?</th>
              <td>
                <select name="hasRoaster" onChange={this.onChange} value={this.state.hasRoaster}>
                  <option value="0">No</option>
                  <option value="2">Yes</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Serve speciality coffee?</th>
              <td>
                <select name="hasSpeciality" onChange={this.onChange} value={this.state.hasSpeciality}>
                  <option value="0">No</option>
                  <option value="2">Yes</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Sell coffee beans?</th>
              <td>
                <select name="hasBeans" onChange={this.onChange} value={this.state.hasBeans}>
                  <option value="0">No</option>
                  <option value="2">Yes</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Use creadit card?</th>
              <td>
                <select name="hasCredit" onChange={this.onChange} value={this.state.hasCredit}>
                  <option value="0">No</option>
                  <option value="1">Yes, but partially</option>
                  <option value="2">Yes</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Has power?</th>
              <td>
                <select name="hasPower" onChange={this.onChange} value={this.state.hasPower}>
                  <option value="0">No</option>
                  <option value="1">Yes, but partially</option>
                  <option value="2">Yes</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Has wifi?</th>
              <td>
                <select name="hasWifi" onChange={this.onChange} value={this.state.hasWifi}>
                  <option value="0">No</option>
                  <option value="2">Yes</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Barrier free shop?</th>
              <td>
                <select name="hasBarrierFree" onChange={this.onChange} value={this.state.hasBarrierFree}>
                  <option value="0">No</option>
                  <option value="1">Yes, but partially</option>
                  <option value="2">Yes</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Can customers take pets?</th>
              <td>
                <select name="hasPet" onChange={this.onChange} value={this.state.hasPet}>
                  <option value="0">No</option>
                  <option value="1">Yes, but partially</option>
                  <option value="2">Yes</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Can customers smoke?</th>
              <td>
                <select name="hasSmoking" onChange={this.onChange} value={this.state.hasSmoking}>
                  <option value="0">No</option>
                  <option value="1">Yes, but partially</option>
                  <option value="2">Yes</option>
                </select>
              </td>
            </tr>
            {this.state.openHours.map((dayOpenHours: string[][], i: number) => {
              return dayOpenHours.length ? (
                dayOpenHours.map((openHours: string[], j: number) => {
                  const contentElement: JSX.Element = (
                    <td key={j}>
                      <input
                        type="time"
                        value={this.state.openHours[i][j][0]}
                        name={`openHours.${i}.${j}.0`}
                        onChange={this.onChange}
                      />
                      -
                      <input
                        type="time"
                        value={this.state.openHours[i][j][1]}
                        name={`openHours.${i}.${j}.1`}
                        onChange={this.onChange}
                      />
                      <button
                        onClick={(event: React.MouseEvent<HTMLElement>): void => {
                          event.preventDefault();
                          const newState: IState = JSON.parse(JSON.stringify(this.state));
                          newState.openHours[i].splice(j, 1);
                          this.setState(newState);
                        }}
                      >
                        DELETE
                      </button>
                    </td>
                  );

                  return (
                    <tr key={`${i}-${j}`}>
                      {j === 0 ? (
                        <th rowSpan={dayOpenHours.length}>
                          {i}
                          <button
                            className="Icon"
                            onClick={(event: React.MouseEvent<HTMLElement>): void => {
                              event.preventDefault();
                              const newState: IState = JSON.parse(JSON.stringify(this.state));
                              newState.openHours[i].push(
                                JSON.parse(JSON.stringify(newState.openHours[i][newState.openHours[i].length - 1])),
                              );
                              this.setState(newState);
                            }}
                          >
                            add
                          </button>
                        </th>
                      ) : null}
                      {contentElement}
                    </tr>
                  );
                })
              ) : (
                <tr key={`${i}-0`}>
                  <th>{i}</th>
                  <td />
                </tr>
              );
            })}
            <tr>
              <th rowSpan={2}>Hours Note</th>
              <th>English</th>
              <td>
                <input
                  type="text"
                  name="en.hoursNote"
                  value={this.state.en.hoursNote}
                  onChange={this.onChange}
                  placeholder="Holiday 10:00 - 18:00"
                />
              </td>
            </tr>
            <tr>
              <th>日本語</th>
              <td>
                <input
                  type="text"
                  name="ja.hoursNote"
                  value={this.state.ja.hoursNote}
                  onChange={this.onChange}
                  placeholder="祝日 10:00 - 18:00"
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
    const name: string = event.currentTarget.name;
    const value: string = event.currentTarget.value;

    const newState: IState = JSON.parse(JSON.stringify(this.state));
    // tslint:disable-next-line:no-any
    let tmp: any = newState;
    const accessKeys: string[] = name.split('.');
    for (let i: number = 0; i < accessKeys.length - 1; i += 1) {
      const accessKey: string = accessKeys[i];
      tmp = tmp[accessKey];
    }
    tmp[accessKeys[accessKeys.length - 1]] = value;
    this.setState(newState);
  }

  private onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(this.state);
  }
}
