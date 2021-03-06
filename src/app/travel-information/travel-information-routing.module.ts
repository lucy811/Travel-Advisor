import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TravelInformationCreateComponent } from './travel-information-create/travel-information-create.component';
import { TravelInformationCollectionComponent } from './travel-information-collection/travel-information-collection.component';
import { TravelInformationDetailComponent } from './travel-information-detail/travel-information-detail.component';
import { TravelInformationCommentComponent } from './travel-information-comment/travel-information-comment.component';
import { AuthGuard } from '../auth/auth.guard';

const travelRoutes: Routes = [
  { path: 'travel-info-collection', component: TravelInformationCollectionComponent, canActivate: [AuthGuard] },
  { path: 'travel-info-create', component: TravelInformationCreateComponent, canActivate: [AuthGuard] },
  { path: 'travel-info-edit/:id', component: TravelInformationCreateComponent, canActivate: [AuthGuard]},
  { path: 'travel-info-detail/:id', component: TravelInformationDetailComponent, canActivate: [AuthGuard]},
  { path: 'travel-info-comment/:id', component: TravelInformationCommentComponent, canActivate: [AuthGuard]},
  { path: 'travel-info-comment/:id/:editId', component: TravelInformationCommentComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(travelRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class TravelRoutingModule { }