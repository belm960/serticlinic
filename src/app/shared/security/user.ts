import { NgbPaginationNumber } from '@ng-bootstrap/ng-bootstrap';
import { Role } from './role';

export class User {
  id: number;
  username:string;
  email:string;
  password:string;
  role: [any];
  
}
