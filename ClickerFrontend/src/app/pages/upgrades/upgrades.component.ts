import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-upgrades',
  templateUrl: './upgrades.component.html',
  styleUrls: ['./upgrades.component.scss']
})
export class UpgradesComponent {
  get user() {
    return this.userService.getUser();
  }
  activeUpgradeId: number | null = null;  // Track the currently active (clicked) upgrade
  cannotAffordId: number | null = null;   // Track if an upgrade cannot be afforded

  constructor(private userService: UserService) {}

  purchaseUpgrade(upgradeId: number) {
    let upgrade = this.user.upgrades.find(u => u.id === upgradeId);
    if (upgrade && this.user.totalScore >= upgrade.cost) {
      this.user.totalScore -= upgrade.cost;
      upgrade.amount += 1;
      upgrade.cost *= 2;  // Double the cost for the next purchase
      this.userService.updateUser(this.user);

      // Visual feedback for clicking
      this.activeUpgradeId = upgradeId;
      setTimeout(() => this.activeUpgradeId = null, 200);  // Reset after a short delay
    } else {
      // Indicate inability to purchase
      this.cannotAffordId = upgradeId;
      setTimeout(() => this.cannotAffordId = null, 200);  // Reset after a short delay
    }
  }
}
