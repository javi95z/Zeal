import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Favorite } from "@models";
import { environment as env } from "@env/environment";
import { ReplaySubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FavoritesService {
  private favsSubject = new ReplaySubject<Favorite[]>(1);
  favs$: Observable<Favorite[]> = this.favsSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Get favorites user data
   */
  getFavorites() {
    this.http
      .post<Favorite[]>(`${env.urlApi}/favorites/index`, null)
      .toPromise()
      .then((res) => this.favsSubject.next(res));
  }

  // Send API request to add
  addFavorite(favorite: Favorite) {
    this.http
      .post(`${env.urlApi}/favorites`, favorite)
      .toPromise()
      .then(() => this.getFavorites());
  }

  // Send API request to remove
  removeFavorite(id: number) {
    this.http
      .delete(`${env.urlApi}/favorites/${id}`)
      .toPromise()
      .then(() => this.getFavorites());
  }
}
