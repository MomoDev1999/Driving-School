import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

export interface Content {
  id: number;
  title: string;
  paragraph: string;
  read?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private apiUrl = `${environment.apiUrl}/content`;

  constructor(private http: HttpClient) {}

  getAllContent(): Observable<Content[]> {
    return this.http.get<Content[]>(`${this.apiUrl}`);
  }

  markAsRead(contentId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${contentId}/read`, {}); // <-- nuevo endpoint correcto
  }
}
