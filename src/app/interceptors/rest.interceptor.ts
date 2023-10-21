import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { Observable, map } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class RestInterceptor implements HttpInterceptor {

    constructor(
        private snackBar: MatSnackBar
    ) { }

    intercept = (req: HttpRequest<any>, next: HttpHandler): Observable<any> => {
        return next.handle(req).pipe(
            map(event => {
                if (event.type !== HttpEventType.Response) return event;

                // if (event.body.status !== 'success') {
                //     this.snackBar.open('Lo sentimos, por favor intenta más tarde', 'Ok');
                //     return event;
                // }

                return event.clone({ body: event.body.message });
            }),
            catchError(this.#catchErrorFn)
        );
    }

    #catchErrorFn = (err: any) => {
        this.snackBar.open('Lo sentimos, por favor intenta más tarde', 'Ok');
        return err;
    };

}
