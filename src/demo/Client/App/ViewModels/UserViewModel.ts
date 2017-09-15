import { Required, MaxLength, Range, Email, Compare, Display, DisplayGroup, Hidden } from 'svogv';

/**
 * View Model for form view.
 *
 * The intializer (= 0 and = '') are required to force the TS compiler to create properties.
 * This is required to loop the element.
 *
 */
export class UserViewModel {

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
  @Required('User Name is required')
  @MaxLength(100)
  userName: string = '';
  
  @Display('Age', 40, 'From 12 to 88')
  @DisplayGroup('Personal')
  @Range(12, 88)
  age: number = 24;

  @Display('Birthday', 50)
  @DisplayGroup('Personal')
  birthday: Date = new Date();

  @Display('Is Admin', 60)
  isAdmin: boolean = true;

  @Display('Password', 70)
  @DisplayGroup('Password')
  @Required()
  @Compare('passWordTwo')
  passWord: string = '';

  @Display('Password', 80)
  @DisplayGroup('Password')
  @Required()
  passWordTwo: string = '';

}
