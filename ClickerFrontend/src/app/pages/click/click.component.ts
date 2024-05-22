import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-click',
  templateUrl: './click.component.html',
  styleUrls: ['./click.component.scss']
})
export class ClickComponent {
  get user() {
    return this.userService.getUser();
  }

  constructor(private userService: UserService, private router: Router) {}

  // This method now includes incrementing the score and shrinking the image
  incrementScore() {
    let bonus = this.calculatePapersPerClick();
    this.user.totalScore += bonus;
    this.userService.updateUser(this.user);

    // Shrinking the image when the score is incremented
    this.shrinkImage();
    setTimeout(() => this.resetImage(), 200); // Reset the image size after a short delay
  }

  calculatePapersPerClick(): number {
    let bonus = this.user.upgrades.reduce((sum, upgrade) => sum + upgrade.amount * this.extractBonus(upgrade.desc), 0);
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

  navigateToPage(page: string) {
    this.router.navigate(['/' + page]);
  }

  logout() {
    //handle logout here
    this.navigateToPage('login-page')
  }

}
