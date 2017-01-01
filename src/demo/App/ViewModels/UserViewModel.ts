import { Required, MaxLength, Range, Email, Display, Hidden } from "../Decorators/index";
import { StudyStatus } from "./enum-StudyStatus";
import { StudyType } from "./enum-StudyType";
import { View } from "./ViewModel";

/**
 * View Model for table view
 */
export class UserViewModel {

  @Hidden()
  id: Number;

  @Display("E-Mail", "E-Mail address")
  @Required()
  @MaxLength(100)
  @Email()
  email: string;

  @Display("Phone Number", "The user's phone")
  @Required()
  @MaxLength(20)
  phoneNumber: string;

  @Display("User Name", "The full name")
  @Required()
  @MaxLength(100)
  userName: string;

}