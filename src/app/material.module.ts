import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule, 
  MatTableModule, 
  MatPaginatorModule, 
  MatSortModule,
  
} from '@angular/material';
  
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule,
    MatAutocompleteModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule,
    MatAutocompleteModule
  ]
})
export class MaterialModule {}