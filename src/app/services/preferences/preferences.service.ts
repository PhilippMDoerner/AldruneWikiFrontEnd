import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor() { }
  searchPreferenceKey: string = "AldruneSearchPreferences";

  getStoredSearchPreferences(): string{
    return this.getStoredPreferences(this.searchPreferenceKey);
  }

  storeSearchPreferences(preferences: any): void{
    this.storePreferences(preferences, this.searchPreferenceKey);
  }


  private getStoredPreferences(key: string): string{
    const preferencesJson: string = localStorage.getItem(key);
    return JSON.parse(preferencesJson);
  }

  
  private storePreferences(preferences: any, key: string): void{
    const preferencesJson: string = JSON.stringify(preferences);
    localStorage.setItem(key, preferencesJson)
  }
}
