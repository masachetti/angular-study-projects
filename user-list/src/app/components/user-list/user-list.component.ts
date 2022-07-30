import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  _rowsData: RowData[] = [];
  rowsToShow: RowData[] = [];

  globalCheckBoxCheckedState: boolean = false;
  globalCheckBoxIndeterminateState: boolean = false;
  globalCheckBoxDisabled: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this._rowsData = this.userService.retrieveAll().map((singleUser) => ({
      user: singleUser,
      isChecked: false,
    }));
    this.rowsToShow = this._rowsData;
  }

  onChangeHeaderCheckBoxHandler(checkBox: HTMLInputElement) {
    checkBox.checked ? this.checkAllRows() : this.unCheckAllRows();
    this.globalCheckBoxCheckedState = checkBox.checked;
  }

  checkAllRows = () => this.rowsToShow.forEach((row) => (row.isChecked = true));
  unCheckAllRows = () =>
    this.rowsToShow.forEach((row) => (row.isChecked = false));

  onChangeRowCheckBoxHandler() {
    this.updateHeaderCheckBoxState();
  }

  private updateHeaderCheckBoxState() {
    if (this.rowsToShow.length === 0){
      this.globalCheckBoxCheckedState = false;
      this.globalCheckBoxIndeterminateState = false;
      this.globalCheckBoxDisabled = true;
      return
    }
    this.globalCheckBoxDisabled = false;
    if (this.rowsToShow.every((data) => data.isChecked)) {
      console.log('Every true', this.rowsToShow);
      this.globalCheckBoxCheckedState = true;
      this.globalCheckBoxIndeterminateState = false;
    } else if (this.rowsToShow.some((data) => data.isChecked)) {
      this.globalCheckBoxCheckedState = false;
      this.globalCheckBoxIndeterminateState = true;
    } else {
      console.log('All false', this.rowsToShow);
      this.globalCheckBoxCheckedState = false;
      this.globalCheckBoxIndeterminateState = false;
    }
  }

  onDeleteHandler(row: RowData) {
    this.deleteUser(row.user);
  }

  onDeleteCheckedUserHandler() {
    this.rowsToShow.forEach((row) =>
      row.isChecked ? this.deleteUser(row.user) : ''
    );
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user);
  }

  _filterBy: string = "";

  set filter(value: string){
    this._filterBy = value;

    this.rowsToShow = this._rowsData.filter(
      ({ user }) =>
        user.name
          .toLocaleLowerCase()
          .indexOf(this._filterBy.toLocaleLowerCase()) > -1
    );
    this.updateHeaderCheckBoxState();
  }

  get filter(): string{
    return this._filterBy;
  }
}

interface RowData {
  user: User;
  isChecked: boolean;
}
