import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

const httpError = (error: HttpErrorResponse) => {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    errorMessage = `${error.status} - ${error.message}`;
  }
  return throwError(errorMessage);
}

  export default httpError;