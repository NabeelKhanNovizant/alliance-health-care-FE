import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationStateService {
  private navigationData: any;

  setNavigationData(data: any) {
    this.navigationData = data;
  }

  getNavigationData() {
    return this.navigationData;
  }

  clearNavigationData() {
    this.navigationData = null;
  }
}
