import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
<<<<<<< HEAD
  members: Member[] = [];
=======
  members: Member[] =[];
>>>>>>> ff13ddfc743b9c657a137e716d8dff0724be10d7

  constructor(private http: HttpClient) { }

  getMembers() {
    if(this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map(members => {
        this.members = members;
<<<<<<< HEAD
        return members
=======
        return members;
>>>>>>> ff13ddfc743b9c657a137e716d8dff0724be10d7
      })
    )
  }

  getMember(username: string) {
    const member = this.members.find(x => x.userName === username);
<<<<<<< HEAD
    if (member) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member){
=======
    if(member) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
>>>>>>> ff13ddfc743b9c657a137e716d8dff0724be10d7
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members[index], ...member}
      })
    )
  }
}
