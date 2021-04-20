import { OnInit, OnDestroy, Directive } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive()
export class BaseComponent implements OnInit, OnDestroy {
  private unsuscribe$ = new Subject();

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }

  observable<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(takeUntil(this.unsuscribe$));
  }
}
