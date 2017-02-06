import * as Validator from 'svogv';

/**
 * View Model for table view.
 * 
 * The intializer (= 0 and = '') are required to force the TS compiler to create properties. This is required to loop the element 
 * 
 */
export class UserViewModelList {

  @Validator.Hidden()
  id: number = 0;

  @Validator.Display('E-Mail', 20, 'E-Mail address')
  @Validator.Required()
  @Validator.MaxLength(100)
  @Validator.Email()
  email: string = '';

  @Validator.Display('Phone Number', 30, 'The user\'s phone')
  @Validator.Required()
  @Validator.MaxLength(20)
  phoneNumber: string = '';

  @Validator.Display('User Name', 10, 'The full name')
  @Validator.Required()
  @Validator.MaxLength(100)
  userName: string = '';

  @Validator.Display('Age', 40, 'From 12 to 88')
  @Validator.Range(12, 88)
  age: number = 24;


}
