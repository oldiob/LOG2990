import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { WorkZoneService } from './../../services/work-zone.service';

@Component({
  selector: 'app-work-zone',
  templateUrl: './work-zone.component.html',
  styleUrls: ['./work-zone.component.scss'],
})
export class WorkZoneComponent implements OnInit, AfterViewInit {

  @ViewChild('workZone', { static: true }) workZone: ElementRef;

  @Input() keyEvent: KeyboardEvent;
  @Input() key: string;

  width: number;
  height: number;
  backgroundColor: number;
  height: number;
  widget: number;
  backgroundColor: number;

  maxWidth: number;
  maxHeight: number;

  constructor(private workZoneService: WorkZoneService) { }

  // Assigning size values from 'work-zone' referenced element
  updateMaxSize() {
    this.maxWidth = this.workZone.nativeElement.offsetWidth;
    this.maxHeight = this.workZone.nativeElement.offsetHeight;
    this.workZoneService.updateInitialDimensions(this.maxWidth, this.maxHeight);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    // Update  work-area size values when resizing window
    this.updateMaxSize();
  }

  ngOnInit() {
    this.updateMaxSize();

    // Subscribes to WorkZoneService observables
    this.workZoneService.currentHeight
      .subscribe((width) => this.width = width);
    this.workZoneService.currentHeight
      .subscribe((height) => this.height = height);
    this.workZoneService.currentHeight
      .subscribe((backgroundColor) => this.backgroundColor = backgroundColor);
  }

  ngAfterViewInit(): void { }

}
