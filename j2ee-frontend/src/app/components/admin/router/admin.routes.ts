import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';  // Import LayoutComponent
import { CityManagementComponent } from '../city/city-management.component';  // Import CityManagementComponent

export const adminRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
    //   {
    //     path: 'tour-manager',
    //     children: [
    //       { path: 'tour', component: TourComponent },
    //       { path: 'tour-schedule', component: TourScheduleComponent },
    //       { path: 'tour-statistics', component: TourStatisticsComponent }
    //     ]
    //   },
      {
        path: 'system',
        children: [
          { path: 'city', component: CityManagementComponent }  // Thêm route cho CityManagementComponent
        ]
      },
      // Các route khác
    ]
  }
];
