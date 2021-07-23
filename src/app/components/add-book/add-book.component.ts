import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookService } from 'src/app/services/book/book.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  @ViewChild('image') imageInputVariable: ElementRef;
  submitValue: string = 'Add';

  title: string;
  author: string;
  price: string;
  description: string;
  url: string;
  filesize: string;
  currentUser: User;

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser = this.authService.user;
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.title) {
      alert('Please enter a title');
      return;
    } else if (!this.author) {
      alert('Please enter an author');
      return;
    } else if (!this.price) {
      alert('Please enter an price');
      return;
    }
    if (this.submitValue == 'Add') {
      this.submitValue = 'Confirm';
      return;
    }
    const newBook = {
      title: this.title,
      author: this.author,
      price: this.price,
      description: 'No Description',
      img: null,
      created: new Date().toString(),
    };
    if (this.description) {
      newBook.description = this.description;
    }
    if (this.url) {
      newBook.img = this.url;
    }
    this.bookService.addBook(newBook).subscribe(() => {
      console.log('test')
      this.router.navigate(['/books'], { replaceUrl: true });
    });
  }

  onSelectFile(event) {
    const file = event.target.files && event.target.files[0];
    if (file && file.type.split('/')[0] == 'image') {
      if (file.size / 1024 / 1024 > 2) {
        this.filesize = 'File size too large';
        event.target.value = '';
      } else {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          this.url = event.target.result as string;
          if (file.size / 1024 / 1024 > 1)
            this.filesize =
              (file.size / 1024 / 1024).toPrecision(3).toString() + 'MB';
          else {
            this.filesize = (file.size / 1024).toPrecision(3).toString() + 'KB';
          }
        };
      }
    } else {
      this.filesize = 'Invalid file type';
      event.target.value = '';
    }
  }
}
