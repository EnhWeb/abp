import { ConfigState, CoreModule, noop } from '@abp/ng.core';
import { DatePipe } from '@angular/common';
import { APP_INITIALIZER, Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { NgbDateParserFormatter, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { Store } from '@ngxs/store';
import { INgxDatatableConfig, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ButtonComponent } from './components/button/button.component';
import { ChartComponent } from './components/chart/chart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { HttpErrorWrapperComponent } from './components/http-error-wrapper/http-error-wrapper.component';
import { LoaderBarComponent } from './components/loader-bar/loader-bar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ModalContainerComponent } from './components/modal/modal-container.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SortOrderIconComponent } from './components/sort-order-icon/sort-order-icon.component';
import { TableEmptyMessageComponent } from './components/table-empty-message/table-empty-message.component';
import { TableComponent } from './components/table/table.component';
import { ToastContainerComponent } from './components/toast-container/toast-container.component';
import { ToastComponent } from './components/toast/toast.component';
import { LoadingDirective } from './directives/loading.directive';
import { NgxDatatableDefaultDirective } from './directives/ngx-datatable-default.directive';
import { NgxDatatableListDirective } from './directives/ngx-datatable-list.directive';
import { TableSortDirective } from './directives/table-sort.directive';
import { ErrorHandler } from './handlers/error.handler';
import { initLazyStyleHandler } from './handlers/lazy-style.handler';
import { RootParams } from './models/common';
import { THEME_SHARED_APPEND_CONTENT } from './tokens/append-content.token';
import { httpErrorConfigFactory, HTTP_ERROR_CONFIG } from './tokens/http-error.token';
import { DateParserFormatter } from './utils/date-parser-formatter';

export function ngxDatatableMessageFactory(store: Store) {
  const emptyMessage = store.selectSnapshot(
    ConfigState.getLocalization('AbpUi::NoDataAvailableInDatatable'),
  );
  const totalMessage = store.selectSnapshot(ConfigState.getLocalization('AbpUi::Total'));
  const selectedMessage = store.selectSnapshot(ConfigState.getLocalization('AbpUi::Selected'));

  return {
    messages: {
      emptyMessage,
      totalMessage,
      selectedMessage,
    },
  } as INgxDatatableConfig;
}

@NgModule({
  imports: [CoreModule, NgxDatatableModule, NgxValidateCoreModule, NgbPaginationModule],
  declarations: [
    BreadcrumbComponent,
    ButtonComponent,
    ChartComponent,
    ConfirmationComponent,
    HttpErrorWrapperComponent,
    LoaderBarComponent,
    LoadingComponent,
    ModalComponent,
    ModalContainerComponent,
    PaginationComponent,
    TableComponent,
    TableEmptyMessageComponent,
    ToastComponent,
    ToastContainerComponent,
    SortOrderIconComponent,
    NgxDatatableDefaultDirective,
    NgxDatatableListDirective,
    LoadingDirective,
    TableSortDirective,
    ToastContainerComponent,
  ],
  exports: [
    NgxDatatableModule,
    BreadcrumbComponent,
    ButtonComponent,
    ChartComponent,
    ConfirmationComponent,
    LoaderBarComponent,
    LoadingComponent,
    ModalComponent,
    PaginationComponent,
    TableComponent,
    TableEmptyMessageComponent,
    ToastComponent,
    ToastContainerComponent,
    SortOrderIconComponent,
    NgxDatatableDefaultDirective,
    NgxDatatableListDirective,
    LoadingDirective,
    TableSortDirective,
    ToastContainerComponent,
  ],
  providers: [DatePipe],
  entryComponents: [
    HttpErrorWrapperComponent,
    LoadingComponent,
    ModalContainerComponent,
    ToastContainerComponent,
    ConfirmationComponent,
  ],
})
export class ThemeSharedModule {
  constructor(private errorHandler: ErrorHandler) {}

  static forRoot(options = {} as RootParams): ModuleWithProviders<ThemeSharedModule> {
    return {
      ngModule: ThemeSharedModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          multi: true,
          deps: [THEME_SHARED_APPEND_CONTENT],
          useFactory: noop,
        },
        {
          provide: APP_INITIALIZER,
          multi: true,
          deps: [Injector],
          useFactory: initLazyStyleHandler,
        },
        { provide: HTTP_ERROR_CONFIG, useValue: options.httpErrorConfig },
        {
          provide: 'HTTP_ERROR_CONFIG',
          useFactory: httpErrorConfigFactory,
          deps: [HTTP_ERROR_CONFIG],
        },
        { provide: NgbDateParserFormatter, useClass: DateParserFormatter },
        {
          provide: 'configuration',
          useFactory: ngxDatatableMessageFactory,
          deps: [Store],
        },
      ],
    };
  }
}
