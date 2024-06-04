import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { Subscription } from 'rxjs';
import { Upgrade } from '../../core/models/upgrade.model';
import { GameStateService } from '../../core/services/game-state.service'; // Import GameStateService

@Component({
  selector: 'app-upgrades',
  templateUrl: './upgrades.component.html',
  styleUrls: ['./upgrades.component.scss']
})
export class UpgradesComponent implements OnInit, OnDestroy {
  private allUpgrades: Upgrade[] = [
    new Upgrade(1, 'assets/upgrade.png', 'Upgrade 1', 'Increases score per click by 1', 0, 10),
    new Upgrade(2, 'assets/upgrade2.png', 'Upgrade 2', 'Increases score per click by 2', 0, 20)
    // Add more predefined upgrades here
  ];
  user: User = {
    id: 0,
    totalScore: 0,
    upgrades: [],
    username: '',
    email: '',
    role: ''
  };
  mergedUpgrades: Upgrade[] = [];
  private userSubscription: Subscription | undefined;

  activeUpgradeId: number | null = null;  // Track the currently active (clicked) upgrade
  cannotAffordId: number | null = null;   // Track if an upgrade cannot be afforded

  constructor(private userService: UserService, private gameStateService: GameStateService) {
    this.fetchUser();
  }

  ngOnInit() {
    this.fetchUser();
  }

  fetchUser() {
    this.userSubscription = this.userService.getUserById(1).subscribe({
      next: (userData) => {
        this.user = userData;
        this.gameStateService.setTotalScore(this.user.totalScore);
        this.mergeUpgrades();
      },
      error: (err) => {
        console.error('Failed to fetch user', err);
      }
    });
  }

  mergeUpgrades() {
    this.mergedUpgrades = this.user.upgrades.map(savedUpgrade => {
      const fullUpgrade = this.allUpgrades.find(upgrade => upgrade.id === savedUpgrade.id);
      if (fullUpgrade) {
        return new Upgrade(
          fullUpgrade.id,
          fullUpgrade.img,
          fullUpgrade.name,
          fullUpgrade.desc,
          savedUpgrade.amount,
          fullUpgrade.cost
        );
      }
      return null;
    }).filter(upgrade => upgrade !== null) as Upgrade[];

    this.gameStateService.setMergedUpgrades(this.mergedUpgrades); // Update the shared service
  }
  purchaseUpgrade(upgradeId: number) {
    if (this.user) {
      let upgrade = this.mergedUpgrades.find(u => u.id === upgradeId);
      const currentScore = this.gameStateService.getTotalScore();
      if (upgrade && currentScore >= upgrade.cost) {
        this.gameStateService.setTotalScore(currentScore - upgrade.cost);
        upgrade.amount += 1;
        const upgradeSaved = this.user.upgrades.find(u => u.id === upgradeId);
        if (upgradeSaved) {
          upgradeSaved.amount = upgrade.amount;
        }
        this.user.totalScore = this.gameStateService.getTotalScore();
        this.userService.updateUser(this.user).subscribe({
          next: () => {
            this.activeUpgradeId = upgradeId;
            setTimeout(() => this.activeUpgradeId = null, 200);
          },
          error: (err) => {
            console.error('Failed to update user', err);
          }
        });
      } else {
        this.cannotAffordId = upgradeId;
        setTimeout(() => this.cannotAffordId = null, 200);
      }
    }
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }
}
