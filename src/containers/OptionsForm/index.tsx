import autobind from 'autobind-decorator';
import React from 'react';
import { InjectedIntl, InjectedIntlProps, injectIntl } from 'react-intl';
import { FieldProp, rxForm } from 'rx-react-form';
import { Observable, Subscription } from 'rxjs';
import { map, skip } from 'rxjs/operators';

import { Form } from '../../components/Form';
import { Slider } from '../../components/Slider';
import { TextInput } from '../../components/TextInput';
import { validateIpAdress } from '../../helpers/validators';
import { store } from '../../store';

interface OptionsProps {
  valueChange$?: Observable<any>;
  castIp?: FieldProp;
  onSubmit: () => void;
}

class OptionsForm extends React.Component<OptionsProps & InjectedIntlProps> {
  private subscription: Subscription;
  public componentDidMount(): void {
    this.subscription = this.props
      .valueChange$!.pipe(skip(1), map(this.reduceFormValue))
      .subscribe(settings => store.dispatch({ setSettings: settings }));
  }

  public componentWillUnmount(): void {
    this.subscription.unsubscribe();
  }

  public render(): JSX.Element {
    const { intl, castIp } = this.props;

    return (
      <Form>
        <TextInput
          label={intl.formatMessage({ id: 'options.castIp' })}
          name="castIp"
          meta={castIp}
        />
        <Slider
          label={intl.formatMessage({ id: 'options.minVolume' })}
          name="minVolume"
          min={0}
          max={5000}
          step={25}
        />
        <Slider
          label={intl.formatMessage({ id: 'options.maxVolume' })}
          name="maxVolume"
          min={0}
          max={5000}
          step={25}
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

const OptionFormWithIntl = injectIntl<OptionsProps>(OptionsForm as any);

export default rxForm<OptionsProps & { intl?: InjectedIntl }>({
  debounce: 2000,
  fields: {
    castIp: {
      validation: (value: string, formValue, { intl }) => {
        if (value !== '') {
          return validateIpAdress(value)
            ? undefined
            : intl!.formatMessage({ id: 'options.casIp.invalid' });
        } else {
          return undefined;
        }
      },
    },
    maxVolume: {},
    minVolume: {},
  },
  value$: store.pluck('settings').pipe(skip(1)) as Observable<any>,
  valueChangeObs: true,
})(OptionFormWithIntl);
