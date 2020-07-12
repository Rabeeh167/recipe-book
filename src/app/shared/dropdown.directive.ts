import {Directive, ElementRef, OnInit, HostListener, HostBinding} from '@angular/core'

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective implements OnInit{
    constructor(private el:ElementRef){}
    ngOnInit(){
    }
    @HostBinding('class.open') isOpen : boolean =false; 
    @HostListener('click') buttonClicked(event){
        this.isOpen = !this.isOpen;
        // if(this.isOpen)
        // this.el.nativeElement.style.addClass('open')
        // else
        // this.el.nativeElement.style.removeClass('open')
    }
}