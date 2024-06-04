import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { GameStateService } from '../../core/services/game-state.service'; // Import GameStateService
import { User } from '../../core/models/user.model'; // Ensure you have a User model
import { Subscription } from 'rxjs';
import { Upgrade } from '../../core/models/upgrade.model';

@Component({
  selector: 'app-click',
  templateUrl: './click.component.html',
  styleUrls: ['./click.component.scss']
})
export class ClickComponent implements OnInit, OnDestroy {
  user: User = {
    id: 0,
    totalScore: 0,
    upgrades: [],
    username: 'no user found',
    email: '',
    role: ''
  };
  localScore: number = 0;
  saveInterval: any;
  totalScoreSubscription: Subscription | undefined;
  username: string = 'no user found';
  mergedUpgrades: Upgrade[] = [];
  private upgradesSubscription: Subscription | undefined;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private gameStateService: GameStateService // Inject GameStateService
  ) {
    this.userService.getUserById(1).subscribe(user => {
      this.user = user;
      this.localScore = this.user.totalScore;
      this.username = this.user.username; // Initialize username
      this.gameStateService.setTotalScore(this.user.totalScore); // Initialize shared totalScore
      this.startAutoSave();
    });
  }

  ngOnInit() {
    this.totalScoreSubscription = this.gameStateService.totalScore$.subscribe(score => {
      this.localScore = score;
    });

    this.upgradesSubscription = this.gameStateService.getMergedUpgrades().subscribe(upgrades => {
      this.mergedUpgrades = upgrades;
    });
  }

  incrementScore() {
    const newScore = this.gameStateService.getTotalScore() + this.calculatePapersPerClick();
    this.gameStateService.setTotalScore(newScore);
  }

  startAutoSave() {
    this.saveInterval = setInterval(() => {
      this.saveScore();
    }, 30000); // Save every 30 seconds
  }

  saveScore() {
    const currentScore = this.gameStateService.getTotalScore();
    if (currentScore !== this.user.totalScore) {
      this.user.totalScore = currentScore;
      this.userService.updateUser(this.user).subscribe();
    }
  }

  ngOnDestroy() {
    clearInterval(this.saveInterval);
    this.saveScore();
    this.totalScoreSubscription?.unsubscribe();
  }

  navigateToPage(page: string) {
    this.router.navigate([`/${page}`]);
  }

  logout() {
    this.saveScore();
    this.authService.logout();
    this.navigateToPage('login-page');
  }

  calculatePapersPerClick(): number {
    if (!this.user || !this.mergedUpgrades) return 1; // Base score per click is 1 if user or upgrades are not defined
    let bonus = this.mergedUpgrades.reduce((sum: number, upgrade: Upgrade) => sum + upgrade.amount * this.extractBonus(upgrade.desc), 0);
    return 1 + bonus; // Base score per click is 1 plus the sum of all bonuses
  }

  private extractBonus(desc: string): number {
    let match = desc.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  shrinkImage() {
    const element = document.querySelector('.paperImage') as HTMLElement;
    if (element) {
      element.classList.add('shrink');
    }
  }

  resetImage() {
    const element = document.querySelector('.paperImage') as HTMLElement;
    if (element) {
      element.classList.remove('shrink');
    }
  }
}
