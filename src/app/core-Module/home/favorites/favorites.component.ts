import { Component, OnInit } from '@angular/core';
import { ApocService } from 'src/app/service/apoc.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  loading: boolean = false;
  error: boolean = false;
  favoriteList: any = [];

  constructor(private apocService: ApocService) { }

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites() {
    this.favoriteList = this.apocService.getFavorites()
  }


  removefavorites(data: any) {
    this.favoriteList = this.favoriteList.filter((item: any) => item.name === data.name);
    localStorage.setItem("favorites", this.favoriteList)

  }
}
