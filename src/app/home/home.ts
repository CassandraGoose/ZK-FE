import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ApiService, Note, Source } from '../api.service';
import { LoadingSpinner } from '../components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-home',
  imports: [NavigationBar, LoadingSpinner],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  protected readonly activeTab = signal<'notes' | 'sources'>('notes');

  protected readonly notes = signal<Note[] | null>(null);
  protected readonly sources = signal<Source[] | null>(null);

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(ApiService);

  constructor() {
    effect(() => {
      const tab = this.activeTab();
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { tab },
        queryParamsHandling: 'merge',
      });

      if (tab === 'notes' && this.notes() === null) {
        this.api.getNotes().subscribe((data) => this.notes.set(data));
      }

      if (tab === 'sources' && this.sources() === null) {
        this.api.getSources().subscribe((data) => this.sources.set(data));
      }
    });
  }

  ngOnInit(): void {
    const tab = this.route.snapshot.queryParamMap.get('tab');
    if (tab === 'notes' || tab === 'sources') {
      this.activeTab.set(tab);
    }
  }
}
