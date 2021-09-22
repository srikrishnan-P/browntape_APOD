import { JsonPipe } from '@angular/common';
import { jsDocComment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ApocService } from 'src/app/service/apoc.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  limit: number = 10;
  apodData: any;
  startDate: any;
  endDate: any;
  throttle = 50;
  scrollDistance = 2;
  fullStartDate: any;
  fullEndDate: any;
  loading: boolean = false;
  error: boolean = false;
  favoriteList: any = [];


  constructor(private apocService: ApocService) { }

  ngOnInit(): void {
    this.fullStartDate = new Date()
    this.endDate = this.fullStartDate.toISOString().slice(0, 10);

    this.fullEndDate = new Date();
    this.fullEndDate.setDate(this.fullEndDate.getDate() - 10);
    this.startDate = this.fullEndDate.toISOString().substr(0, 10);
    this.getApoc();
  }


  getApoc() {
    this.loading = true;
    this.apocService.getApod(this.startDate, this.endDate, this.limit).subscribe(resp => {
      this.apodData = resp.reverse();
      this.apodData.reverse().forEach((item: any) => {
        item.isFavorite = false;
      });
      this.loading = false;
    },
      error => {
        this.error = true;
        this.loading = false;
      })
  }

  onScrollDown() {
    this.fullEndDate.setDate(this.fullEndDate.getDate() - 1);
    this.endDate = this.fullEndDate.toISOString().substr(0, 10);

    this.fullStartDate = this.fullEndDate.setDate(this.fullEndDate.getDate() - 10);
    this.startDate = this.fullEndDate.toISOString().substr(0, 10)

    this.apocService.getApod(this.startDate, this.endDate, this.limit).subscribe(resp => {

      resp.reverse().forEach((item: any) => {
        item.isFavorite = false;
        this.apodData.push(item);
      });
    },
      error => {
        this.error = true;
      })
  }


  addToFavorite(data: any) {
    if (!data.isFavorite) {
      this.apodData.forEach((item: any) => {
        if (item.title == data.title) {
          item.isFavorite = true;
        }
      });
      this.apocService.addFavorites(data);
    }
  }

  favIcon(data: any) {
    if (data.isFavorite) {
      return 'bi bi-heart-fill';
    } else {
      return 'bi bi-heart';
    }
  }
}
