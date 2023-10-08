import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import IUser from '../models/User';
import { Observable, from, of, throwError } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private usersCollection!: AngularFirestoreCollection<IUser>;
  public isAuthenticated$!: Observable<boolean>;
  private redirect = false;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.usersCollection = this.db.collection('users');
    this.isAuthenticated$ = this.auth.user.pipe(map((u) => !!u));
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        switchMap((e) => this.route.firstChild?.data ?? of({ authOnly: false }))
      )
      .subscribe((data) => (this.redirect = data.authOnly));
  }

  private async createUser(user: IUser) {
    const { name, email, age, password, phone_number } = user;
    if (!email || !password) return;
    try {
      const userCred = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.usersCollection
        .doc(userCred.user?.uid)
        .set({ name, email, age, phone_number });

      await userCred.user?.updateProfile({ displayName: name });
    } catch (error) {
      throw new Error('Error in registering new user.');
    }
  }

  signup(user: IUser): Observable<any> {
    return from(this.createUser(user));
  }

  private async loginUser(cred: Partial<IUser>) {
    if (!cred.email || !cred.password) return;
    try {
      await this.auth.signInWithEmailAndPassword(cred.email, cred.password);
    } catch (error) {
      throw new Error('Error in loging new user.');
    }
  }

  login(cred: Partial<IUser>): Observable<any> {
    return from(this.loginUser(cred));
  }

  async logoutUser() {
    await this.auth.signOut();
    if (this.redirect) {
      this.router.navigateByUrl('/');
    }
  }

  logout(): Observable<any> {
    return from(this.logoutUser());
  }
}
