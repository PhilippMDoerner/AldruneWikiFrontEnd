import { Injectable } from '@angular/core';
import { SearchPreferences } from 'src/app/models/search-preferences';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor() { }
  searchPreferenceKey: string = "AldruneSearchPreferences";

  getStoredSearchPreferences(): SearchPreferences{
    return this.getStoredPreferences(this.searchPreferenceKey);
  }

  storeSearchPreferences(preferences: any): void{
    this.storePreferences(preferences, this.searchPreferenceKey);
  }


  private getStoredPreferences(key: string): SearchPreferences{
    const preferencesJson: string = localStorage.getItem(key);
    return JSON.parse(preferencesJson);
  }

  
  private storePreferences(preferences: SearchPreferences, key: string): void{
    const preferencesJson: string = JSON.stringify(preferences);
    localStorage.setItem(key, preferencesJson)
  }
}
