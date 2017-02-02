import { Required, MaxLength, Range, Email, Compare, Display, Hidden } from 'svogv';

/**
 * View Model for table view.
 * 
 * The intializer (= 0 and = '') are required to force the TS compiler to create properties. This is required to loop the element 
 * 
 */
export class UserViewModel {

  @Hidden()
  id: number = 0;

  @Display('E-Mail', 'E-Mail address')
  @Required()
  @MaxLength(100)
  @Email()
  email: string = '';

  @Display('Phone Number', 'The user\'s phone')
  @Required()
  @MaxLength(20)
  phoneNumber: string = '';

  @Display('User Name', 'The full name')
  @Required()
  @MaxLength(100)
  userName: string = '';

  @Display('Age', 'From 12 to 88')
  @Range(12, 88)
  age: number = 24;

  @Display('Birthday')
  birthday: Date = new Date();

  @Display('Is Admin')
  isAdmin: boolean = true;

  @Display('Password')
  @Required()
  @Compare('passWordTwo')
  passWord: string = '';

  @Display('Password')
  @Required()
  passWordTwo: string = '';

}
