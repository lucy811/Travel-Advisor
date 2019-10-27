import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelInformationCollectionComponent } from './travel-information-collection/travel-information-collection.component';
import { TravelInformationCreateComponent } from './travel-information-create/travel-information-create.component';
import { FormsModule } from '@angular/forms';
import { TravelRoutingModule } from './travel-infromation-routing.module';

@NgModule({
  declarations: [
    TravelInformationCollectionComponent,
    TravelInformationCreateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TravelRoutingModule
  ]
})

export class TravelInformationModule { }