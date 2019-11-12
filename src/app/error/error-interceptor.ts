import { 
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
     catchError((error: HttpErrorResponse) => {
       let errorMessage = "An unknown error occured!"
       if (error) {
        console.log('error: ' + JSON.stringify(error));
        errorMessage = error.error.message;
       }
       this.toastr.error(errorMessage, null, {
        positionClass: 'toast-bottom-right'
       });
       return throwError(error);
     })
    );
  }
}
