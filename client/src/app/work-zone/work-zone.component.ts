import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';

@Component({
  selector: 'app-work-zone',
  templateUrl: './work-zone.component.html',
  styleUrls: ['./work-zone.component.scss'],
})
export class WorkZoneComponent implements OnInit {

  @ViewChild('workZone', { static: true }) workZone: ElementRef;

  @Input() keyEvent: KeyboardEvent;
  @Input() key: string;

  constructor(private workZoneService: WorkZoneService) { }

  // Update dimension values from ElementRef workZone in workZoneService
  updateMaxDimensions() {
    const LEFT_PADDING = 80;
    const TOP_PADDING = 5;
    const maxWidth = this.workZone.nativeElement.offsetWidth - LEFT_PADDING;
    const maxHeight = this.workZone.nativeElement.offsetHeight - TOP_PADDING;
    this.workZoneService.updateInitialDimensions(maxWidth, maxHeight);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateMaxDimensions();
  }

  ngOnInit() {
    this.updateMaxDimensions();
  }

}
