import autobind from 'autobind-decorator';
import React from 'react';
import { rxForm } from 'rx-react-form';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, skip, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

interface OptionsProps {
  valueChange$?: Observable<any>;
  onSubmit: () => void;
}

class OptionsForm extends React.Component<OptionsProps> {
  private subscription: Subscription;

  public componentDidMount(): void {
    this.subscription = this.props
      .valueChange$!.pipe(
        skip(1),
        map(this.reduceFormValue),
        switchMap(formValue => browser.storage.local.set(formValue)),
      )
      .subscribe();
  }

  public componentWillUnmount(): void {
    this.subscription.unsubscribe();
  }

  public render(): JSX.Element {
    return (
      <form>
        <input type="range" name="maxVolume" min="0" max="5000" step="25" />
        <input type="range" name="minVolume" min="0" max="5000" step="25" />
        <input type="text" name="castIp" />
      </form>
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

export default rxForm<OptionsProps>({
  debounce: 2000,
  fields: {
    castIp: {},
    maxVolume: {},
    minVolume: {},
  },
  value$: fromPromise(browser.storage.local.get() as Promise<any>),
  valueChangeObs: true,
})(OptionsForm as any);
