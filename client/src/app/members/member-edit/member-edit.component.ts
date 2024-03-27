import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit{
<<<<<<< HEAD
  @ViewChild('editForm') editForm:  NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if(this.editForm?.dirty) {
=======
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload',['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
>>>>>>> ff13ddfc743b9c657a137e716d8dff0724be10d7
      $event.returnValue = true;
    }
  }
  member: Member | undefined;
  user: User | null = null;
<<<<<<< HEAD
  
  constructor(private accountService: AccountService, private memberService: MembersService, 
    private toastr: ToastrService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user =user
=======

  constructor(private accountService: AccountService, private memberService: MembersService, 
    private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
>>>>>>> ff13ddfc743b9c657a137e716d8dff0724be10d7
    })
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if(!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: member => this.member = member
    })
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
<<<<<<< HEAD
      next: _ => {
=======
      next: _=> {
>>>>>>> ff13ddfc743b9c657a137e716d8dff0724be10d7
        this.toastr.success('Profile updated successfully');
        this.editForm?.reset(this.member);
      }
    })
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> ff13ddfc743b9c657a137e716d8dff0724be10d7
