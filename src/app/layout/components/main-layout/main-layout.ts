import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { Spinner } from '../../../shared/components/spinner/spinner';

@Component({
  selector: 'app-main-layout',
  imports: [Header, Sidebar, RouterOutlet, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
