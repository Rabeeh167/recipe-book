import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { ShortenPipe } from './shorten.pipe';
import { SpinnerComponent } from './spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';
import { CommonModule } from '@angular/common';

@NgModule({

    declarations:[
        DropdownDirective,
        ShortenPipe,
        SpinnerComponent,
        AlertComponent
    ],
    imports:[
        CommonModule
    ],
    exports:[
        DropdownDirective,
        ShortenPipe,
        SpinnerComponent,
        AlertComponent,
        CommonModule
    ]
})
export class SharedModule{

}