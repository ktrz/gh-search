import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphQLModule } from './graphql/graphql.module';

@NgModule({
  imports: [CommonModule, GraphQLModule],
})
export class GhDataAccessModule {}
