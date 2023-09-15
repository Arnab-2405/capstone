import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth' // Add smooth scrolling behavior
    });
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollButton = document.getElementById('scroll');
    if (scrollButton) {
      // Show the button when the user has scrolled down a certain amount
      scrollButton.style.display = window.scrollY > window.innerHeight ? 'block' : 'none';
    }
  }
}
