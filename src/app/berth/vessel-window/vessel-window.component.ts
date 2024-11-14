import { Component, OnInit } from '@angular/core';
import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, BarController } from 'chart.js';

interface Vessel {
  name: string;
  width: number;
  arrivalTime: string;  // in "HH:mm" format
  departureTime: string;  // in "HH:mm" format
  day: string;
}

interface Schedule {
  day: string;
  vessels: Vessel[];
}

@Component({
  selector: 'app-vessel-window',
  standalone: true,
  templateUrl: './vessel-window.component.html',
  styleUrls: ['./vessel-window.component.scss']
})
export class VesselWindowComponent implements OnInit {
  chart: any;
  berthWidth: number = 650;  // Berth width (fixed)
  vessels: Vessel[] = [];
  availableDays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  vesselSchedule: Schedule[] = [];  // Store Schedule with 'Schedule' type

  constructor() {
    // Register necessary Chart.js components
    Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, BarController);
  }

  ngOnInit(): void {
    this.addVessel('Vessel A', 250, '14:00', '16:00', 'Monday');
    this.addVessel('Vessel B', 300, '12:00', '14:00', 'Tuesday');
    this.addVessel('Vessel C', 400, '09:00', '11:00', 'Monday');
    this.addVessel('Vessel D', 200, '16:00', '18:00', 'Wednesday');

    this.createGraph();
  }

  addVessel(name: string, width: number, arrivalTime: string, departureTime: string, day: string): void {
    const vessel: Vessel = { name, width, arrivalTime, departureTime, day };
    
    // Add to vessels list
    this.vessels.push(vessel);

    // Add to the schedule for the specific day
    const daySchedule = this.vesselSchedule.find(schedule => schedule.day === day);
    if (daySchedule) {
      daySchedule.vessels.push(vessel);
    } else {
      this.vesselSchedule.push({ day, vessels: [vessel] });
    }

    // Check if the ship can fit in the berth on the specific day
    this.checkAvailability(vessel);
  }

  checkAvailability(vessel: Vessel): void {
    const daySchedule = this.vesselSchedule.find(schedule => schedule.day === vessel.day);
    if (daySchedule) {
      let totalWidth = 0;
  
      // Sum the widths of all vessels scheduled on the same day
      daySchedule.vessels.forEach((ship: Vessel) => {  // Added 'Vessel' type here
        totalWidth += ship.width;
      });
  
      // Check if the new vessel fits
      if (totalWidth + vessel.width <= this.berthWidth) {
        console.log(`${vessel.name} can be accommodated on ${vessel.day} from ${vessel.arrivalTime} to ${vessel.departureTime}`);
      } else {
        console.log(`${vessel.name} cannot be accommodated on ${vessel.day}, it will be moved to another day.`);
        // Implement logic to suggest a new day/time based on availability
      }
    }
  }

  createGraph(): void {
    const labels = this.availableDays;
    const datasets = this.vesselSchedule.map(schedule => {
      return {
        label: schedule.day,
        data: this.createDayData(schedule),
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1
      };
    });

    const canvas = document.getElementById('vesselGraph') as HTMLCanvasElement;
    if (canvas) {
      this.chart = new Chart(canvas, {
        type: 'bar',  // Bar chart
        data: {
          labels: labels,  // Weekdays as labels on the Y-axis
          datasets: datasets
        },
        options: {
          indexAxis: 'y',  // Make the chart horizontal
          scales: {
            x: {
              beginAtZero: true,
              max: this.berthWidth  // Limit the X-axis to berth width
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Failed to acquire context for the chart canvas.');
    }
  }

  createDayData(schedule: Schedule): number[] {
    return this.availableDays.map(day => {
      const vesselsForDay = schedule.vessels.filter(vessel => vessel.day === day);
      return vesselsForDay.reduce((total: number, vessel: Vessel) => total + vessel.width, 0);
    });
  }
}
