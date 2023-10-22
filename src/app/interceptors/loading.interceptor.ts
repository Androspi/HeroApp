import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  #requests = 0;

  constructor(private spinner: NgxSpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.#requests === 0) { this.spinner.show(); }
    this.#requests++;

    return next.handle(request).pipe(finalize(() => {
      this.#requests--;
      this.#requests === 0 && this.spinner.hide();
    }));
  }

}
