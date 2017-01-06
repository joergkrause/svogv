import { Required, MaxLength, Range, Email, Display, Hidden } from "svogv";

/**
 * View Model for table view
 */
export class UserViewModel {

  constructor(id?: number, email?: string, phoneNumber?: string, userName?: string) {
    if (id) {
      this.id = id;
    }
    if (email) {
      this.email = email;
    }
    if (phoneNumber) {
      this.phoneNumber = phoneNumber;
    }
    if (userName) {
      this.userName = userName;
    }
  }

  @Hidden()
  id: number;

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