import autobind from 'autobind-decorator';
import React from 'react';
import { InjectedIntl, InjectedIntlProps, injectIntl } from 'react-intl';
import { FieldProp, rxForm } from 'rx-react-form';
import { from, Observable, Subscription } from 'rxjs';
import { map, skip } from 'rxjs/operators';

import {
  Form,
  InputWrapper,
  Select,
  Switch,
  TextInput,
} from '../../components/Form';
import { validateIpAdress } from '../../helpers/validators';

interface OptionsProps {
  valueChange$?: Observable<any>;
  castIp?: FieldProp;
  notification?: FieldProp;
  theme?: FieldProp;
  setValue?: (e?: any) => void;
}

const themeOptions = [
  { value: 'light', label: 'theme.light' },
  { value: 'dark', label: 'theme.dark' },
];

const initialValues$ = from(
  browser.storage.local.get(['castIp', 'theme', 'notification']),
).pipe(
  map(({ theme, ...other }) => ({
    ...other,
    theme: theme || 'dark',
  })),
);

class BasicOptionsForm extends React.Component<
  OptionsProps & InjectedIntlProps
> {
  private subscription: Subscription;
  public componentDidMount(): void {
    this.subscription = this.props
      .valueChange$!.pipe(skip(1), map(this.reduceFormValue))
      .subscribe(settings => browser.storage.local.set(settings));
  }

  public componentWillUnmount(): void {
    this.subscription.unsubscribe();
  }

  public render(): JSX.Element {
    const { intl, castIp, notification } = this.props;
    return (
      <Form>
        <TextInput
          label={intl.formatMessage({ id: 'options.castIp' })}
          name="castIp"
          meta={castIp}
        />
        <InputWrapper>
          <Select
            label={intl.formatMessage({ id: 'options.theme' })}
            name="theme"
            options={themeOptions}
          />
        </InputWrapper>
        <InputWrapper>
          <Switch
            label={intl.formatMessage({ id: 'options.notifications' })}
            value={!!notification && !!notification.value}
            onChange={this.handleNotificationChange}
          />
        </InputWrapper>
      </Form>
    );
  }

  @autobind
  private handleNotificationChange(notification: boolean): void {
    if (this.props.setValue) {
      this.props.setValue({
        notification,
      });
    }
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

const RxOptionsForm = rxForm<OptionsProps & { intl?: InjectedIntl }>({
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
    notification: {
      customInput: true,
    },
    theme: {},
  },
  value$: initialValues$ as any,
  valueChangeObs: true,
})(BasicOptionsForm as any);

export const OptionsForm = injectIntl<OptionsProps>(RxOptionsForm as any);
