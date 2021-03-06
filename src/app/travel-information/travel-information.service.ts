import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { TravelInfo } from './travel-information.model';
import { Comment } from './comment.model';

const BACKEND_URL = environment.apiUrl + '/travel-info';

@Injectable({providedIn: 'root'})
export class TravelInfoService {
  private travelInfoCollection: TravelInfo[] = [];
  private travelInfoCollectionUpdated = new Subject<{travelInfoCollection: TravelInfo[]}>();

  constructor(private http: HttpClient, private router: Router) {}

  getTravelInfos() {  
    this.http
      .get<{travelInfoCollection: any }>(BACKEND_URL
      ).pipe(map((responseData)=> {
        return responseData.travelInfoCollection.map(travelInfo => {
          return {
            id: travelInfo._id,
            name: travelInfo.name,
            price: travelInfo.price,
            description: travelInfo.description,
            imagePath: travelInfo.imagePath,
            creator: travelInfo.creator
          }
        })
      }))
      .subscribe(transformedTravelInfos => {
        this.travelInfoCollection = transformedTravelInfos;
        this.travelInfoCollectionUpdated.next({
          travelInfoCollection: [... this.travelInfoCollection]
        });
      }
    );
  }

  getTravelInfo(id: string) {
    return this.http.get<{_id: string, name: string, price: string, imagePath: string, description: string, creator: string}>(BACKEND_URL + '/' + id);
  }

  getComment(id: string) {
    return this.http.get<{comment: Comment}>(BACKEND_URL + '/comment/' + id);
  }

  getPostUpdateListener() {
    return this.travelInfoCollectionUpdated.asObservable();
  }

  addTravelInfo(name: string, price: string, description: string, image: File, creator: string) {
    const travelInfoData = new FormData();
    travelInfoData.append('name', name);
    travelInfoData.append('price', price);
    travelInfoData.append('description', description);
    travelInfoData.append('image', image, name);
    travelInfoData.append('creator', creator)
    this.http
      .post<{message: string, travelInfo: TravelInfo}>(BACKEND_URL, travelInfoData)
      .subscribe((responseData) => {
        this.router.navigate(['/travel-info-collection']);
      });
  }

  updateTravelInfo(id: string, name: string, price: string, description: string, image: File | string, creator: string) {
    let travelInfoData: TravelInfo | FormData;
    if (typeof(image) === 'object') {
      travelInfoData = new FormData();
      travelInfoData.append('id', id);
      travelInfoData.append('name', name);
      travelInfoData.append('price', price);
      travelInfoData.append('description', description);
      travelInfoData.append('image', image, name);
      travelInfoData.append('creator', creator)
    } else {
      travelInfoData = {
        id: id,
        name: name,
        price: price,
        description: description,
        imagePath: image,
        creator: creator
      }
    }

    this.http.put(BACKEND_URL +'/' + id, travelInfoData).subscribe(response => {
      console.log(JSON.stringify(response));
    })
  }

  deleteTravelInfo(travelInfoId: string) {
    return this.http.delete(BACKEND_URL + '/' + travelInfoId);
  }

  deleteComment(commentId: string) {
    return this.http.delete(BACKEND_URL + '/comment/' + commentId);
  }

  addComment(comment: string, travelInfoId: string, creator: string, name: string) {
    const commentData = {'comment': comment, 'travelInfoId': travelInfoId, 'creator': creator, 'name': name}
    this.http
    .post<{message: string, comment: Comment}>(BACKEND_URL + '/comment', commentData)
    .subscribe((responseData) => {
      this.router.navigate(['/travel-info-detail', travelInfoId]);
    });
  }

  getComments(id: string) {
    return this.http.get<{comments: Comment[]}>(BACKEND_URL + '/' + id +'/comments');
  }

  updateComment(id: string, comment: string, travelInfoId: string, creator: string, name: string) {
    const commentData = {'id': id, 'comment': comment, 'travelInfoId': travelInfoId, 'creator': creator, 'name': name}
    this.http
    .put<{message: string, comment: Comment}>(BACKEND_URL + '/comment/' + id, commentData)
    .subscribe((responseData) => {
      this.router.navigate(['/travel-info-detail', travelInfoId]);
    });
  }
}