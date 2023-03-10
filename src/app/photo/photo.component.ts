import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
})
export class PhotoComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private  activatedRoute:ActivatedRoute
  ) {}
  photos:Photo[]=[];
  uploader!:FileUploader;
  hasBaseDropZoneOver=false;
  baseUrl="https://localhost:7067/api/photos/AddPhotoForCity/";
  currentMain!:Photo;
  currentCity:any;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>this.currentCity=params["cityId"])
   this.initilazeUploader()
  }
  initilazeUploader(){
    this.uploader=new FileUploader({
      url:this.baseUrl+this.currentCity,
      authToken:"Bearer "+this.authService.token,
      isHTML5:true,
      allowedFileType:['image'],
      autoUpload:false,
      removeAfterUpload:true,
      maxFileSize:10*1024*1024
    })
    this.uploader.onSuccessItem=(item,response,status,headers)=>{
      if(response)
      {
        const res:Photo=JSON.parse(response);
        const photo={
          photoId:res.photoId,
          url:res.url,
          dateAdded:res.dateAdded,
          description:res.description,
          isMain:res.isMain,
          cityId:res.cityId
        }
        this.photos.push(photo);
      }
    }
  }
}
