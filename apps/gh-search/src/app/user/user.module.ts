import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { MatCardModule } from '@angular/material/card';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UserComponent, UsersComponent],
  exports: [UserComponent, UsersComponent],
  imports: [CommonModule, MatCardModule],
})
export class UserModule {}
