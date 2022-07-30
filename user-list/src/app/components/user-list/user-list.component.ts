import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  rowsData: RowData[] = [];
  headerChecked: boolean = false;
  headerIndeterminate: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.rowsData = this.userService.retrieveAll().map((singleUser) => ({
      user: singleUser,
      isChecked: false,
    }));
  }

  onChangeHeaderCheckBoxHandler(checkBox: HTMLInputElement) {
    checkBox.checked ? this.checkAllRows() : this.unCheckAllRows();
    this.headerChecked = checkBox.checked;
  }

  checkAllRows = () => this.rowsData.forEach((row) => (row.isChecked = true));
  unCheckAllRows = () =>
    this.rowsData.forEach((row) => (row.isChecked = false));

  onChangeRowCheckBoxHandler() {
    if (this.rowsData.every((data) => data.isChecked)) {
      console.log('Every true', this.rowsData);
      this.headerChecked = true;
      this.headerIndeterminate = false;
    } else if (this.rowsData.some((data) => data.isChecked)) {
      this.headerChecked = false;
      this.headerIndeterminate = true;
    } else {
      console.log('All false', this.rowsData);
      this.headerChecked = false;
      this.headerIndeterminate = false;
    }
  }

  onDeleteHandler(row: RowData) {
    this.deleteUser(row.user);
  }

  onDeleteCheckedUserHandler() {
    this.rowsData.forEach((row) =>
      row.isChecked ? this.deleteUser(row.user) : ''
    );
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user);
  }
}

interface RowData {
  user: User;
  isChecked: boolean;
}
