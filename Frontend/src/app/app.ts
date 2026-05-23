import { Component, signal } from '@angular/core';
import { Navbar } from '../components/navbar/navbar';
import { Main } from '../components/main/main';
import { Footer } from '../components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Navbar,Main, Footer],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('TPOviedo');
}
