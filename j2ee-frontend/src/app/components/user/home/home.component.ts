import { AfterViewInit, Component, OnInit, Type, Inject } from '@angular/core';
import { Router } from '@angular/router';
// import { LocationDetailComponent } from '../location-detail/location-detail.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
// import { LocationListComponent } from '../location-list/location-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { AuthInterceptor } from '../../../services/auth.interceptor';
// import { UserService } from '../../../services/user/user.service';
// import { Title } from '@angular/platform-browser';
// import { HomeService } from '../../../services/home/home.service';
// import { GetPageResponse } from '../../../models/response/home/get-page-response';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModule,
    CommonModule,
    // LocationListComponent,
    // LocationDetailComponent,
    HttpClientModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  tabs: Array<{ label: string; icon: string; component: Type<any> }> = [];
  selectedTab: { label: string; icon: string; component: Type<any> } | null =
    null;
  locations: string[] = ['Đà Nẵng', 'Hội An', 'Bà Nà', 'Sân Bay', 'Nam Hội An'];
  selectedLocation: string | null = null;
  isDropdownVisible: { [key: string]: boolean } = {};
  // homeData: GetPageResponse = new GetPageResponse();
  // detailData: GetPageResponse[] = [];
  // footerData: GetPageResponse = new GetPageResponse();
  images: any = [];
  tourismlink = '';

  constructor(
    private router: Router,
    // private title: Title,
    // private homeService: HomeService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    // this.title.setTitle('Trang chủ');
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initIntersectionObserver();
    }
  }

  ngOnInit(): void {
    this.tabs = [
      // {
      //   label: 'Thuê Xe',
      //   icon: 'fa-solid fa-car',
      //   component: LocationListComponent,
      // },
      // {
      //   label: 'Thuê Khách Sạn',
      //   icon: 'fa-solid fa-hotel',
      //   component: LocationListComponent,
      // },
      // {
      //   label: 'Đặt Vé',
      //   icon: 'fa-solid fa-ticket',
      //   component: LocationDetailComponent,
      // },
    ];
    this.selectedTab =
      this.tabs.find((tab) => tab.label === 'Đặt Vé') || this.tabs[0];

    // Tạm ẩn các phần gọi API
    // this.fetchHomeData();
    // this.fetchDetailData();
    // this.fetchFooterData();
  }

  selectTab(tab: { label: string; icon: string; component: Type<any> }): void {
    this.selectedTab = tab;
    if (this.isDropdownVisible[tab.label]) {
      this.isDropdownVisible[tab.label] = !this.isDropdownVisible[tab.label];
    } else {
      this.isDropdownVisible = { [tab.label]: true };
    }
  }

  selectLocation(location: string): void {
    this.selectedLocation = location;
    if (this.selectedTab) {
      const tabLabel = this.selectedTab.label;
      let path = '';
      if (tabLabel === 'Thuê Xe') {
        path = 'location-list';
      } else if (tabLabel === 'Thuê Khách Sạn') {
        path = 'hotel-list';
      } else if (tabLabel === 'Đặt Vé') {
        path = 'ticket-list';
      }
      this.router.navigate([path, encodeURIComponent(this.selectedLocation)]);
    }
  }

  navigateTo(url: string): void {
    this.router.navigate([`/${url}`, 'Đà Nẵng']);
  }

  initIntersectionObserver(): void {
    const options = {
      root: null as Element | null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, options);

    this.document
      .querySelectorAll(
        '.fadeInRight, .fadeInLeft, .fadeInUp,.slideInFromRight,.fadeInWrapper'
      )
      .forEach((item) => {
        observer.observe(item);
      });
  }

  fetchHomeData(): void {
    // Tạm ẩn phần gọi API
    /*
    this.homeService.getHome().subscribe({
      next: (data: GetPageResponse) => {
        this.homeData = data;
      },
      error: (error) => {
        console.error('Error fetching home data:', error);
      },
    });
    */
  }

  fetchDetailData(): void {
    // Tạm ẩn phần gọi API
    /*
    this.homeService.getDetail().subscribe({
      next: (data) => {
        this.detailData = data;
        this.detailData.forEach((item) => {
          if (item.url) {
            this.images = this.images.concat(item.url);
          }
        });
      },
      error: (error) => {
        console.error('Error fetching detail data:', error);
      },
    });
    */
  }

  fetchFooterData(): void {
    // Tạm ẩn phần gọi API
    /*
    this.homeService.getFooter().subscribe({
      next: (data: GetPageResponse) => {
        this.footerData = data;
      },
      error: (error) => {
        console.error('Error fetching footer data:', error);
      },
    });
    */
  }
}
