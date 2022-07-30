import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public retrieveAll(): User[]{
    return USERS;
  }
  public deleteUser(user: User): void{
    console.log(`Delete User : ${user.name}`);
  }
}

const USERS: User[] = [
  {
    name: "Maria",
    email: "maria@gmail.com",
    role: "Developer",
    department: "Front End",
    addedAt: "01/01/2020",
    avatarUrl: 'assets/images/user1.jpg'
  },
  {
    name: "Joao",
    email: "joao@gmail.com",
    role: "Developer",
    department: "Front End",
    addedAt: "02/02/2022",
    avatarUrl: 'assets/images/user2.jpeg'
  },
  {
    name: "Pedro",
    email: "pedraomaromba@gmail.com",
    role: "Devops",
    department: "Infra",
    addedAt: "11/11/2021",
    avatarUrl: 'assets/images/user3.jpeg'
  },
  {
    name: "Josefina",
    email: "josefinadejesus@gmail.com",
    role: "Developer",
    department: "Back End",
    addedAt: "30/12/2015",
    avatarUrl: 'assets/images/user4.jpg'
  },
  {
    name: "Carlos",
    email: "carlao@gmail.com",
    role: "Developer",
    department: "Back End",
    addedAt: "02/10/2010",
    avatarUrl: 'assets/images/user5.jpg'
  },
  {
    name: "Jocelino",
    email: "jocelino-uzumaki@gmail.com",
    role: "Developer",
    department: "Front End",
    addedAt: "01/01/2021",
    avatarUrl: 'assets/images/user6.jpg'
  }
]