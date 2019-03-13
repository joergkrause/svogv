import * as Validator from 'svogv';

import { PercentPipe } from '@angular/common';

/**
 * View Model for table view.
 *
 * The intializer (= 0 and = '') are required to force the TS compiler to create properties.
 * This is required use for-in loops on the element.
 *
 */
export class UserViewModelList {

  @Validator.Hidden()
  id = 0;

  @Validator.Display('E-Mail', 20, 'E-Mail address')
  @Validator.Required()
  @Validator.MaxLength(100)
  @Validator.Email()
  email = '';

  @Validator.Display('Phone Number', 30, 'The user\'s phone')
  @Validator.Required()
  @Validator.MaxLength(20)
  phoneNumber = '';

  @Validator.Display('User Name', 10, 'The full name')
  @Validator.Required()
  @Validator.MaxLength(100)
  userName = '';

  @Validator.Display('Age', 40, 'From 12 to 88')
  @Validator.Range(12, 88)
  @Validator.TemplateHint('AgeTemplate')
  age = 0;

  @Validator.Display('Done', 100, 'Work progress')
  @Validator.FormatPipe(PercentPipe)
  done?: number = 0;

  @Validator.Display('Active', 200, 'User is active')
  active ? = false;

}
