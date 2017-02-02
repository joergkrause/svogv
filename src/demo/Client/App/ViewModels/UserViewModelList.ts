import { Required, MaxLength, Range, Email, Compare, Display, Hidden } from 'svogv';

/**
 * View Model for table view.
 * 
 * The intializer (= 0 and = '') are required to force the TS compiler to create properties. This is required to loop the element 
 * 
 */
export class UserViewModelList {

  @Hidden()
  id: number = 0;

  @Display('E-Mail', 20, 'E-Mail address')
  @Required()
  @MaxLength(100)
  @Email()
  email: string = '';

  @Display('Phone Number', 30, 'The user\'s phone')
  @Required()
  @MaxLength(20)
  phoneNumber: string = '';

  @Display('User Name', 10, 'The full name')
  @Required()
  @MaxLength(100)
  userName: string = '';

  @Display('Age', 40, 'From 12 to 88')
  @Range(12, 88)
  age: number = 24;


}
