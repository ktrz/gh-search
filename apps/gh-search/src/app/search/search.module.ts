import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, MatCardModule],
})
export class SearchModule {}
