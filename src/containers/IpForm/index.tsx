import autobind from 'autobind-decorator';
import React from 'react';
import { InjectedIntl, InjectedIntlProps, injectIntl } from 'react-intl';
import { FieldProp, rxForm } from 'rx-react-form';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, filter, map, skip, switchMap } from 'rxjs/operators';

import { Form, TextInput } from '../../components/Form';
import { validateIpAdress } from '../../helpers/validators';
import { store } from '../../store';

interface IpProps {
  valueChange$?: Observable<any>;
  castIp?: FieldProp;
}

class BasicIpForm extends React.Component<IpProps & InjectedIntlProps> {
  private subscription: Subscription;
  public componentDidMount(): void {
    this.subscription = this.props
      .valueChange$!.pipe(
        skip(1),
        filter(({ castIp }) => !castIp.error),
        map(this.reduceFormValue),
        debounceTime(5000),
        switchMap(state => browser.storage.local.set(state).then(() => state)),
      )
      .subscribe(setState => store.dispatch({ setState }));
  }

  public componentWillUnmount(): void {
    this.subscription.unsubscribe();
  }

  public render(): JSX.Element {
    const { intl, castIp } = this.props;

    return (
      <Form style={{ marginTop: '50px' }}>
        <TextInput
          label={intl.formatMessage({ id: 'options.castIp' })}
          name="castIp"
          meta={castIp}
        />
      </Form>
    );
  }

  @autobind
  private reduceFormValue(formValue: any): Record<string, any> {
    return Object.keys(formValue)
      .filter(key => formValue[key].value !== '')
      .reduce(
        (acc, key) => ({
          ...acc,
          [key]: formValue[key].value,
        }),
        {},
      );
  }
}

const RxIpForm = rxForm<IpProps & { intl?: InjectedIntl }>({
  valueChangeObs: true,
  fields: {
    castIp: {
      validation: (value: string, formValue, { intl, ...props }) => {
        if (value !== '') {
          return validateIpAdress(value)
            ? undefined
            : intl!.formatMessage({ id: 'options.castIp.invalid' });
        } else {
          return undefined;
        }
      },
    },
  },
})(BasicIpForm as any);

export const IpForm = injectIntl<IpProps>(RxIpForm as any);
