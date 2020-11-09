import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [UserComponent],
  exports: [UserComponent],
  imports: [CommonModule, MatCardModule],
})
export class UserModule {}
