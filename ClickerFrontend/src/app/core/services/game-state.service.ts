import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Upgrade, UpgradeSaved } from '../models/upgrade.model';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private totalScoreSubject = new BehaviorSubject<number>(0);
  totalScore$ = this.totalScoreSubject.asObservable();


  setTotalScore(score: number) {
    this.totalScoreSubject.next(score);
  }

  getTotalScore(): number {
    return this.totalScoreSubject.value;
  }

  private mergedUpgradesSubject = new BehaviorSubject<Upgrade[]>([]);
  mergedUpgrades$ = this.mergedUpgradesSubject.asObservable();

  setMergedUpgrades(upgrades: Upgrade[]) {
    this.mergedUpgradesSubject.next(upgrades);
  }

  getMergedUpgrades(): Observable<Upgrade[]> {
    return this.mergedUpgrades$;
  }

}
