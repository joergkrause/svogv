﻿import * as Validator from 'svogv';
import * as UI from 'svogv';
import { PercentPipe } from './pipe/percent.pipe';

/**
 * View Model for table view.
 *
 * The intializer (= 0 and = '') are required to force the TS compiler to create properties.
 * This is required use for-in loops on the element.
 *
 */
export class UserViewModelList {

  @UI.Hidden()
  id = 0;

  @UI.Display('E-Mail', 20, 'E-Mail address')
  @Validator.Required()
  @Validator.MaxLength(100)
  @Validator.Email()
  email = '';

  @UI.Display('Phone Number', 30, 'The user\'s phone')
  @Validator.Required()
  @Validator.MaxLength(20)
  phoneNumber = '';

  @UI.Display('User Name', 10, 'The full name')
  @Validator.Required()
  @Validator.MaxLength(100)
  @UI.UiHint({ 'width': '200px' })
  userName = '';

  @UI.Display('Age', 40, 'From 12 to 88')
  @Validator.Range(12, 88)
  @Validator.TemplateHint('AgeTemplate')
  @UI.Sortable(true, (a, b) => a > b ? -1 : 1)
  age = 0;

  @UI.Display('Done', 100, 'Work progress')
  @UI.FormatPipe(PercentPipe)
  @UI.Sortable(false)
  done?: number = 0;

  @UI.Display('Active', 200, 'User is active')
  @UI.Sortable(false)
  active?= false;

}
