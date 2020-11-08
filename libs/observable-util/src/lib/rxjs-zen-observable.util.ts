import { Observable as RxObservable } from 'rxjs';
import ZenObservable from 'zen-observable';

export const toZenObservable = <T>(
  rxObservable: RxObservable<T>
): ZenObservable<T> =>
  new ZenObservable((observer) => rxObservable.subscribe(observer));
export const toRxObservable = <T>(
  rxObservable: ZenObservable<T>
): RxObservable<T> =>
  new RxObservable((observer) => rxObservable.subscribe(observer));
