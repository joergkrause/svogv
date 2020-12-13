import * as Validator from '@svogv/core';

/**
 * View Model for table view.
 *
 * The intializer (= 0 and = '') are required to force the TS compiler to create properties.
 * This is required use for-in loops on the element.
 *
 */
export class SimpleUserViewModelList {

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

}
