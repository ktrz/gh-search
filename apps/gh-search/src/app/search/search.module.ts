import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { GhDataAccessModule } from '@gh-search/gh/data-access';
import { UserModule } from '../user/user.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    GhDataAccessModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    UserModule,
    MatPaginatorModule
  ]
})
export class SearchModule {}
