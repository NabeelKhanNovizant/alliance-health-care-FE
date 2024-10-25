import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    SideNavComponent,
    
    
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
  ],
  exports: [SideNavComponent]

})
export class SharedModule { }
