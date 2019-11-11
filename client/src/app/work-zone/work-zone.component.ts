import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';

@Component({
  selector: 'app-work-zone',
  templateUrl: './work-zone.component.html',
  styleUrls: ['./work-zone.component.scss'],
})
export class WorkZoneComponent implements OnInit {

  @ViewChild('workZone', { static: true }) workZone: ElementRef;

  constructor(private workZoneService: WorkZoneService) { }

  // Update dimension values from ElementRef workZone in workZoneService
  updateMaxDimensions() {
    const WIDTH_OFFSET = 60;
    const HEIGHT_OFFSET = 5;
    const maxWidth = this.workZone.nativeElement.offsetWidth - WIDTH_OFFSET;
    const maxHeight = this.workZone.nativeElement.offsetHeight - HEIGHT_OFFSET;
    this.workZoneService.updateMaxDimensions(maxWidth, maxHeight);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateMaxDimensions();
  }

  ngOnInit() {
    this.updateMaxDimensions();
  }

}
