import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { ThrowStmt } from '@angular/compiler';
import { SqlStorage } from '../sql-storage/sql-storage';

const win: any = window;
@Injectable()
export class UserSettings {
  private sqlMode = false;

  constructor(private storage: Storage,
    private sql: SqlStorage,
    private events: Events) {
    if (win.sqlitePlugin) {
      this.sqlMode = true;
    } else {
      console.log('Sqlite plugin not installed, Falling back to regular Ionic Storage');
    }
  }

  favoriteTeam(team, tournamentId, tournamentName) {
    let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName };
    if (this.sqlMode) {
      this.sql.set(team.id.toString(), JSON.stringify(item));
    }
    else {
      this.storage.set(team.id.toString(), JSON.stringify(item));
    };
    // this.storage.set(team.id.toString(), JSON.stringify(item));
    this.events.publish('favorites:changed');
  }

  unfavoriteTeam(team) {
    // this.storage.remove(team.id.toString());
    if (this.sqlMode) {
      this.sql.remove(team.id.toString());
    }
    else {
      this.storage.remove(team.id.toString());
    };
    this.events.publish('favorites:changed');
  }

  isFavoriteTeam(teamId: string): Promise<boolean> {
    if (this.sqlMode) {
      this.sql.get(teamId.toString())
        .then(value => value ? true : false);
    }
    else {
      return new Promise(resolve => resolve(this.storage.get(teamId.toString())
        .then(value => value ? true : false)));
    };
    //return this.storage.get(teamId).then(value => value ? true : false);
  }

  getAllFavorites(): Promise<any> {
    if (this.sqlMode) {
      return this.sql.getAll();
    }
    else {
      return new Promise(resolve => {
        let results = [];
        this.storage.forEach(data => {
          console.log('inside foreach', data);
          results.push(JSON.parse(data));
        });
        return resolve(results);
      });
    };
  }

  initStorage(): Promise<any> {
    if (this.sqlMode) {
      return this.sql.initializeDatabase();
    }
    else {
      return new Promise(resolve => resolve());
    }
  }
}
