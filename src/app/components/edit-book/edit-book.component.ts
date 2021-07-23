import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookService } from 'src/app/services/book/book.service';
import { User } from 'src/app/User';
import { Book } from '../../Book';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  faEdit = faEdit;
  book: Book;
  url: string;
  filesize: string;
  currentUser: User;
  imageDisabled: boolean = true;
  submitValue: string = 'Update';
  loading: boolean = true;

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentUser = this.authService.user;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookService.getBook(params['id']).subscribe((book) => {
        this.book = book;
        this.url = book.img;
        this.loading = false;
      });
    });
  }

  imageToggle(imageInput) {
    this.imageDisabled = !this.imageDisabled;
    imageInput.disabled = !imageInput.disabled;
  }

  onSubmit() {
    if (!this.book.title) {
      alert('Please enter a title');
      return;
    } else if (!this.book.author) {
      alert('Please enter an author');
      return;
    } else if (!this.book.price) {
      alert('Please enter an price');
      return;
    }
    if (this.submitValue == 'Update') {
      this.submitValue = 'Confirm';
      return;
    }
    this.bookService.editBook(this.book).subscribe(() => {
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
          this.book.img = event.target.result as string;
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
