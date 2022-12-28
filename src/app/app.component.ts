import { AfterViewInit, Component } from '@angular/core';
import { LoaderService } from '@fuse/services/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'currency-exchanger';
  loading = false;

  constructor(private loaderService: LoaderService) { }

  ngAfterViewInit() {
    this.loaderService.httpProgress().subscribe((status: boolean) => {
      this.loading = status;
    });
  }
}
