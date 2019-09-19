import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { WorkZoneService } from './../../services/work-zone.service';

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
    const maxWidth = this.workZone.nativeElement.offsetWidth;
    const maxHeight = this.workZone.nativeElement.offsetHeight;
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
