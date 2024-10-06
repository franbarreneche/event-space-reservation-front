import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserInformationService } from './user-information.service';

export const userInformationResolver: ResolveFn<{
  id: number,
  name: string, email: string,
  is_admin: boolean
}> = (route, state) => {
  return inject(UserInformationService).getUserInformation();
};
