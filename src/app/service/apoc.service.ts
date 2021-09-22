import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from 'src/environments/configpath';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApocService {
  favoriteList: any = [];
  constructor(private http: HttpClient) { }

  getApod(startDate: any, endDate: any, limit: any) {
    let url = urls.apoc + `?api_key=osPaaYatpo38b91izWbgmtP150NjsdmjBsUD9HYC&start_date=${startDate}&end_date=${endDate}`;
    return this.http.get<any>(url)
      .pipe(map((data: any) => {
        return data;
      }));
  }

  addFavorites(data: any) {
    this.favoriteList.push(data);
  }


  getFavorites() {
    return this.favoriteList;
  }


}
