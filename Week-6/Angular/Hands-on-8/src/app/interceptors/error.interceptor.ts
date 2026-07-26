import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected HTTP error occurred.';
      if (error.status === 401) {
        errorMessage = 'Unauthorized: Access is denied due to invalid credentials.';
      } else if (error.status === 500) {
        errorMessage = 'Internal Server Error: Something went wrong on the server.';
      } else if (error.error instanceof ErrorEvent) {
        errorMessage = `Network Error: ${error.error.message}`;
      } else {
        errorMessage = `Error ${error.status}: ${error.message}`;
      }
      console.error('HTTP Error Intercepted:', errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
