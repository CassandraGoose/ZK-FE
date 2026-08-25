import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Note {
  id: string;
  name: string;
  content: string;
  created: string | null;
  edited: string | null;
  sources: Source[];
}

export interface Source {
  id: string;
  title: string;
  artifact: string;
  created: string | null;
  edited: string | null;
  notes: Note[];
}

// todo get from env
const API = 'http://localhost:9999';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${API}/notes`);
  }

  getSources(): Observable<Source[]> {
    return this.http.get<Source[]>(`${API}/sources`);
  }
}
