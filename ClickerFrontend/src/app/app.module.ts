import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClickComponent } from './pages/click/click.component';
import { UpgradesComponent } from './pages/upgrades/upgrades.component';

@NgModule({
  declarations: [
    AppComponent,
    ClickComponent,
    UpgradesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
