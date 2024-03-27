import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_models/member';
<<<<<<< HEAD
=======
//import { GalleryModule } from 'ng-gallery';
>>>>>>> ff13ddfc743b9c657a137e716d8dff0724be10d7
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-detail',
<<<<<<< HEAD
  standalone: true,
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  imports: [CommonModule, TabsModule]
})
export class MemberDetailComponent implements OnInit{
  member: Member | undefined;
=======
  //standalone: true,
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  //imports: [CommonModule, TabsModule, GalleryModule]
})
export class MemberDetailComponent implements OnInit{
  member: Member | undefined;
  //images: GalleryItem[] = [];

  constructor(private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    var username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member
        //this.getImages()
      }
    })
  }

  // getImages() {
  //   if(!this.member) return;
  //   for (const photo of this.member?.photos){
  //     this.getImages.push(new ImageItem({src: photo.url, thumb: photo.url}))
  //   }
  // }
>>>>>>> ff13ddfc743b9c657a137e716d8dff0724be10d7

  constructor(private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    var username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.memberService.getMember(username).subscribe({
      next: member => this.member = member
    })
  }
}
